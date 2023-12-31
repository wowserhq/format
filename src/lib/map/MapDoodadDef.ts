class MapDoodadDef {
  #name: string;
  #id: number;
  #position: Float32Array;
  #rotation: Float32Array;
  #scale: number;

  constructor(name, id, position, rotation, scale) {
    this.#name = name;
    this.#id = id;
    this.#position = position;
    this.#rotation = rotation;
    this.#scale = scale;
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

  get rotation() {
    return this.#rotation;
  }

  get scale() {
    return this.#scale;
  }
}

export default MapDoodadDef;
