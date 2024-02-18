import { describe, expect, test } from 'vitest';
import MapObj, {
  MAP_OBJ_GROUP_FLAG,
  MAP_OBJ_FRAGMENT_SHADER,
  MAP_OBJ_VERTEX_SHADER,
} from '../../lib/mapobj/MapObj.js';

describe('MapObj', () => {
  describe('load', () => {
    describe('inn', () => {
      test('should load mapobj from valid file', () => {
        const mapObj = new MapObj().load('./fixture/mapobj/inn.wmo');

        expect(mapObj.version).toBe(17);
        expect(mapObj.flags).toBe(0);
        expect(mapObj.ambientColor).toStrictEqual({ r: 25, g: 25, b: 25, a: 255 });

        expect(mapObj.materials.length).toBe(22);
        expect(mapObj.materials[0].textures).toStrictEqual([
          'DUNGEONS\\TEXTURES\\WALLS\\MM_DUSKWOOD_WALL_01.BLP',
        ]);
        expect(mapObj.materials[0].vertexShader).toBe(MAP_OBJ_VERTEX_SHADER.VERTEX_DIFFUSE_T1);
        expect(mapObj.materials[0].fragmentShader).toBe(MAP_OBJ_FRAGMENT_SHADER.FRAGMENT_DIFFUSE);

        expect(mapObj.groupInfo.length).toBe(11);
        expect(mapObj.groupInfo[0].flags).toBe(MAP_OBJ_GROUP_FLAG.FLAG_EXTERIOR);
      });
    });
  });
});
