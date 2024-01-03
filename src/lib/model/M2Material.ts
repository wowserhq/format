import { M2_MATERIAL_BLEND, M2_MATERIAL_FLAG } from './const.js';

class M2Material {
  #flags: number;
  #blend: M2_MATERIAL_BLEND;

  constructor(flags: number, blend: M2_MATERIAL_BLEND) {
    this.#flags = flags;
    this.#blend = blend;
  }

  get flags() {
    return this.#flags;
  }

  get blend() {
    return this.#blend;
  }
}

export default M2Material;
export { M2Material, M2_MATERIAL_BLEND, M2_MATERIAL_FLAG };
