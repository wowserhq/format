import * as io from '@wowserhq/io';
import ClientDbRecord from '../ClientDbRecord.js';
import * as dbIo from '../io.js';

const recordIo = io.struct({
  id: io.int32le,
  continentId: io.int32le,
  parentAreaId: io.int32le,
  areaBit: io.int32le,
  flags: io.int32le,
  soundProviderPref: io.int32le,
  soundProviderPrefUnderwater: io.int32le,
  ambienceId: io.int32le,
  zoneMusic: io.int32le,
  introSound: io.int32le,
  explorationLevel: io.int32le,
  areaName: dbIo.locString,
  factionGroupMask: io.int32le,
  liquidTypeId: io.array(io.int32le, { size: 4 }),
  minElevation: io.float32le,
  ambientMultiplier: io.float32le,
  lightId: io.int32le,
});

class AreaTableRecord extends ClientDbRecord {
  continentId: number;
  parentAreaId: number;
  areaBit: number;
  flags: number;
  soundProviderPref: number;
  soundProviderPrefUnderwater: number;
  ambienceId: number;
  zoneMusic: number;
  introSound: number;
  explorationLevel: number;
  areaName: string;
  factionGroupMask: number;
  liquidTypeId: number[];
  minElevation: number;
  ambientMultiplier: number;
  lightId: number;

  constructor() {
    super(recordIo);
  }
}

export default AreaTableRecord;
export { AreaTableRecord };
