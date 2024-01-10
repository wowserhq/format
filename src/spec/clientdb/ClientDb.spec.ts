import { describe, expect, test } from 'vitest';
import ClientDb from '../../lib/clientdb/ClientDb.js';
import LightRecord from '../../lib/clientdb/record/LightRecord.js';

describe('ClientDb', () => {
  describe('load', () => {
    test('should load blp from valid file', () => {
      const dbc = new ClientDb(LightRecord).load('./fixture/clientdb/Light.dbc');
      const record = dbc.getRecordByIndex(1);

      expect(record.id).toBe(2);
      expect(record.lightParamsId).toEqual([14, 15, 494, 15, 4, 0, 0, 0]);
    });
  });
});
