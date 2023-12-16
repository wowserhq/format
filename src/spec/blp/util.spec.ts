import { calcMipLevelCount, getSizeAtMipLevel } from '../../lib/blp/util.js';
import { describe, expect, test } from 'vitest';

describe('util', () => {
  describe('calcMipLevelCount', () => {
    test('should return expected mip level count for 512x512 dimensions', () => {
      expect(calcMipLevelCount(512, 512)).toBe(10);
    });

    test('should return expected mip level count for 16x16 dimensions', () => {
      expect(calcMipLevelCount(16, 16)).toBe(5);
    });

    test('should return expected mip level count for 1x1 dimensions', () => {
      expect(calcMipLevelCount(1, 1)).toBe(1);
    });

    test('should return expected mip level count for 128x64 dimensions', () => {
      expect(calcMipLevelCount(128, 64)).toBe(8);
    });
  });

  describe('getSizeAtMipLevel', () => {
    test('should return expected size given initial size of 512 and mip level of 0', () => {
      expect(getSizeAtMipLevel(512, 0)).toBe(512);
    });

    test('should return expected size given initial size of 512 and mip level of 1', () => {
      expect(getSizeAtMipLevel(512, 1)).toBe(256);
    });

    test('should return expected size given initial size of 512 and mip level of 9', () => {
      expect(getSizeAtMipLevel(512, 9)).toBe(1);
    });

    test('should return expected size given initial size of 2 and mip level of 1', () => {
      expect(getSizeAtMipLevel(2, 1)).toBe(1);
    });
  });
});
