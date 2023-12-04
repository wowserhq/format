import { IoSource, openStream } from '@wowserhq/io';
import {
  BLP_MAGIC,
  BLP_COLOR_FORMAT,
  BLP_IMAGE_FORMAT,
  MAX_MIPS,
  BLP_PIXEL_FORMAT,
} from './const.js';
import { dxt1ToRgba8888, dxt3ToRgba8888, dxt5ToRgba8888 } from './dxt.js';
import * as blpIo from './io.js';
import { getSizeAtMipLevel } from './util.js';
import BlpImage from './BlpImage.js';

class Blp {
  #magic = BLP_MAGIC;
  #formatVersion = 1;
  #colorFormat = BLP_COLOR_FORMAT.COLOR_DXT;
  #alphaSize = 0;
  #preferredFormat = BLP_PIXEL_FORMAT.PIXEL_DXT5;
  #hasMips = 0;
  #width = 0;
  #height = 0;
  #images: Uint8Array[] = [];
  #palette: Uint8Array;

  load(source: IoSource) {
    const stream = openStream(source);
    const header = blpIo.header.read(stream);

    if (header.magic !== BLP_MAGIC) {
      stream.close();
      throw new Error(`Unsupported file format: ${header.magic}`);
    }

    if (header.formatVersion !== 1) {
      stream.close();
      throw new Error(`Unsupported format version: ${header.formatVersion}`);
    }

    if (header.colorFormat >= BLP_COLOR_FORMAT.NUM_COLOR_FORMATS) {
      stream.close();
      throw new Error(`Unsupported color format: ${header.colorFormat}`);
    }

    if (header.preferredFormat >= BLP_PIXEL_FORMAT.NUM_PIXEL_FORMATS) {
      stream.close();
      throw new Error(`Unsupported pixel format: ${header.preferredFormat}`);
    }

    this.#magic = header.magic;
    this.#formatVersion = header.formatVersion;
    this.#colorFormat = header.colorFormat;
    this.#alphaSize = header.alphaSize;
    this.#preferredFormat = header.preferredFormat;
    this.#hasMips = header.hasMips;
    this.#width = header.width;
    this.#height = header.height;

    if (this.#colorFormat === BLP_COLOR_FORMAT.COLOR_PAL) {
      this.#palette = header.extended;
    }

    const mipOffsets = header.mipOffsets;
    const mipSizes = header.mipSizes;

    for (let level = 0; level < MAX_MIPS; level++) {
      const offset = mipOffsets[level];
      const size = mipSizes[level];

      if (offset === 0 || size === 0) {
        break;
      }

      stream.offset = offset;
      this.#images[level] = stream.readBytes(size);
    }

    stream.close();
  }

  get magic() {
    return this.#magic;
  }

  get formatVersion() {
    return this.#formatVersion;
  }

  get colorFormat() {
    return this.#colorFormat;
  }

  set colorFormat(colorFormat: BLP_COLOR_FORMAT) {
    this.#reset();
    this.#colorFormat = colorFormat;
  }

  get alphaSize() {
    return this.#alphaSize;
  }

  get hasMips() {
    return this.#hasMips;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  setImage(image: BlpImage, generateMips = false) {
    // TODO
    throw new Error('Unimplemented');
  }

  getImage(level: number = 0, outputFormat: BLP_IMAGE_FORMAT = BLP_IMAGE_FORMAT.IMAGE_UNSPECIFIED) {
    if (level > this.#images.length - 1) {
      throw new Error(`Requested level out of range: ${level} > ${this.#images.length - 1}`);
    }

    if (outputFormat === BLP_IMAGE_FORMAT.IMAGE_UNSPECIFIED) {
      return this.#getRawImage(level);
    }

    switch (this.#colorFormat) {
      case BLP_COLOR_FORMAT.COLOR_JPEG:
        return this.#getJpegImage(level, outputFormat);

      case BLP_COLOR_FORMAT.COLOR_PAL:
        return this.#getPalImage(level, outputFormat);

      case BLP_COLOR_FORMAT.COLOR_DXT:
        return this.#getDxtImage(level, outputFormat);

      default:
        throw new Error(`Unsupported color format: ${this.#colorFormat}`);
    }
  }

  /**
   * For a given mip level, return a BlpImage containing the unconverted image data from the Blp. If the Blp uses a
   * palette, the image data will be converted to IMAGE_FORMAT.IMAGE_RGBA8888 before being returned.
   *
   * @param level
   * @private
   */
  #getRawImage(level: number) {
    switch (this.#colorFormat) {
      case BLP_COLOR_FORMAT.COLOR_PAL:
        // Images using palettes are only useful when decoded
        return this.#getPalImage(level, BLP_IMAGE_FORMAT.IMAGE_RGBA8888);

      case BLP_COLOR_FORMAT.COLOR_DXT:
        switch (this.#preferredFormat) {
          case BLP_PIXEL_FORMAT.PIXEL_DXT1:
            return this.#getDxt1Image(level, BLP_IMAGE_FORMAT.IMAGE_DXT1);

          case BLP_PIXEL_FORMAT.PIXEL_DXT3:
            return this.#getDxt3Image(level, BLP_IMAGE_FORMAT.IMAGE_DXT3);

          case BLP_PIXEL_FORMAT.PIXEL_DXT5:
            return this.#getDxt5Image(level, BLP_IMAGE_FORMAT.IMAGE_DXT5);

          default:
            throw new Error(`Unsupported pixel format: ${this.#preferredFormat}`);
        }

      default:
        throw new Error(`Unsupported color format: ${this.#colorFormat}`);
    }
  }

  #getJpegImage(level: number, outputFormat: BLP_IMAGE_FORMAT): BlpImage {
    // TODO
    throw new Error('Unimplemented');
  }

  #getDxtImage(level: number, outputFormat: BLP_IMAGE_FORMAT) {
    switch (this.#preferredFormat) {
      case BLP_PIXEL_FORMAT.PIXEL_DXT1:
        return this.#getDxt1Image(level, outputFormat);

      case BLP_PIXEL_FORMAT.PIXEL_DXT3:
        return this.#getDxt3Image(level, outputFormat);

      case BLP_PIXEL_FORMAT.PIXEL_DXT5:
        return this.#getDxt5Image(level, outputFormat);

      default:
        throw new Error(`Unsupported pixel format: ${this.#preferredFormat}`);
    }
  }

  #getDxt1Image(level: number, outputFormat: BLP_IMAGE_FORMAT): BlpImage {
    const width = getSizeAtMipLevel(this.#width, level);
    const height = getSizeAtMipLevel(this.#height, level);
    const data = this.#images[level];

    switch (outputFormat) {
      case BLP_IMAGE_FORMAT.IMAGE_DXT1:
        return new BlpImage(width, height, data, outputFormat);

      case BLP_IMAGE_FORMAT.IMAGE_RGBA8888:
        return new BlpImage(width, height, dxt1ToRgba8888(width, height, data), outputFormat);

      default:
        throw new Error(`Unsupported output format: ${outputFormat}`);
    }
  }

  #getDxt3Image(level: number, outputFormat: BLP_IMAGE_FORMAT): BlpImage {
    const width = getSizeAtMipLevel(this.#width, level);
    const height = getSizeAtMipLevel(this.#height, level);
    const data = this.#images[level];

    switch (outputFormat) {
      case BLP_IMAGE_FORMAT.IMAGE_DXT3:
        return new BlpImage(width, height, data, outputFormat);

      case BLP_IMAGE_FORMAT.IMAGE_RGBA8888:
        return new BlpImage(width, height, dxt3ToRgba8888(width, height, data), outputFormat);

      default:
        throw new Error(`Unsupported output format: ${outputFormat}`);
    }
  }

  #getDxt5Image(level: number, outputFormat: BLP_IMAGE_FORMAT) {
    const width = getSizeAtMipLevel(this.#width, level);
    const height = getSizeAtMipLevel(this.#height, level);
    const data = this.#images[level];

    switch (outputFormat) {
      case BLP_IMAGE_FORMAT.IMAGE_DXT5:
        return new BlpImage(width, height, data, outputFormat);

      case BLP_IMAGE_FORMAT.IMAGE_RGBA8888:
        return new BlpImage(width, height, dxt5ToRgba8888(width, height, data), outputFormat);

      default:
        throw new Error(`Unsupported output format: ${outputFormat}`);
    }
  }

  #getPalImage(level: number, outputFormat: BLP_IMAGE_FORMAT): BlpImage {
    // TODO
    throw new Error('Unimplemented');
  }

  #reset() {
    this.#colorFormat = BLP_COLOR_FORMAT.COLOR_DXT;
    this.#preferredFormat = BLP_PIXEL_FORMAT.PIXEL_DXT5;
    this.#alphaSize = 0;
    this.#hasMips = 0;
    this.#width = 0;
    this.#height = 0;
    this.#images = [];
  }
}

export default Blp;
export { BlpImage, BLP_COLOR_FORMAT, BLP_IMAGE_FORMAT, BLP_PIXEL_FORMAT };
