import Blp, { BLP_COLOR_FORMAT, BLP_PIXEL_FORMAT } from '../../lib/blp/Blp.js';
import { expect, describe, test } from 'vitest';

describe('Blp', () => {
  describe('load', () => {
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

  describe('getImage', () => {
    test('should return image level 0', () => {
      const blp = new Blp();
      blp.load('./fixture/dxt5.blp');

      const image = blp.getImage(0);

      expect(image.data.byteLength).toBe(262144);
      expect(image.width).toBe(512);
      expect(image.height).toBe(512);
    });
  });
});
