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

        expect(model.bounds.extent).toEqual(
          new Float32Array([
            -2.055446147918701, -1.4217110872268677, -1.7242010831832886, 2.2739715576171875,
            1.308982491493225, 2.1279048919677734,
          ]),
        );
        expect(model.bounds.radius).toBe(2.486646890640259);
      });
    });
  });
});
