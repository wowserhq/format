import M2Texture, { M2_TEXTURE_COMBINER, M2_TEXTURE_COORD } from './M2Texture.js';
import M2TextureWeight from './M2TextureWeight.js';
import M2TextureTransform from './M2TextureTransform.js';

class M2BatchTexture {
  #texture: M2Texture;
  #textureCombiner: M2_TEXTURE_COMBINER;
  #textureCoord: M2_TEXTURE_COORD;
  #textureWeight: M2TextureWeight;
  #textureTransform: M2TextureTransform;

  constructor(
    texture: M2Texture,
    textureCombiner: M2_TEXTURE_COMBINER,
    textureCoord: M2_TEXTURE_COORD,
    textureWeight: M2TextureWeight,
    textureTransform: M2TextureTransform,
  ) {
    this.#texture = texture;
    this.#textureCombiner = textureCombiner;
    this.#textureCoord = textureCoord;
    this.#textureWeight = textureWeight;
    this.#textureTransform = textureTransform;
  }

  get texture() {
    return this.#texture;
  }

  get textureCombiner() {
    return this.#textureCombiner;
  }

  get textureCoord() {
    return this.#textureCoord;
  }

  get textureWeight() {
    return this.#textureWeight;
  }

  get textureTransform() {
    return this.#textureTransform;
  }
}

export default M2BatchTexture;
