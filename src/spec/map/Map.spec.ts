import { describe, expect, test } from 'vitest';
import Map from '../../lib/map/Map.js';

describe('Map', () => {
  describe('load', () => {
    describe('continent', () => {
      test('should load map from valid file', () => {
        const map = new Map().load('./fixture/map/continent.wdt');

        expect(map.version).toBe(18);
      });
    });
  });
});
