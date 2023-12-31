import { describe, expect, test } from 'vitest';
import Map from '../../lib/map/Map.js';
import MapArea from '../../lib/map/MapArea.js';

describe('MapArea', () => {
  describe('load', () => {
    describe('continent', () => {
      test('should load map area from valid file', () => {
        const map = new Map().load('./fixture/map/continent.wdt');
        const mapArea = new MapArea(map.layerSplatDepth).load('./fixture/map/continent4229.adt');

        expect(mapArea.version).toBe(18);
        expect(mapArea.chunks.length).toBe(16 * 16);
        expect(mapArea.doodadDefs.length).toBe(381);
        expect(mapArea.objDefs.length).toBe(19);
      });
    });

    describe('pvpzone', () => {
      test('should load map area from valid file', () => {
        const map = new Map().load('./fixture/map/pvpzone.wdt');
        const mapArea = new MapArea(map.layerSplatDepth).load('./fixture/map/pvpzone3430.adt');

        expect(mapArea.version).toBe(18);
        expect(mapArea.chunks.length).toBe(16 * 16);
        expect(mapArea.doodadDefs.length).toBe(0);
        expect(mapArea.objDefs.length).toBe(0);
      });
    });
  });
});
