import { BLP_IMAGE_FORMAT } from './const.js';

class BlpImage {
  #width: number;
  #height: number;
  #data: Uint8Array;
  #format: BLP_IMAGE_FORMAT;

  constructor(width: number, height: number, data: Uint8Array, format: BLP_IMAGE_FORMAT) {
    this.#width = width;
    this.#height = height;
    this.#data = data;
    this.#format = format;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get data() {
    return this.#data;
  }

  get format() {
    return this.#format;
  }
}

export default BlpImage;
