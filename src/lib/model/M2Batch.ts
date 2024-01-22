import M2Material from './M2Material.js';
import M2SkinSection from './M2SkinSection.js';
import M2Texture from './M2Texture.js';
import { M2_FRAGMENT_SHADER, M2_VERTEX_SHADER } from './const.js';

class M2Batch {
  #flags: number;
  #priorityPlane: number;
  #skinSection: M2SkinSection;
  #material: M2Material;
  #layer: number;
  #textures: M2Texture[];
  #vertexShader: M2_VERTEX_SHADER;
  #fragmentShader: M2_FRAGMENT_SHADER;

  constructor(
    flags: number,
    priorityPlane: number,
    skinSection: M2SkinSection,
    material: M2Material,
    layer: number,
    textures: M2Texture[],
    vertexShader: M2_VERTEX_SHADER,
    fragmentShader: M2_FRAGMENT_SHADER,
  ) {
    this.#flags = flags;
    this.#priorityPlane = priorityPlane;
    this.#skinSection = skinSection;
    this.#material = material;
    this.#layer = layer;
    this.#textures = textures;
    this.#vertexShader = vertexShader;
    this.#fragmentShader = fragmentShader;
  }

  get flags() {
    return this.#flags;
  }

  get fragmentShader() {
    return this.#fragmentShader;
  }

  get layer() {
    return this.#layer;
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

  get vertexShader() {
    return this.#vertexShader;
  }
}

export default M2Batch;
export { M2Batch, M2_VERTEX_SHADER, M2_FRAGMENT_SHADER };
