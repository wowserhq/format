import { IoMode, IoSource, openStream } from '@wowserhq/io';
import {
  BLP_COLOR_FORMAT,
  BLP_IMAGE_FORMAT,
  BLP_MAGIC,
  BLP_PIXEL_FORMAT,
  MAX_MIP_LEVELS,
} from './const.js';
import { dxt1ToAbgr8888, dxt3ToAbgr8888, dxt5ToAbgr8888 } from './dxt.js';
import { palToAbgr8888 } from './pal.js';
import { rawAbgr8888ToArgb8888, rawArgb8888ToAbgr8888 } from './raw.js';
import * as blpIo from './io.js';
import { calcMipLevelCount, getSizeAtMipLevel, resizeBilinear } from './util.js';
import BlpImage from './BlpImage.js';

class Blp {
  #magic = BLP_MAGIC;
  #formatVersion = 1;
  #colorFormat = BLP_COLOR_FORMAT.COLOR_DXT;
  #alphaSize = 0;
  #preferredFormat = BLP_PIXEL_FORMAT.PIXEL_DXT5;
  #width = 0;
  #height = 0;
  #images: Uint8Array[] = [];
  #palette: Uint8Array;

  get magic() {
    return this.#magic;
  }

  get formatVersion() {
    return this.#formatVersion;
  }

  get colorFormat() {
    return this.#colorFormat;
  }

  get alphaSize() {
    return this.#alphaSize;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

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
    this.#width = header.width;
    this.#height = header.height;

    if (this.#colorFormat === BLP_COLOR_FORMAT.COLOR_PAL) {
      this.#palette = header.extended;
    }

    const mipOffsets = header.mipOffsets;
    const mipSizes = header.mipSizes;

    for (let level = 0; level < MAX_MIP_LEVELS; level++) {
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

  save(source?: IoSource) {
    const extended =
      this.#colorFormat === BLP_COLOR_FORMAT.COLOR_PAL ? this.#palette : new Uint8Array(1024);

    const mipSizes = new Array(MAX_MIP_LEVELS).fill(0);
    const mipOffsets = new Array(MAX_MIP_LEVELS).fill(0);

    const header = {
      magic: this.#magic,
      formatVersion: this.#formatVersion,
      colorFormat: this.#colorFormat,
      alphaSize: this.#alphaSize,
      preferredFormat: this.#preferredFormat,
      hasMips: this.#images.length > 1 ? 1 : 0,
      width: this.#width,
      height: this.#height,
      mipSizes,
      mipOffsets,
      extended,
    };

    // Calculate mip offsets and sizes
    let fileOffset = blpIo.header.getSize(header);
    for (let i = 0; i < this.#images.length; i++) {
      const mipSize = this.#images[i].byteLength;

      mipOffsets[i] = fileOffset;
      mipSizes[i] = mipSize;

      fileOffset += mipSize;
    }

    // Open output
    const buffer = source ? undefined : new Uint8Array(fileOffset);
    const stream = source ? openStream(source, IoMode.Write) : openStream(buffer, IoMode.Write);

    // Write header
    blpIo.header.write(stream, header, {});

    // Write mip images
    for (const image of this.#images) {
      stream.writeBytes(image);
    }

    // Close output
    stream.close();

    // Return buffer if not called with an output source
    if (buffer) {
      return buffer;
    }
  }

  setImage(image: BlpImage, colorFormat: BLP_COLOR_FORMAT, generateMips = false) {
    this.#resetImage();

    this.#colorFormat = colorFormat;
    this.#width = image.width;
    this.#height = image.height;

    switch (this.#colorFormat) {
      case BLP_COLOR_FORMAT.COLOR_RAW:
        return this.#setRawImage(image, generateMips);

      default:
        throw new Error(`Unsupported color format: ${this.#colorFormat}`);
    }
  }

  #setRawImage(image: BlpImage, generateMips: boolean) {
    const levelCount = generateMips ? calcMipLevelCount(image.width, image.height) : 1;

    let imageData: Uint8Array;
    switch (image.format) {
      case BLP_IMAGE_FORMAT.IMAGE_ARGB8888:
        imageData = image.data;
        break;

      case BLP_IMAGE_FORMAT.IMAGE_ABGR8888:
        imageData = rawAbgr8888ToArgb8888(image.width, image.height, image.data);
        break;

      default:
        throw new Error(`Unsupported image format: ${image.format}`);
    }

    this.#preferredFormat = BLP_PIXEL_FORMAT.PIXEL_ARGB8888;
    this.#alphaSize = 8;

    const images = [];

    for (let level = 0; level < levelCount; level++) {
      const mipWidth = getSizeAtMipLevel(image.width, level);
      const mipHeight = getSizeAtMipLevel(image.height, level);
      const mipImage = resizeBilinear(imageData, image.width, image.height, mipWidth, mipHeight);

      images.push(mipImage);
    }

    this.#images = images;
  }

  getImage(level: number = 0, outputFormat: BLP_IMAGE_FORMAT = BLP_IMAGE_FORMAT.IMAGE_UNSPECIFIED) {
    if (level > this.#images.length - 1) {
      throw new Error(`Requested level out of range: ${level} > ${this.#images.length - 1}`);
    }

    if (outputFormat === BLP_IMAGE_FORMAT.IMAGE_UNSPECIFIED) {
      return this.#getUnspecifiedImage(level);
    }

    switch (this.#colorFormat) {
      case BLP_COLOR_FORMAT.COLOR_JPEG:
        return this.#getJpegImage(level, outputFormat);

      case BLP_COLOR_FORMAT.COLOR_PAL:
        return this.#getPalImage(level, outputFormat);

      case BLP_COLOR_FORMAT.COLOR_DXT:
        return this.#getDxtImage(level, outputFormat);

      case BLP_COLOR_FORMAT.COLOR_RAW:
        return this.#getRawImage(level, outputFormat);

      default:
        throw new Error(`Unsupported color format: ${this.#colorFormat}`);
    }
  }

  /**
   * For a given mip level, return a BlpImage containing the unconverted image data from the Blp. If the Blp uses a
   * palette, the image data will be converted to IMAGE_FORMAT.IMAGE_ABGR8888 before being returned.
   *
   * @param level
   * @private
   */
  #getUnspecifiedImage(level: number) {
    switch (this.#colorFormat) {
      case BLP_COLOR_FORMAT.COLOR_PAL:
        // Images using palettes are only useful when decoded
        return this.#getPalImage(level, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

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

      case BLP_COLOR_FORMAT.COLOR_RAW:
        return this.#getRawImage(level, BLP_IMAGE_FORMAT.IMAGE_ARGB8888);

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

      case BLP_IMAGE_FORMAT.IMAGE_ABGR8888:
        return new BlpImage(width, height, dxt1ToAbgr8888(width, height, data), outputFormat);

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

      case BLP_IMAGE_FORMAT.IMAGE_ABGR8888:
        return new BlpImage(width, height, dxt3ToAbgr8888(width, height, data), outputFormat);

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

      case BLP_IMAGE_FORMAT.IMAGE_ABGR8888:
        return new BlpImage(width, height, dxt5ToAbgr8888(width, height, data), outputFormat);

      default:
        throw new Error(`Unsupported output format: ${outputFormat}`);
    }
  }

  #getPalImage(level: number, outputFormat: BLP_IMAGE_FORMAT): BlpImage {
    const width = getSizeAtMipLevel(this.#width, level);
    const height = getSizeAtMipLevel(this.#height, level);
    const data = this.#images[level];

    switch (outputFormat) {
      case BLP_IMAGE_FORMAT.IMAGE_ABGR8888:
        return new BlpImage(
          width,
          height,
          palToAbgr8888(width, height, data, this.#palette, this.#alphaSize),
          outputFormat,
        );
      default:
        throw new Error(`Unsupported output format: ${outputFormat}`);
    }
  }

  #getRawImage(level: number, outputFormat: BLP_IMAGE_FORMAT): BlpImage {
    const width = getSizeAtMipLevel(this.#width, level);
    const height = getSizeAtMipLevel(this.#height, level);
    const data = this.#images[level];

    switch (outputFormat) {
      case BLP_IMAGE_FORMAT.IMAGE_ARGB8888:
        return new BlpImage(width, height, data, outputFormat);

      case BLP_IMAGE_FORMAT.IMAGE_ABGR8888:
        return new BlpImage(
          width,
          height,
          rawArgb8888ToAbgr8888(width, height, data),
          outputFormat,
        );

      default:
        throw new Error(`Unsupported output format: ${outputFormat}`);
    }
  }

  #resetImage() {
    this.#colorFormat = BLP_COLOR_FORMAT.COLOR_DXT;
    this.#preferredFormat = BLP_PIXEL_FORMAT.PIXEL_DXT5;
    this.#alphaSize = 0;
    this.#width = 0;
    this.#height = 0;
    this.#images = [];
  }
}

export default Blp;
export { BlpImage, BLP_COLOR_FORMAT, BLP_IMAGE_FORMAT, BLP_PIXEL_FORMAT };
