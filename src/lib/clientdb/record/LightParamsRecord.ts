import * as io from '@wowserhq/io';
import ClientDbRecord from '../ClientDbRecord.js';

const recordIo = io.struct({
  id: io.int32le,
  highlightSky: io.int32le,
  lightSkyboxId: io.int32le,
  glow: io.float32le,
  waterShallowAlpha: io.float32le,
  waterDeepAlpha: io.float32le,
  oceanShallowAlpha: io.float32le,
  oceanDeepAlpha: io.float32le,
  flags: io.int32le,
});

class LightParamsRecord extends ClientDbRecord {
  highlightSky: number;
  lightSkyboxId: number;
  glow: number;
  waterShallowAlpha: number;
  waterDeepAlpha: number;
  oceanShallowAlpha: number;
  oceanDeepAlpha: number;
  flags: number;

  constructor() {
    super(recordIo);
  }
}

export default LightParamsRecord;
export { LightParamsRecord };
