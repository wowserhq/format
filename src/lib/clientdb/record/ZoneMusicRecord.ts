import * as io from '@wowserhq/io';
import ClientDbRecord from '../ClientDbRecord.js';
import * as dbIo from '../io.js';

const recordIo = io.struct({
  id: io.int32le,
  setName: dbIo.string,
  silenceIntervalMin: io.array(io.int32le, { size: 2 }),
  silenceIntervalMax: io.array(io.int32le, { size: 2 }),
  sounds: io.array(io.int32le, { size: 2 }),
});

class ZoneMusicRecord extends ClientDbRecord {
  setName: string;
  silenceIntervalMin: number;
  silenceIntervalMax: number;
  sounds: number[];

  constructor() {
    super(recordIo);
  }
}

export default ZoneMusicRecord;
export { ZoneMusicRecord };
