import { describe, expect, test } from 'vitest';
import M2Model from '../../lib/model/M2Model.js';
import M2SkinProfile from '../../lib/model/M2SkinProfile.js';
import { M2_FRAGMENT_SHADER, M2_VERTEX_SHADER } from '../../lib/model/M2Batch.js';

describe('M2SkinProfile', () => {
  describe('load', () => {
    describe('creature', () => {
      test('should load skin profile from valid file', () => {
        const model = new M2Model().load('./fixture/model/creature.m2');
        const skin = new M2SkinProfile(model).load('./fixture/model/creature01.skin');

        expect(skin.skinSections.length).toBe(3);

        expect(skin.batches.length).toBe(3);
        expect(skin.batches[0].vertexShader).toBe(M2_VERTEX_SHADER.VERTEX_T1_ENV);
        expect(skin.batches[0].fragmentShader).toBe(
          M2_FRAGMENT_SHADER.FRAGMENT_OPAQUE_MOD2XNA_ALPHA,
        );
        expect(skin.batches[1].vertexShader).toBe(M2_VERTEX_SHADER.VERTEX_T1_ENV);
        expect(skin.batches[1].fragmentShader).toBe(
          M2_FRAGMENT_SHADER.FRAGMENT_OPAQUE_MOD2XNA_ALPHA,
        );
        expect(skin.batches[2].vertexShader).toBe(M2_VERTEX_SHADER.VERTEX_T1_ENV);
        expect(skin.batches[2].fragmentShader).toBe(
          M2_FRAGMENT_SHADER.FRAGMENT_OPAQUE_MOD2XNA_ALPHA,
        );
      });
    });

    describe('tank', () => {
      test('should load skin profile from valid file', () => {
        const model = new M2Model().load('./fixture/model/tank.m2');
        const skin = new M2SkinProfile(model).load('./fixture/model/tank00.skin');

        expect(skin.skinSections.length).toBe(3);

        expect(skin.batches.length).toBe(3);
        expect(skin.batches[0].vertexShader).toBe(M2_VERTEX_SHADER.VERTEX_T1_ENV);
        expect(skin.batches[0].fragmentShader).toBe(M2_FRAGMENT_SHADER.FRAGMENT_OPAQUE_ADDALPHA);
        expect(skin.batches[1].vertexShader).toBe(M2_VERTEX_SHADER.VERTEX_T1_ENV);
        expect(skin.batches[1].fragmentShader).toBe(M2_FRAGMENT_SHADER.FRAGMENT_OPAQUE_ADDALPHA);
        expect(skin.batches[2].vertexShader).toBe(M2_VERTEX_SHADER.VERTEX_T1_ENV);
        expect(skin.batches[2].fragmentShader).toBe(M2_FRAGMENT_SHADER.FRAGMENT_OPAQUE_ADDALPHA);
      });
    });
  });
});
