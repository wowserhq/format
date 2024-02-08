class MapObjDef {
  #name: string;
  #id: number;
  #position: number[];
  #rotation: number[];

  constructor(name: string, id: number, position: number[], rotation: number[]) {
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

  /**
   * Returns vector representing doodad placement position in the map coordinate system.
   */
  get position() {
    return this.#position;
  }

  /**
   * Returns quaternion representing doodad placement rotation in the map coordinate system.
   */
  get rotation() {
    return this.#rotation;
  }
}

export default MapObjDef;
export { MapObjDef };
