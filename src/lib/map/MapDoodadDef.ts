import { MAP_CORNER_X, MAP_CORNER_Y } from './const.js';

class MapDoodadDef {
  #name: string;
  #id: number;
  #position: Float32Array;
  #mapPosition: Float32Array;
  #rotation: Float32Array;
  #mapRotation: Float32Array;
  #scale: number;

  constructor(
    name: string,
    id: number,
    position: Float32Array,
    rotation: Float32Array,
    scale: number,
  ) {
    this.#name = name;
    this.#id = id;
    this.#position = position;
    this.#rotation = rotation;
    this.#scale = scale;

    // Doodad defs (map placements) are stored in a Y-up right-handed coordinate system

    this.#mapPosition = new Float32Array(3);
    this.#mapPosition[0] = MAP_CORNER_X - position[2];
    this.#mapPosition[1] = MAP_CORNER_Y - position[0];
    this.#mapPosition[2] = position[1];

    this.#mapRotation = new Float32Array(3);
    this.#mapRotation[0] = rotation[2];
    this.#mapRotation[1] = rotation[0];
    this.#mapRotation[2] = rotation[1];
  }

  get name() {
    return this.#name;
  }

  get id() {
    return this.#id;
  }

  get position() {
    return this.#position;
  }

  get mapPosition() {
    return this.#mapPosition;
  }

  get rotation() {
    return this.#rotation;
  }

  get mapRotation() {
    return this.#mapRotation;
  }

  get scale() {
    return this.#scale;
  }
}

export default MapDoodadDef;
