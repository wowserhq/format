import M2Material from './M2Material.js';
import M2SkinSection from './M2SkinSection.js';
import M2BatchTexture from './M2BatchTexture.js';

class M2Batch {
  #flags: number;
  #priorityPlane: number;
  #skinSection: M2SkinSection;
  #material: M2Material;
  #textures: M2BatchTexture[];

  constructor(
    flags: number,
    priorityPlane: number,
    skinSection: M2SkinSection,
    material: M2Material,
    textures: M2BatchTexture[],
  ) {
    this.#flags = flags;
    this.#priorityPlane = priorityPlane;
    this.#skinSection = skinSection;
    this.#material = material;
    this.#textures = textures;
  }

  get flags() {
    return this.#flags;
  }

  get material() {
    return this.#material;
  }

  get priorityPlane() {
    return this.#priorityPlane;
  }

  get skinSection() {
    return this.#skinSection;
  }

  get textures() {
    return this.#textures;
  }
}

export default M2Batch;
export { M2Batch };
