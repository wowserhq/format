import {
  M2_TEXTURE_COMBINER,
  M2_TEXTURE_COMPONENT,
  M2_TEXTURE_COORD,
  M2_TEXTURE_FLAG,
} from './const.js';

class M2Texture {
  #component: M2_TEXTURE_COMPONENT;
  #flags: M2_TEXTURE_FLAG;
  #filename: string;

  constructor(component: M2_TEXTURE_COMPONENT, flags: M2_TEXTURE_FLAG, filename: string) {
    this.#component = component;
    this.#flags = flags;
    this.#filename = filename;
  }

  get component() {
    return this.#component;
  }

  get flags() {
    return this.#flags;
  }

  get filename() {
    return this.#filename;
  }
}

export default M2Texture;
export { M2Texture, M2_TEXTURE_COMBINER, M2_TEXTURE_COMPONENT, M2_TEXTURE_COORD, M2_TEXTURE_FLAG };
