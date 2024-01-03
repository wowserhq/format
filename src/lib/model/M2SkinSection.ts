import * as io from '@wowserhq/io';

class M2SkinSection {
  #skinSectionId: number;
  #vertexStart: number;
  #vertexCount: number;
  #indexStart: number;
  #indexCount: number;

  constructor(
    skinSectionId: number,
    vertexStart: number,
    vertexCount: number,
    indexStart: number,
    indexCount: number,
  ) {
    this.#skinSectionId = skinSectionId;
    this.#vertexStart = vertexStart;
    this.#vertexCount = vertexCount;
    this.#indexStart = indexStart;
    this.#indexCount = indexCount;
  }

  get indexCount() {
    return this.#indexCount;
  }

  get indexStart() {
    return this.#indexStart;
  }

  get skinSectionId() {
    return this.#skinSectionId;
  }

  get vertexCount() {
    return this.#vertexCount;
  }

  get vertexStart() {
    return this.#vertexStart;
  }
}

export default M2SkinSection;
