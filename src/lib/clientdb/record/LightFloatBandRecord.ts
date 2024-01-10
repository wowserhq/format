import * as io from '@wowserhq/io';
import ClientDbRecord from '../ClientDbRecord.js';

const recordIo = io.struct({
  id: io.int32le,
  num: io.int32le,
  time: io.array(io.int32le, { size: 16 }),
  data: io.array(io.float32le, { size: 16 }),
});

class LightFloatBandRecord extends ClientDbRecord {
  num: number;
  time: number[];
  data: number[];

  constructor() {
    super(recordIo);
  }
}

export default LightFloatBandRecord;
export { LightFloatBandRecord };
