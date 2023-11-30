import Blp, { BLP_COLOR_FORMAT, BLP_IMAGE_FORMAT } from '../../lib/blp/Blp.js';
import { describe, expect, test } from 'vitest';

describe('Blp', () => {
  describe('load', () => {
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
  });

  describe('getImage', () => {
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

        const image = blp.getImage(1, BLP_IMAGE_FORMAT.IMAGE_RGBA8888);

        expect(image.width).toBe(8);
        expect(image.height).toBe(8);
        expect(image.data.byteLength).toBe(8 * 8 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_RGBA8888);
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

        const image = blp.getImage(1, BLP_IMAGE_FORMAT.IMAGE_RGBA8888);

        expect(image.width).toBe(128);
        expect(image.height).toBe(128);
        expect(image.data.byteLength).toBe(128 * 128 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_RGBA8888);
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

        const image = blp.getImage(1, BLP_IMAGE_FORMAT.IMAGE_RGBA8888);

        expect(image.width).toBe(256);
        expect(image.height).toBe(256);
        expect(image.data.byteLength).toBe(256 * 256 * 4);
        expect(image.format).toBe(BLP_IMAGE_FORMAT.IMAGE_RGBA8888);
      });
    });
  });
});
