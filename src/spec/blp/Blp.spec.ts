import Blp, { BLP_COLOR_FORMAT, BLP_IMAGE_FORMAT } from '../../lib/blp/Blp.js';
import { describe, expect, test } from 'vitest';
import * as fs from 'fs';

describe('Blp', () => {
  describe('load', () => {
    describe('pala0', () => {
      test('should load blp from valid file', () => {
        const blp = new Blp();
        blp.load('./fixture/pala0.blp');

        expect(blp.magic).toBe('BLP2');
        expect(blp.formatVersion).toBe(1);
        expect(blp.colorFormat).toBe(BLP_COLOR_FORMAT.COLOR_PAL);
        expect(blp.alphaSize).toBe(0);
        expect(blp.width).toBe(512);
        expect(blp.height).toBe(512);
      });
    });

    describe('pala1', () => {
      test('should load blp from valid file', () => {
        const blp = new Blp();
        blp.load('./fixture/pala1.blp');

        expect(blp.magic).toBe('BLP2');
        expect(blp.formatVersion).toBe(1);
        expect(blp.colorFormat).toBe(BLP_COLOR_FORMAT.COLOR_PAL);
        expect(blp.alphaSize).toBe(1);
        expect(blp.width).toBe(32);
        expect(blp.height).toBe(32);
      });
    });

    describe('pala4', () => {
      test('should load blp from valid file', () => {
        const blp = new Blp();
        blp.load('./fixture/pala4.blp');

        expect(blp.magic).toBe('BLP2');
        expect(blp.formatVersion).toBe(1);
        expect(blp.colorFormat).toBe(BLP_COLOR_FORMAT.COLOR_PAL);
        expect(blp.alphaSize).toBe(4);
        expect(blp.width).toBe(128);
        expect(blp.height).toBe(128);
      });
    });

    describe('pala8', () => {
      test('should load blp from valid file', () => {
        const blp = new Blp();
        blp.load('./fixture/pala8.blp');

        expect(blp.magic).toBe('BLP2');
        expect(blp.formatVersion).toBe(1);
        expect(blp.colorFormat).toBe(BLP_COLOR_FORMAT.COLOR_PAL);
        expect(blp.alphaSize).toBe(8);
        expect(blp.width).toBe(128);
        expect(blp.height).toBe(64);
      });
    });

    describe('dxt1a', () => {
      test('should load blp from valid file', () => {
        const blp = new Blp();
        blp.load('./fixture/dxt1a.blp');

        expect(blp.magic).toBe('BLP2');
        expect(blp.formatVersion).toBe(1);
        expect(blp.colorFormat).toBe(BLP_COLOR_FORMAT.COLOR_DXT);
        expect(blp.alphaSize).toBe(1);
        expect(blp.width).toBe(16);
        expect(blp.height).toBe(16);
      });
    });

    describe('dxt3', () => {
      test('should load blp from valid file', () => {
        const blp = new Blp();
        blp.load('./fixture/dxt3.blp');

        expect(blp.magic).toBe('BLP2');
        expect(blp.formatVersion).toBe(1);
        expect(blp.colorFormat).toBe(BLP_COLOR_FORMAT.COLOR_DXT);
        expect(blp.alphaSize).toBe(8);
        expect(blp.width).toBe(256);
        expect(blp.height).toBe(256);
      });
    });

    describe('dxt5', () => {
      test('should load blp from valid file', () => {
        const blp = new Blp();
        blp.load('./fixture/dxt5.blp');

        expect(blp.magic).toBe('BLP2');
        expect(blp.formatVersion).toBe(1);
        expect(blp.colorFormat).toBe(BLP_COLOR_FORMAT.COLOR_DXT);
        expect(blp.alphaSize).toBe(8);
        expect(blp.width).toBe(512);
        expect(blp.height).toBe(512);
      });
    });

    describe('raw', () => {
      test('should load blp from valid file', () => {
        const blp = new Blp();
        blp.load('./fixture/raw.blp');

        expect(blp.magic).toBe('BLP2');
        expect(blp.formatVersion).toBe(1);
        expect(blp.colorFormat).toBe(BLP_COLOR_FORMAT.COLOR_RAW);
        expect(blp.alphaSize).toBe(136);
        expect(blp.width).toBe(256);
        expect(blp.height).toBe(256);
      });
    });
  });

  describe('getImage', () => {
    describe('pala0', () => {
      test('should return image for default level and format', () => {
        const blp = new Blp();
        blp.load('./fixture/pala0.blp');

        const image = blp.getImage();

        expect(image.width).toBe(512);
        expect(image.height).toBe(512);
        expect(image.data.byteLength).toBe(512 * 512 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ABGR8888);
      });

      test('should return image for level 1 and ABGR8888 format', () => {
        const blp = new Blp();
        blp.load('./fixture/pala0.blp');

        const image = blp.getImage(1, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        expect(image.width).toBe(256);
        expect(image.height).toBe(256);
        expect(image.data.byteLength).toBe(256 * 256 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        const firstPixel = image.data.subarray(0, 4);
        expect(firstPixel).toStrictEqual(new Uint8Array([196, 147, 114, 255]));

        const middlePixel = image.data.subarray(131068, 131072);
        expect(middlePixel).toStrictEqual(new Uint8Array([138, 76, 43, 255]));

        const lastPixel = image.data.subarray(262140, 262144);
        expect(lastPixel).toStrictEqual(new Uint8Array([147, 83, 46, 255]));
      });
    });

    describe('pala1', () => {
      test('should return image for default level and format', () => {
        const blp = new Blp();
        blp.load('./fixture/pala1.blp');

        const image = blp.getImage();

        expect(image.width).toBe(32);
        expect(image.height).toBe(32);
        expect(image.data.byteLength).toBe(32 * 32 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ABGR8888);
      });

      test('should return image for level 1 and ABGR8888 format', () => {
        const blp = new Blp();
        blp.load('./fixture/pala1.blp');

        const image = blp.getImage(1, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        expect(image.width).toBe(16);
        expect(image.height).toBe(16);
        expect(image.data.byteLength).toBe(16 * 16 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        const firstPixel = image.data.subarray(0, 4);
        expect(firstPixel).toStrictEqual(new Uint8Array([96, 115, 123, 255]));

        const middlePixel = image.data.subarray(508, 512);
        expect(middlePixel).toStrictEqual(new Uint8Array([0, 0, 0, 0]));

        const lastPixel = image.data.subarray(1020, 1024);
        expect(lastPixel).toStrictEqual(new Uint8Array([84, 52, 26, 255]));
      });
    });

    describe('pala4', () => {
      test('should return image for default level and format', () => {
        const blp = new Blp();
        blp.load('./fixture/pala4.blp');

        const image = blp.getImage();

        expect(image.width).toBe(128);
        expect(image.height).toBe(128);
        expect(image.data.byteLength).toBe(128 * 128 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ABGR8888);
      });

      test('should return image for level 1 and ABGR8888 format', () => {
        const blp = new Blp();
        blp.load('./fixture/pala4.blp');

        const image = blp.getImage(1, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        expect(image.width).toBe(64);
        expect(image.height).toBe(64);
        expect(image.data.byteLength).toBe(64 * 64 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        const firstPixel = image.data.subarray(0, 4);
        expect(firstPixel).toStrictEqual(new Uint8Array([10, 5, 8, 255]));

        const middlePixel = image.data.subarray(8188, 8192);
        expect(middlePixel).toStrictEqual(new Uint8Array([1, 0, 0, 0]));

        const lastPixel = image.data.subarray(16380, 16384);
        expect(lastPixel).toStrictEqual(new Uint8Array([1, 0, 0, 0]));
      });
    });

    describe('pala8', () => {
      test('should return image for default level and format', () => {
        const blp = new Blp();
        blp.load('./fixture/pala8.blp');

        const image = blp.getImage();

        expect(image.width).toBe(128);
        expect(image.height).toBe(64);
        expect(image.data.byteLength).toBe(128 * 64 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ABGR8888);
      });

      test('should return image for level 1 and ABGR8888 format', () => {
        const blp = new Blp();
        blp.load('./fixture/pala8.blp');

        const image = blp.getImage(1, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        expect(image.width).toBe(64);
        expect(image.height).toBe(32);
        expect(image.data.byteLength).toBe(64 * 32 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        const firstPixel = image.data.subarray(0, 4);
        expect(firstPixel).toStrictEqual(new Uint8Array([26, 31, 39, 255]));

        const middlePixel = image.data.subarray(4092, 4096);
        expect(middlePixel).toStrictEqual(new Uint8Array([1, 2, 1, 6]));

        const lastPixel = image.data.subarray(8188, 8192);
        expect(lastPixel).toStrictEqual(new Uint8Array([30, 28, 30, 16]));
      });
    });

    describe('dxt1a', () => {
      test('should return image for default level and format', () => {
        const blp = new Blp();
        blp.load('./fixture/dxt1a.blp');

        const image = blp.getImage();

        expect(image.width).toBe(16);
        expect(image.height).toBe(16);
        expect(image.data.byteLength).toBe((16 * 16) / 2);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_DXT1);
      });

      test('should return image for level 1 and ABGR8888 format', () => {
        const blp = new Blp();
        blp.load('./fixture/dxt1a.blp');

        const image = blp.getImage(1, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        expect(image.width).toBe(8);
        expect(image.height).toBe(8);
        expect(image.data.byteLength).toBe(8 * 8 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        const firstPixel = image.data.subarray(0, 4);
        expect(firstPixel).toStrictEqual(new Uint8Array([165, 134, 0, 255]));

        const middlePixel = image.data.subarray(124, 128);
        expect(middlePixel).toStrictEqual(new Uint8Array([0, 0, 0, 0]));

        const lastPixel = image.data.subarray(252, 256);
        expect(lastPixel).toStrictEqual(new Uint8Array([0, 0, 0, 0]));
      });
    });

    describe('dxt3', () => {
      test('should return image for default level and format', () => {
        const blp = new Blp();
        blp.load('./fixture/dxt3.blp');

        const image = blp.getImage();

        expect(image.width).toBe(256);
        expect(image.height).toBe(256);
        expect(image.data.byteLength).toBe(256 * 256 * 1);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_DXT3);
      });

      test('should return image for level 1 and ABGR8888 format', () => {
        const blp = new Blp();
        blp.load('./fixture/dxt3.blp');

        const image = blp.getImage(1, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        expect(image.width).toBe(128);
        expect(image.height).toBe(128);
        expect(image.data.byteLength).toBe(128 * 128 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        const firstPixel = image.data.subarray(0, 4);
        expect(firstPixel).toStrictEqual(new Uint8Array([206, 142, 2, 0]));

        const middlePixel = image.data.subarray(32764, 32768);
        expect(middlePixel).toStrictEqual(new Uint8Array([123, 77, 24, 68]));

        const lastPixel = image.data.subarray(65532, 65536);
        expect(lastPixel).toStrictEqual(new Uint8Array([164, 117, 30, 0]));
      });
    });

    describe('dxt5', () => {
      test('should return image for default level and format', () => {
        const blp = new Blp();
        blp.load('./fixture/dxt5.blp');

        const image = blp.getImage();

        expect(image.width).toBe(512);
        expect(image.height).toBe(512);
        expect(image.data.byteLength).toBe(512 * 512 * 1);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_DXT5);
      });

      test('should return image for level 1 and ABGR8888 format', () => {
        const blp = new Blp();
        blp.load('./fixture/dxt5.blp');

        const image = blp.getImage(1, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        expect(image.width).toBe(256);
        expect(image.height).toBe(256);
        expect(image.data.byteLength).toBe(256 * 256 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        const firstPixel = image.data.subarray(0, 4);
        expect(firstPixel).toStrictEqual(new Uint8Array([57, 28, 24, 241]));

        const middlePixel = image.data.subarray(131068, 131072);
        expect(middlePixel).toStrictEqual(new Uint8Array([41, 38, 38, 147]));

        const lastPixel = image.data.subarray(262140, 262144);
        expect(lastPixel).toStrictEqual(new Uint8Array([27, 26, 35, 221]));
      });
    });

    describe('raw', () => {
      test('should return image for default level and format', () => {
        const blp = new Blp();
        blp.load('./fixture/raw.blp');

        const image = blp.getImage();

        expect(image.width).toBe(256);
        expect(image.height).toBe(256);
        expect(image.data.byteLength).toBe(256 * 256 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ARGB8888);
      });

      test('should return image for level 0 and ABGR8888 format', () => {
        const blp = new Blp();
        blp.load('./fixture/raw.blp');

        const image = blp.getImage(0, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        expect(image.width).toBe(256);
        expect(image.height).toBe(256);
        expect(image.data.byteLength).toBe(256 * 256 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        const firstPixel = image.data.subarray(0, 4);
        expect(firstPixel).toStrictEqual(new Uint8Array([0, 0, 0, 0]));

        const middlePixel = image.data.subarray(131068, 131072);
        expect(middlePixel).toStrictEqual(new Uint8Array([0, 0, 0, 0]));

        const lastPixel = image.data.subarray(262140, 262144);
        expect(lastPixel).toStrictEqual(new Uint8Array([0, 0, 0, 0]));
      });
    });
  });

  describe('save', () => {
    test('should save empty blp', () => {
      const blp = new Blp();
      const data = blp.save();

      const loadedBlp = new Blp();
      loadedBlp.load(data);

      expect(loadedBlp.magic).toBe('BLP2');
      expect(loadedBlp.formatVersion).toBe(1);
      expect(loadedBlp.colorFormat).toBe(BLP_COLOR_FORMAT.COLOR_DXT);
      expect(loadedBlp.width).toBe(0);
      expect(loadedBlp.height).toBe(0);
      expect(loadedBlp.alphaSize).toBe(0);
    });

    test('should save raw blp', () => {
      const blp = new Blp();
      blp.load('./fixture/raw.blp');
      const savedData = blp.save();

      const originalBuffer = fs.readFileSync('./fixture/raw.blp');
      const originalData = new Uint8Array(originalBuffer.buffer);

      // header
      expect(savedData.subarray(0, 1172)).toEqual(originalData.subarray(0, 1172));

      // mips
      expect(savedData.subarray(1172)).toEqual(originalData.subarray(1172));
    });

    test('should save dxt blp', () => {
      const blp = new Blp();
      blp.load('./fixture/dxt3.blp');
      const savedData = blp.save();

      const originalBuffer = fs.readFileSync('./fixture/dxt3.blp');
      const originalData = new Uint8Array(originalBuffer.buffer);

      // header
      expect(savedData.subarray(0, 1172)).toEqual(originalData.subarray(0, 1172));

      // mips
      expect(savedData.subarray(1172)).toEqual(originalData.subarray(1172));
    });

    test('should save pal blp', () => {
      const blp = new Blp();
      blp.load('./fixture/pala4.blp');
      const savedData = blp.save();

      const originalBuffer = fs.readFileSync('./fixture/pala4.blp');
      const originalData = new Uint8Array(originalBuffer.buffer);

      // header
      expect(savedData.subarray(0, 1172)).toEqual(originalData.subarray(0, 1172));

      // mips
      expect(savedData.subarray(1172)).toEqual(originalData.subarray(1172));
    });
  });

  describe('setImage', () => {
    describe('raw', () => {
      test('should set image with given ARGB8888 source and mipmap generation disabled', () => {
        const srcBlp = new Blp();
        srcBlp.load('./fixture/raw.blp');
        const srcImage = srcBlp.getImage(0, BLP_IMAGE_FORMAT.IMAGE_ARGB8888);

        const dstBlp = new Blp();
        dstBlp.colorFormat = BLP_COLOR_FORMAT.COLOR_RAW;
        dstBlp.setImage(srcImage, false);
        const dstImage = dstBlp.getImage(0);

        expect(dstBlp.width).toBe(256);
        expect(dstBlp.height).toBe(256);
        expect(dstBlp.colorFormat).toBe(BLP_COLOR_FORMAT.COLOR_RAW);

        expect(dstImage.width).toBe(256);
        expect(dstImage.height).toBe(256);
        expect(dstImage.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ARGB8888);
      });

      test('should set image with given ARGB8888 source and mipmap generation enabled', () => {
        const srcBlp = new Blp();
        srcBlp.load('./fixture/raw.blp');
        const srcImage = srcBlp.getImage(0, BLP_IMAGE_FORMAT.IMAGE_ARGB8888);

        const dstBlp = new Blp();
        dstBlp.colorFormat = BLP_COLOR_FORMAT.COLOR_RAW;
        dstBlp.setImage(srcImage, true);
        const dstImage = dstBlp.getImage(1);

        expect(dstBlp.width).toBe(256);
        expect(dstBlp.height).toBe(256);
        expect(dstBlp.colorFormat).toBe(BLP_COLOR_FORMAT.COLOR_RAW);

        expect(dstImage.width).toBe(128);
        expect(dstImage.height).toBe(128);
        expect(dstImage.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ARGB8888);
      });

      test('should set image with given ABGR8888 source and mipmap generation disabled', () => {
        const srcBlp = new Blp();
        srcBlp.load('./fixture/raw.blp');
        const srcImage = srcBlp.getImage(0, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        const dstBlp = new Blp();
        dstBlp.colorFormat = BLP_COLOR_FORMAT.COLOR_RAW;
        dstBlp.setImage(srcImage, false);
        const dstImage = dstBlp.getImage(0);

        expect(dstBlp.width).toBe(256);
        expect(dstBlp.height).toBe(256);
        expect(dstBlp.colorFormat).toBe(BLP_COLOR_FORMAT.COLOR_RAW);

        expect(dstImage.width).toBe(256);
        expect(dstImage.height).toBe(256);
        expect(dstImage.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ARGB8888);
      });

      test('should set image with given ABGR8888 source and mipmap generation enabled', () => {
        const srcBlp = new Blp();
        srcBlp.load('./fixture/raw.blp');
        const srcImage = srcBlp.getImage(0, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        const dstBlp = new Blp();
        dstBlp.colorFormat = BLP_COLOR_FORMAT.COLOR_RAW;
        dstBlp.setImage(srcImage, true);
        const dstImage = dstBlp.getImage(1);

        expect(dstBlp.width).toBe(256);
        expect(dstBlp.height).toBe(256);
        expect(dstBlp.colorFormat).toBe(BLP_COLOR_FORMAT.COLOR_RAW);

        expect(dstImage.width).toBe(128);
        expect(dstImage.height).toBe(128);
        expect(dstImage.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ARGB8888);
      });
    });
  });
});
