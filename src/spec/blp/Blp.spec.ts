import Blp, { BLP_COLOR_FORMAT, BLP_IMAGE_FORMAT } from '../../lib/blp/Blp.js';
import { describe, expect, test } from 'vitest';

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
        expect(blp.hasMips).toBe(1);
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
        expect(blp.hasMips).toBe(1);
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
        expect(blp.hasMips).toBe(1);
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
        expect(blp.hasMips).toBe(1);
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
        expect(blp.hasMips).toBe(1);
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
        expect(blp.hasMips).toBe(1);
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
        expect(blp.hasMips).toBe(1);
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
        expect(blp.hasMips).toBe(0);
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

      test('should return image for level 1 and RGBA8888 format', () => {
        const blp = new Blp();
        blp.load('./fixture/pala0.blp');

        const image = blp.getImage(1, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        expect(image.width).toBe(256);
        expect(image.height).toBe(256);
        expect(image.data.byteLength).toBe(256 * 256 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ABGR8888);
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

      test('should return image for level 1 and RGBA8888 format', () => {
        const blp = new Blp();
        blp.load('./fixture/pala1.blp');

        const image = blp.getImage(1, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        expect(image.width).toBe(16);
        expect(image.height).toBe(16);
        expect(image.data.byteLength).toBe(16 * 16 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ABGR8888);
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

      test('should return image for level 1 and RGBA8888 format', () => {
        const blp = new Blp();
        blp.load('./fixture/pala4.blp');

        const image = blp.getImage(1, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        expect(image.width).toBe(64);
        expect(image.height).toBe(64);
        expect(image.data.byteLength).toBe(64 * 64 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ABGR8888);
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

      test('should return image for level 1 and RGBA8888 format', () => {
        const blp = new Blp();
        blp.load('./fixture/pala8.blp');

        const image = blp.getImage(1, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        expect(image.width).toBe(64);
        expect(image.height).toBe(32);
        expect(image.data.byteLength).toBe(64 * 32 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ABGR8888);
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

      test('should return image for level 1 and RGBA8888 format', () => {
        const blp = new Blp();
        blp.load('./fixture/dxt1a.blp');

        const image = blp.getImage(1, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        expect(image.width).toBe(8);
        expect(image.height).toBe(8);
        expect(image.data.byteLength).toBe(8 * 8 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ABGR8888);
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

      test('should return image for level 1 and RGBA8888 format', () => {
        const blp = new Blp();
        blp.load('./fixture/dxt3.blp');

        const image = blp.getImage(1, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        expect(image.width).toBe(128);
        expect(image.height).toBe(128);
        expect(image.data.byteLength).toBe(128 * 128 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ABGR8888);
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

      test('should return image for level 1 and RGBA8888 format', () => {
        const blp = new Blp();
        blp.load('./fixture/dxt5.blp');

        const image = blp.getImage(1, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);

        expect(image.width).toBe(256);
        expect(image.height).toBe(256);
        expect(image.data.byteLength).toBe(256 * 256 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_ABGR8888);
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
      });
    });
  });
});
