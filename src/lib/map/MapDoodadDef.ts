class MapDoodadDef {
  #name: string;
  #id: number;
  #position: Float32Array;
  #rotation: Float32Array;
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

  get scale() {
    return this.#scale;
  }
}

export default MapDoodadDef;
export { MapDoodadDef };
