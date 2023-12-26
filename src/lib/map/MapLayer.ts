import { MAP_LAYER_SPLAT_X, MAP_LAYER_SPLAT_Y, MAP_LAYER_SPLAT_SIZE } from './const.js';

class MapLayer {
  #splat: Uint8Array;
  #effectId: number;
  #texture: string;

  constructor(texture: string, splat: Uint8Array, effectId: number) {
    this.#texture = texture;
    this.#splat = splat;
    this.#effectId = effectId;
  }

  get splat() {
    return this.#splat;
  }

  get effectId() {
    return this.#effectId;
  }

  get texture() {
    return this.#texture;
  }
}

export default MapLayer;

export { MapLayer, MAP_LAYER_SPLAT_X, MAP_LAYER_SPLAT_Y, MAP_LAYER_SPLAT_SIZE };
