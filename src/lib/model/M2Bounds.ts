class M2Bounds {
  #extent: Float32Array;
  #radius: number;

  constructor(extent: Float32Array, radius: number) {
    this.#extent = extent;
    this.#radius = radius;
  }

  get extent() {
    return this.#extent;
  }

  get radius() {
    return this.#radius;
  }
}

export default M2Bounds;
export { M2Bounds };
