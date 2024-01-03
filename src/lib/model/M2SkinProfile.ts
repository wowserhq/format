import { IoMode, IoSource, openStream } from '@wowserhq/io';
import * as m2Io from './io/m2.js';
import M2Batch from './M2Batch.js';
import M2Model from './M2Model.js';
import M2SkinSection from './M2SkinSection.js';
import M2BatchTexture from './M2BatchTexture.js';
import { M2_MATERIAL_BLEND, M2_MODEL_FLAG, M2_TEXTURE_COMBINER } from './const.js';

class M2SkinProfile {
  #model: M2Model;
  #batches: M2Batch[] = [];
  #skinSections: M2SkinSection[] = [];
  #indices: Uint16Array;
  #vertices: Uint16Array;

  constructor(model: M2Model) {
    if (!model) {
      throw new Error(`M2SkinProfile requires a model`);
    }

    this.#model = model;
  }

  get batches() {
    return this.#batches;
  }

  get indices() {
    return this.#indices;
  }

  get skinSections() {
    return this.#skinSections;
  }

  get vertices() {
    return this.#vertices;
  }

  load(source: IoSource) {
    const stream = openStream(source, IoMode.Read);
    const data = m2Io.m2skin.read(stream);
    stream.close();

    this.#vertices = data.vertices;
    this.#indices = data.indices;

    this.#loadSkinSections(data);
    this.#loadBatches(data);

    return this;
  }

  #loadSkinSections(data: any) {
    for (const skinSectionData of data.skinSections) {
      const skinSection = new M2SkinSection(
        skinSectionData.skinSectionId,
        skinSectionData.vertexStart | (skinSectionData.level << 16),
        skinSectionData.vertexCount,
        skinSectionData.indexStart | (skinSectionData.level << 16),
        skinSectionData.indexCount,
      );

      this.#skinSections.push(skinSection);
    }
  }

  #loadBatches(data: any) {
    for (const batchData of data.batches) {
      // TODO process batches above layer 0 - while batches above layer 0 are typically discarded
      //      at runtime, they occasionally contain information needed to identify
      //      specialized shading logic (eg. Combiners_Opaque_Mod2xNA_Alpha)
      if (batchData.materialLayer > 0) {
        continue;
      }

      const skinSection = this.#skinSections[batchData.skinSectionIndex];
      const material = this.#model.materials[batchData.materialIndex];
      const useCombinerCombos = this.#model.flags & M2_MODEL_FLAG.USE_COMBINER_COMBOS;

      const textures = [];
      for (let i = 0; i < batchData.textureCount; i++) {
        const textureIndex = this.#model.textureCombos[batchData.textureComboIndex + i];
        const texture = this.#model.textures[textureIndex];

        let textureCombiner = M2_TEXTURE_COMBINER.COMBINER_OPAQUE;
        if (useCombinerCombos) {
          if (i === 0 && material.blend === M2_MATERIAL_BLEND.BLEND_OPAQUE) {
            textureCombiner = M2_TEXTURE_COMBINER.COMBINER_OPAQUE;
          } else {
            textureCombiner = this.#model.textureCombinerCombos[batchData.shaderId + i];
          }
        } else {
          textureCombiner =
            material.blend === M2_MATERIAL_BLEND.BLEND_OPAQUE
              ? M2_TEXTURE_COMBINER.COMBINER_OPAQUE
              : M2_TEXTURE_COMBINER.COMBINER_MOD;
        }

        const textureCoord = this.#model.textureCoordCombos[batchData.textureCoordComboIndex + i];

        const textureWeightIndex =
          this.#model.textureWeightCombos[batchData.textureWeightComboIndex + i];
        const textureWeight = this.#model.textureWeights[textureWeightIndex];

        const textureTransformIndex =
          this.#model.textureTransformCombos[batchData.textureTransformComboIndex + i];
        const textureTransform = this.#model.textureTransforms[textureTransformIndex];

        textures.push(
          new M2BatchTexture(
            texture,
            textureCombiner,
            textureCoord,
            textureWeight,
            textureTransform,
          ),
        );
      }

      const batch = new M2Batch(
        batchData.flags,
        batchData.priorityPlane,
        skinSection,
        material,
        textures,
      );

      this.#batches.push(batch);
    }
  }
}

export default M2SkinProfile;
export { M2SkinProfile };
