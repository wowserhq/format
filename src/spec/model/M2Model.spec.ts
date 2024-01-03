import { describe, expect, test } from 'vitest';
import M2Model from '../../lib/model/M2Model.js';

describe('M2Model', () => {
  describe('load', () => {
    describe('creature', () => {
      test('should load model from valid file', () => {
        const model = new M2Model().load('./fixture/model/creature.m2');

        expect(model.name).toEqual('NorthrendPenguin');
        expect(model.flags).toEqual(8);
        expect(model.skinProfileCount).toBe(2);
        expect(model.textures.length).toBe(2);
        expect(model.vertices.byteLength).toBe(41664);
        expect(model.materials.length).toBe(2);
      });
    });
  });
});
