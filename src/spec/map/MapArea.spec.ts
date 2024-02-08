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

      test('should contain doodad defs in the expected format', () => {
        const map = new Map().load('./fixture/map/continent.wdt');
        const mapArea = new MapArea(map.layerSplatDepth).load('./fixture/map/continent4229.adt');

        const doodadDef1 = mapArea.doodadDefs.find((def) => def.id === 206410);
        expect(doodadDef1.name.split(/\\/).at(-1)).toBe('TIRISFALLGLADECANOPYTREE05.M2');
        expect(doodadDef1.rotation).toEqual([0, 0, 1, 6.123234262925839e-17]);

        const doodadDef2 = mapArea.doodadDefs.find((def) => def.id === 2542963);
        expect(doodadDef2.name.split(/\\/).at(-1)).toBe('TIRISFALLGLADECANOPYTREE05.M2');
        expect(doodadDef2.rotation).toEqual([
          0.0701502189040184, -0.038644179701805115, 0.9901213645935059, 0.11508788913488388,
        ]);
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
