import { describe, expect, test } from 'vitest';
import M2Model from '../../lib/model/M2Model.js';
import M2SkinProfile from '../../lib/model/M2SkinProfile.js';

describe('M2SkinProfile', () => {
  describe('load', () => {
    describe('creature', () => {
      test('should load skin profile from valid file', () => {
        const model = new M2Model().load('./fixture/model/creature.m2');
        const skin = new M2SkinProfile(model).load('./fixture/model/creature01.skin');

        expect(skin.skinSections.length).toBe(3);
        expect(skin.batches.length).toBe(3);
      });
    });
  });
});
