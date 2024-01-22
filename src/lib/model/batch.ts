import M2Model from './M2Model.js';
import {
  M2_FRAGMENT_SHADER,
  M2_MATERIAL_BLEND,
  M2_MATERIAL_FLAG,
  M2_MODEL_FLAG,
  M2_TEXTURE_COMBINER,
  M2_TEXTURE_COMBINER_ENV_MAP,
  M2_TEXTURE_COMBINER_OP_MASK,
  M2_TEXTURE_COMBINER_STAGE_SHIFT,
  M2_TEXTURE_COORD,
  M2_VERTEX_SHADER,
} from './const.js';

type BatchShaders = {
  vertexShader: M2_VERTEX_SHADER;
  fragmentShader: M2_FRAGMENT_SHADER;
};

const normalizeBatches = (model: M2Model, batches: any[]) => {
  const normalizedBatches = structuredClone(batches);

  substituteSimpleEffect(model, normalizedBatches);
  substituteSpecializedEffect(model, normalizedBatches);

  return normalizedBatches;
};

const resolveTextureCombos = (model: M2Model, batches: any[]) => {
  for (const batch of batches) {
    const textureIndices = [];
    const textureTransformIndices = [];

    for (let stage = 0; stage < batch.textureCount; stage++) {
      const textureIndex = model.textureCombos[batch.textureComboIndex + stage];
      textureIndices.push(textureIndex);

      const textureTransformIndex =
        model.textureTransformCombos[batch.textureTransformComboIndex + stage];
      textureTransformIndices.push(textureTransformIndex);
    }

    batch.textureIndices = textureIndices;
    batch.textureTransformIndices = textureTransformIndices;
  }
};

const substituteSimpleEffect = (model: M2Model, batches: any[]) => {
  for (const batch of batches) {
    if (batch.shaderId & 0x8000) {
      continue;
    }

    const material = model.materials[batch.materialIndex];

    if (model.flags & M2_MODEL_FLAG.USE_COMBINER_COMBOS) {
      let shaderId = 0;
      const stages = [];

      for (let stage = 0; stage < batch.textureCount; stage++) {
        const first = stage === 0;
        const last = stage === batch.textureCount - 1;

        // Combiner

        const textureCombinerComboIndex = batch.shaderId + stage;
        const textureCombiner =
          first && material.blend === M2_MATERIAL_BLEND.BLEND_OPAQUE
            ? M2_TEXTURE_COMBINER.COMBINER_OPAQUE
            : model.textureCombinerCombos[textureCombinerComboIndex];

        stages[stage] |= textureCombiner;

        // Coord

        const textureCoordComboIndex = batch.textureCoordComboIndex + stage;
        const textureCoord = model.textureCoordCombos[textureCoordComboIndex];

        if (textureCoord === M2_TEXTURE_COORD.COORD_ENV) {
          stages[stage] |= M2_TEXTURE_COMBINER_ENV_MAP;
        }

        if (last && textureCoord === M2_TEXTURE_COORD.COORD_T2) {
          shaderId |= 0x4000;
        }
      }

      batch.shaderId = shaderId | (stages[0] << M2_TEXTURE_COMBINER_STAGE_SHIFT) | stages[1];
    } else {
      let shaderId = 0;
      const stages = [];

      // Combiner

      const textureCombiner =
        material.blend == M2_MATERIAL_BLEND.BLEND_OPAQUE
          ? M2_TEXTURE_COMBINER.COMBINER_OPAQUE
          : M2_TEXTURE_COMBINER.COMBINER_MOD;

      stages[0] |= textureCombiner;

      // Coord

      const textureCoord = model.textureCoordCombos[batch.textureCoordComboIndex];

      if (textureCoord === M2_TEXTURE_COORD.COORD_ENV) {
        stages[0] |= M2_TEXTURE_COMBINER_ENV_MAP;
      }

      if (textureCoord === M2_TEXTURE_COORD.COORD_T2) {
        shaderId |= 0x4000;
      }

      batch.shaderId = shaderId | (stages[0] << M2_TEXTURE_COMBINER_STAGE_SHIFT);
    }
  }
};

const substituteSpecializedEffect = (model: M2Model, batches: any[]) => {
  // Resolve texture combos and texture transform combos to actual index values
  resolveTextureCombos(model, batches);

  // Only substitute if there's at least one set of layers
  if (batches.filter((batch) => batch.materialLayer > 0).length === 0) {
    return;
  }

  let sharedMaterials = false;

  let currentMaterialIndex = 0;
  let previousMaterialIndex = -1;

  let firstLayerBatch = null;
  let firstLayerMaterial = null;

  const substitutions: number[] = [];

  for (let i = 0; i < batches.length; i++) {
    const currentBatch = batches[i];
    const currentMaterial = model.materials[currentBatch.materialIndex];
    const currentTextureOpT2 = currentBatch.shaderId & M2_TEXTURE_COMBINER_OP_MASK;

    currentMaterialIndex = currentBatch.materialIndex;

    if (currentMaterialIndex === previousMaterialIndex) {
      sharedMaterials = true;
      continue;
    }

    previousMaterialIndex = currentBatch.materialIndex;

    // Layer reset
    if (currentBatch.materialLayer === 0) {
      substitutions[0] = 0;
      substitutions[1] = 0;

      if (
        currentBatch.textureCount > 0 &&
        currentMaterial.blend === M2_MATERIAL_BLEND.BLEND_OPAQUE
      ) {
        currentBatch.shaderId &= 0xff8f;
      }

      firstLayerBatch = currentBatch;
      firstLayerMaterial = model.materials[currentBatch.materialIndex];
    }

    if (substitutions[0] === 1) {
      const isAlphaBlend =
        currentMaterial.blend === M2_MATERIAL_BLEND.BLEND_ALPHA ||
        currentMaterial.blend === M2_MATERIAL_BLEND.BLEND_ALPHA_KEY;
      const isSingleTexture = currentBatch.textureCount === 1;
      const isSharedLighting =
        ((currentMaterial.flags ^ firstLayerMaterial.flags) &
          M2_MATERIAL_FLAG.FLAG_DISABLE_LIGHTING) ===
        0;
      const isSharedTextures = currentBatch.textureComboIndex === firstLayerBatch.textureComboIndex;
      const isSharedWeights =
        model.textureWeightCombos[currentBatch.textureWeightComboIndex] ===
        model.textureWeightCombos[firstLayerBatch.textureWeightComboIndex];

      // FRAGMENT_OPAQUE_MOD2XNA_ALPHA
      if (
        isAlphaBlend &&
        isSingleTexture &&
        isSharedLighting &&
        isSharedTextures &&
        isSharedWeights
      ) {
        currentBatch.shaderId = 0x8000;
        firstLayerBatch.shaderId = 0x8001;

        substitutions[0] = 3;

        continue;
      }

      substitutions[0] = 0;
    }

    if (substitutions[0] === 0 || substitutions[0] === 1) {
      const isOpaqueBlend = currentMaterial.blend === M2_MATERIAL_BLEND.BLEND_OPAQUE;
      const isDualTexture = currentBatch.textureCount === 2;
      const isTextureOpT2Mod2x =
        currentTextureOpT2 === M2_TEXTURE_COMBINER.COMBINER_MOD2X ||
        currentTextureOpT2 === M2_TEXTURE_COMBINER.COMBINER_MOD2XNA;

      if (isOpaqueBlend && isDualTexture && isTextureOpT2Mod2x) {
        const textureCoordT1 = model.textureCoordCombos[currentBatch.textureCoordComboIndex];
        const textureCoordT2 = model.textureCoordCombos[currentBatch.textureCoordComboIndex + 1];

        if (
          textureCoordT1 === M2_TEXTURE_COORD.COORD_T1 &&
          textureCoordT2 === M2_TEXTURE_COORD.COORD_ENV
        ) {
          substitutions[0] = 1;
        }
      }
    }

    if (substitutions[1] === 1) {
      const isAddOrMod2xBlend =
        currentMaterial.blend === M2_MATERIAL_BLEND.BLEND_ADD ||
        currentMaterial.blend === M2_MATERIAL_BLEND.BLEND_MOD2X;
      const isSingleTexture = currentBatch.textureCount === 1;
      const isTextureCoordT1Env =
        model.textureCoordCombos[currentBatch.textureCoordComboIndex] ===
        M2_TEXTURE_COORD.COORD_ENV;
      const isSharedWeights =
        model.textureWeightCombos[currentBatch.textureWeightComboIndex] ===
        model.textureWeightCombos[firstLayerBatch.textureWeightComboIndex];

      // FRAGMENT_OPAQUE_ADDALPHA or FRAGMENT_OPAQUE_MOD2XNA
      if (isAddOrMod2xBlend && isSingleTexture && isTextureCoordT1Env && isSharedWeights) {
        currentBatch.shaderId = 0x8000;
        firstLayerBatch.shaderId =
          currentMaterial.blend === M2_MATERIAL_BLEND.BLEND_ADD ? 0x8002 : 14;
        firstLayerBatch.textureCount = 2;

        firstLayerBatch.textureIndices = [
          firstLayerBatch.textureIndices[0],
          currentBatch.textureIndices[0],
        ];

        firstLayerBatch.textureTransformIndices = [
          firstLayerBatch.textureTransformIndices[0],
          currentBatch.textureTransformIndices[0],
        ];

        substitutions[1] = 2;

        continue;
      }

      substitutions[1] = 0;
    } else if (substitutions[1] === 2) {
      const isAlphaBlend =
        currentMaterial.blend === M2_MATERIAL_BLEND.BLEND_ALPHA ||
        currentMaterial.blend === M2_MATERIAL_BLEND.BLEND_ALPHA_KEY;
      const isSingleTexture = currentBatch.textureCount === 1;
      const isSharedLighting =
        ((currentMaterial.flags ^ firstLayerMaterial.flags) &
          M2_MATERIAL_FLAG.FLAG_DISABLE_LIGHTING) ===
        0;
      const isSharedTextures = currentBatch.textureComboIndex === firstLayerBatch.textureComboIndex;
      const isSharedWeights =
        model.textureWeightCombos[currentBatch.textureWeightComboIndex] ===
        model.textureWeightCombos[firstLayerBatch.textureWeightComboIndex];

      // FRAGMENT_OPAQUE_ADDALPHA_ALPHA or FRAGMENT_OPAQUE_MOD2XNA_ALPHA
      if (
        isAlphaBlend &&
        isSingleTexture &&
        isSharedLighting &&
        isSharedTextures &&
        isSharedWeights
      ) {
        currentBatch.shaderId = 0x8000;
        firstLayerBatch.shaderId = firstLayerBatch.shaderId === 0x8002 ? 0x8003 : 0x8001;

        substitutions[1] = 3;

        continue;
      }

      substitutions[1] = 0;
    }

    if (
      currentMaterial.blend === M2_MATERIAL_BLEND.BLEND_OPAQUE &&
      currentBatch.textureCount === 1 &&
      model.textureCoordCombos[currentBatch.textureCoordComboIndex] === M2_TEXTURE_COORD.COORD_T1
    ) {
      substitutions[1] = 1;
    }
  }

  // Propagate batch texture and shader data across batches that share materials
  if (sharedMaterials) {
    let currentMaterialIndex = 0;
    let previousMaterialIndex = -1;

    for (let i = 0; i < batches.length; i++) {
      const currentBatch = batches[i];
      const previousBatch = i > 0 ? batches[i - 1] : null;

      currentMaterialIndex = currentBatch.materialIndex;

      if (currentMaterialIndex === previousMaterialIndex) {
        currentBatch.shaderId = previousBatch.shaderId;
        currentBatch.textureCount = previousBatch.textureCount;
        currentBatch.textureIndices = previousBatch.textureIndices;
        currentBatch.textureTransformIndices = previousBatch.textureTransformIndices;
      } else {
        previousMaterialIndex = currentMaterialIndex;
      }
    }
  }
};

const getBatchShaders = (model: M2Model, batch: any): BatchShaders => {
  // Simple effect

  if (!(batch.shaderId & 0x8000)) {
    const firstTextureCoord = model.textureCoordCombos[batch.textureCoordComboIndex];

    const shaders = getSimpleBatchShaders(batch.shaderId, batch.textureCount, firstTextureCoord);

    if (
      shaders.vertexShader !== M2_VERTEX_SHADER.VERTEX_UNKNOWN &&
      shaders.fragmentShader !== M2_FRAGMENT_SHADER.FRAGMENT_UNKNOWN
    ) {
      return shaders;
    }

    // Fallback
    // 0000000000010001
    // 1 texture: FRAGMENT_MOD
    // 2 texture: FRAGMENT_MOD_MOD
    const fallbackShaders = getSimpleBatchShaders(0x11, batch.textureCount, firstTextureCoord);

    return fallbackShaders;
  }

  // Specialized effect

  switch (batch.shaderId & 0x7fff) {
    case 0:
      return {
        vertexShader: M2_VERTEX_SHADER.VERTEX_UNKNOWN,
        fragmentShader: M2_FRAGMENT_SHADER.FRAGMENT_UNKNOWN,
      };

    case 1:
      return {
        vertexShader: M2_VERTEX_SHADER.VERTEX_T1_ENV,
        fragmentShader: M2_FRAGMENT_SHADER.FRAGMENT_OPAQUE_MOD2XNA_ALPHA,
      };

    case 2:
      return {
        vertexShader: M2_VERTEX_SHADER.VERTEX_T1_ENV,
        fragmentShader: M2_FRAGMENT_SHADER.FRAGMENT_OPAQUE_ADDALPHA,
      };

    case 3:
      return {
        vertexShader: M2_VERTEX_SHADER.VERTEX_T1_ENV,
        fragmentShader: M2_FRAGMENT_SHADER.FRAGMENT_OPAQUE_ADDALPHA_ALPHA,
      };
  }

  return {
    vertexShader: M2_VERTEX_SHADER.VERTEX_UNKNOWN,
    fragmentShader: M2_FRAGMENT_SHADER.FRAGMENT_UNKNOWN,
  };
};

const getSimpleBatchShaders = (
  shaderId: number,
  textureCount: number,
  firstTextureCoord: M2_TEXTURE_COORD,
): BatchShaders => {
  const combiner = [
    // T1
    (shaderId >> M2_TEXTURE_COMBINER_STAGE_SHIFT) & M2_TEXTURE_COMBINER_OP_MASK,

    // T2
    (shaderId >> 0) & M2_TEXTURE_COMBINER_OP_MASK,
  ];

  const envmap = [
    // T1
    (shaderId >> M2_TEXTURE_COMBINER_STAGE_SHIFT) & M2_TEXTURE_COMBINER_ENV_MAP,

    // T2
    (shaderId >> 0) & M2_TEXTURE_COMBINER_ENV_MAP,
  ];

  let vertexShader = M2_VERTEX_SHADER.VERTEX_UNKNOWN;
  let fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_UNKNOWN;

  // 1 texture

  if (textureCount === 1) {
    // Vertex shader

    if (envmap[0]) {
      vertexShader = M2_VERTEX_SHADER.VERTEX_ENV;
    } else if (firstTextureCoord === M2_TEXTURE_COORD.COORD_T1) {
      vertexShader = M2_VERTEX_SHADER.VERTEX_T1;
    } else {
      vertexShader = M2_VERTEX_SHADER.VERTEX_T2;
    }

    // Fragment shader

    switch (combiner[0]) {
      case M2_TEXTURE_COMBINER.COMBINER_OPAQUE:
        fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_OPAQUE;
        break;

      case M2_TEXTURE_COMBINER.COMBINER_MOD:
        fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_MOD;
        break;

      case M2_TEXTURE_COMBINER.COMBINER_DECAL:
        fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_DECAL;
        break;

      case M2_TEXTURE_COMBINER.COMBINER_ADD:
        fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_ADD;
        break;

      case M2_TEXTURE_COMBINER.COMBINER_MOD2X:
        fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_MOD2X;
        break;

      case M2_TEXTURE_COMBINER.COMBINER_FADE:
        fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_FADE;
        break;

      default:
        fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_MOD;
        break;
    }

    return { vertexShader, fragmentShader };
  }

  // 2 textures

  // Vertex shader

  if (envmap[0] && envmap[1]) {
    vertexShader = M2_VERTEX_SHADER.VERTEX_ENV_ENV;
  } else if (envmap[0]) {
    vertexShader = M2_VERTEX_SHADER.VERTEX_ENV_T2;
  } else if (envmap[1]) {
    vertexShader = M2_VERTEX_SHADER.VERTEX_T1_ENV;
  } else {
    vertexShader = M2_VERTEX_SHADER.VERTEX_T1_T2;
  }

  // Fragment shader

  switch (combiner[0]) {
    case M2_TEXTURE_COMBINER.COMBINER_OPAQUE:
      switch (combiner[1]) {
        case M2_TEXTURE_COMBINER.COMBINER_OPAQUE:
          fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_OPAQUE_OPAQUE;
          break;

        case M2_TEXTURE_COMBINER.COMBINER_ADD:
          fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_OPAQUE_ADD;
          break;

        case M2_TEXTURE_COMBINER.COMBINER_MOD2X:
          fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_OPAQUE_MOD2X;
          break;

        case M2_TEXTURE_COMBINER.COMBINER_MOD2XNA:
          fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_OPAQUE_MOD2XNA;
          break;

        case M2_TEXTURE_COMBINER.COMBINER_ADDNA:
          fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_OPAQUE_ADDNA;
          break;

        default:
          fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_OPAQUE_MOD;
          break;
      }

      break;

    case M2_TEXTURE_COMBINER.COMBINER_MOD:
      switch (combiner[1]) {
        case M2_TEXTURE_COMBINER.COMBINER_OPAQUE:
          fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_MOD_OPAQUE;
          break;

        case M2_TEXTURE_COMBINER.COMBINER_MOD:
          fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_MOD_MOD;
          break;

        case M2_TEXTURE_COMBINER.COMBINER_ADD:
          fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_MOD_ADD;
          break;

        case M2_TEXTURE_COMBINER.COMBINER_MOD2X:
          fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_MOD_MOD2X;
          break;

        case M2_TEXTURE_COMBINER.COMBINER_MOD2XNA:
          fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_MOD_MOD2XNA;
          break;

        case M2_TEXTURE_COMBINER.COMBINER_ADDNA:
          fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_MOD_ADDNA;
          break;

        default:
          fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_MOD_MOD;
          break;
      }

      break;

    case M2_TEXTURE_COMBINER.COMBINER_ADD:
      switch (combiner[1]) {
        case M2_TEXTURE_COMBINER.COMBINER_MOD:
          fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_ADD_MOD;
          break;

        default:
          fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_UNKNOWN;
      }

      break;

    case M2_TEXTURE_COMBINER.COMBINER_MOD2X:
      switch (combiner[1]) {
        case M2_TEXTURE_COMBINER.COMBINER_MOD2X:
          fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_MOD2X_MOD2X;
          break;

        default:
          fragmentShader = M2_FRAGMENT_SHADER.FRAGMENT_UNKNOWN;
      }

      break;
  }

  return { vertexShader, fragmentShader };
};

export { normalizeBatches, getBatchShaders };
