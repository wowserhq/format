class MapObjDef {
  #name: string;
  #id: number;
  #position: Float32Array;
  #rotation: Float32Array;

  constructor(name, id, position, rotation) {
    this.#name = name;
    this.#id = id;
    this.#position = position;
    this.#rotation = rotation;
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
}

export default MapObjDef;
