import { describe, expect, test } from 'vitest';
import MapObjGroup from '../../lib/mapobj/MapObjGroup.js';

describe('MapObjGroup', () => {
  describe('load', () => {
    describe('inn', () => {
      test('should load exterior mapobj group from valid file', () => {
        const mapObjGroup = new MapObjGroup().load('./fixture/mapobj/inn_000.wmo');

        expect(mapObjGroup.version).toBe(17);

        expect(mapObjGroup.batches.length).toBe(13);
        expect(mapObjGroup.batches[0].flags).toBe(0);
        expect(mapObjGroup.batches[0].boundingBox).toStrictEqual([-5, -13, -3, 4, -8, 23]);
        expect(mapObjGroup.batches[0].indexStart).toBe(0);
        expect(mapObjGroup.batches[0].indexCount).toBe(132);
        expect(mapObjGroup.batches[0].vertexStart).toBe(0);
        expect(mapObjGroup.batches[0].vertexCount).toBe(69);
        expect(mapObjGroup.batches[0].materialIndex).toBe(6);

        expect(mapObjGroup.vertices.length).toBe(8277);
        expect(mapObjGroup.colors).toBeUndefined();
      });

      test('should load interior mapobj group from valid file', () => {
        const mapObjGroup = new MapObjGroup().load('./fixture/mapobj/inn_003.wmo');

        expect(mapObjGroup.version).toBe(17);

        expect(mapObjGroup.batches.length).toBe(13);
        expect(mapObjGroup.batches[0].flags).toBe(0);
        expect(mapObjGroup.batches[0].boundingBox).toStrictEqual([-34, -1, +0, -28, 5, 7]);
        expect(mapObjGroup.batches[0].indexStart).toBe(0);
        expect(mapObjGroup.batches[0].indexCount).toBe(453);
        expect(mapObjGroup.batches[0].vertexStart).toBe(0);
        expect(mapObjGroup.batches[0].vertexCount).toBe(122);
        expect(mapObjGroup.batches[0].materialIndex).toBe(6);

        expect(mapObjGroup.vertices.length).toBe(6930);
        expect(mapObjGroup.colors.length).toBe((6930 / 3) * 4);
      });
    });
  });
});
