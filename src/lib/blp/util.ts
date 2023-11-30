import { COLOR_FORMAT, IMAGE_FORMAT, PIXEL_FORMAT } from './const.js';

const calcLevelCount = (width, height) => {
  let count = 1;

  let w = width === height * 6 ? width / 6 : width;
  let h = height;

  while (w > 1 || h > 1) {
    w = w >> 1 >= 1 ? w >> 1 : 1;
    h = h >> 1 >= 1 ? h >> 1 : 1;
    count++;
  }

  return count;
};

/**
 * For a given pair of color and pixel formats, return the expected image format for getting and setting images from
 * a Blp.
 *
 * @param colorFormat
 * @param pixelFormat
 */
const getImageFormat = (pixelFormat: PIXEL_FORMAT) => {
  switch (pixelFormat) {
    case PIXEL_FORMAT.PIXEL_DXT1:
      return IMAGE_FORMAT.IMAGE_DXT1;
    case PIXEL_FORMAT.PIXEL_DXT3:
      return IMAGE_FORMAT.IMAGE_DXT3;
    case PIXEL_FORMAT.PIXEL_DXT5:
      return IMAGE_FORMAT.IMAGE_DXT5;
    default:
      return IMAGE_FORMAT.IMAGE_UNSPECIFIED;
  }
};

const getSizeAtMipLevel = (size: number, level: number) => (size / (1 << level)) | 0;

export { calcLevelCount, getImageFormat, getSizeAtMipLevel };
