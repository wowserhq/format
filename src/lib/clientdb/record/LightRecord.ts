import * as io from '@wowserhq/io';
import ClientDbRecord from '../ClientDbRecord.js';

const recordIo = io.struct({
  id: io.int32le,
  continentId: io.int32le,
  gameCoords: io.array(io.float32le, { size: 3 }),
  gameFalloffStart: io.float32le,
  gameFalloffEnd: io.float32le,
  lightParamsId: io.array(io.int32le, { size: 8 }),
});

class LightRecord extends ClientDbRecord {
  continentId: number;
  gameCoords: number[];
  gameFalloffStart: number;
  gameFalloffEnd: number;
  lightParamsId: number[];

  constructor() {
    super(recordIo);
  }
}

export default LightRecord;
export { LightRecord };
