import * as io from '@wowserhq/io';
import ClientDbRecord from '../ClientDbRecord.js';
import * as dbIo from '../io.js';

const recordIo = io.struct({
  id: io.int32le,
  soundType: io.int32le,
  name: dbIo.string,
  file: io.array(dbIo.string, { size: 10 }),
  freq: io.array(io.int32le, { size: 10 }),
  directoryBase: dbIo.string,
  volumeFloat: io.float32le,
  flags: io.int32le,
  minDistance: io.float32le,
  distanceCutoff: io.float32le,
  eaxdef: io.int32le,
  soundEntriesAdvancedId: io.int32le,
});

class SoundEntriesRecord extends ClientDbRecord {
  soundType: number;
  name: string;
  file: string[];
  freq: number[];
  directoryBase: string;
  volumeFloat: number;
  flags: number;
  minDistance: number;
  distanceCutoff: number;
  eaxdef: number;
  soundEntriesAdvancedId: number;

  constructor() {
    super(recordIo);
  }
}

export default SoundEntriesRecord;
export { SoundEntriesRecord };
