import { IoMode, IoSource, openStream } from '@wowserhq/io';
import * as m2Io from './io/m2.js';
import M2Batch from './M2Batch.js';
import M2Model from './M2Model.js';
import { M2_FRAGMENT_SHADER, M2_VERTEX_SHADER } from './const.js';
import { M2SkinSection } from './types.js';
import { getBatchShaders, normalizeBatches } from './batch.js';

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
      const skinSection = {
        id: skinSectionData.id,
        vertexStart: skinSectionData.vertexStart | (skinSectionData.level << 16),
        vertexCount: skinSectionData.vertexCount,
        indexStart: skinSectionData.indexStart | (skinSectionData.level << 16),
        indexCount: skinSectionData.indexCount,
        boneCount: skinSectionData.boneCount,
        boneComboIndex: skinSectionData.boneComboIndex,
        boneInfluences: skinSectionData.boneInfluences,
        centerBoneIndex: skinSectionData.centerBoneIndex,
        centerPosition: skinSectionData.centerPosition,
        sortCenterPosition: skinSectionData.sortCenterPosition,
        sortRadius: skinSectionData.sortRadius,
      };

      this.#skinSections.push(skinSection);
    }
  }

  #loadBatches(data: any) {
    for (const batchData of normalizeBatches(this.#model, data.batches)) {
      const { vertexShader, fragmentShader } = getBatchShaders(this.#model, batchData);

      if (
        vertexShader === M2_VERTEX_SHADER.VERTEX_UNKNOWN ||
        fragmentShader === M2_FRAGMENT_SHADER.FRAGMENT_UNKNOWN
      ) {
        continue;
      }

      const skinSection = this.#skinSections[batchData.skinSectionIndex];
      const material = this.#model.materials[batchData.materialIndex];

      const textures = [];
      for (let i = 0; i < batchData.textureCount; i++) {
        const textureIndex = batchData.textureIndices[i];
        const texture = this.#model.textures[textureIndex];

        textures.push(texture);
      }

      const textureWeightIndex = this.#model.textureWeightCombos[batchData.textureWeightComboIndex];
      const textureTransformIndices = batchData.textureTransformIndices.filter((i) => i !== 0xffff);

      const batch = new M2Batch(
        batchData.flags,
        batchData.priorityPlane,
        skinSection,
        material,
        batchData.materialLayer,
        textures,
        textureWeightIndex,
        textureTransformIndices,
        batchData.colorIndex,
        vertexShader,
        fragmentShader,
      );

      this.#batches.push(batch);
    }
  }
}

export default M2SkinProfile;
export { M2SkinProfile };
