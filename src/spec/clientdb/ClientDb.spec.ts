import { describe, expect, test } from 'vitest';
import ClientDb from '../../lib/clientdb/ClientDb.js';
import LightRecord from '../../lib/clientdb/record/LightRecord.js';
import AreaTableRecord from '../../lib/clientdb/record/AreaTableRecord.js';
import ZoneMusicRecord from '../../lib/clientdb/record/ZoneMusicRecord.js';

describe('ClientDb', () => {
  describe('load', () => {
    test('should load dbc from valid file', () => {
      const dbc = new ClientDb(LightRecord).load('./fixture/clientdb/Light.dbc');
      const record = dbc.getRecordByIndex(1);

      expect(record.id).toBe(2);
      expect(record.lightParamsId).toEqual([14, 15, 494, 15, 4, 0, 0, 0]);
    });

    test('should load dbc with non-localized strings from valid file', () => {
      const dbc = new ClientDb(ZoneMusicRecord).load('./fixture/clientdb/ZoneMusic.dbc');
      const record = dbc.getRecordByIndex(1);

      expect(record.id).toBe(2);
      expect(record.setName).toBe('Zone-EvilForest');
      expect(record.sounds).toEqual([2524, 2534]);
    });

    test('should load dbc with localized strings from valid file', () => {
      const dbc = new ClientDb(AreaTableRecord).load('./fixture/clientdb/AreaTable.dbc');
      const record = dbc.getRecordByIndex(1);

      expect(record.id).toBe(2);
      expect(record.areaName).toBe('Longshore');
      expect(record.minElevation).toBe(-500);
    });
  });
});
