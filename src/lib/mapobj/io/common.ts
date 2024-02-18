import * as io from '@wowserhq/io';
import { IoType } from '@wowserhq/io';

const imvec = io.struct({
  r: io.uint8,
  g: io.uint8,
  b: io.uint8,
  a: io.uint8,
});

const mapObjString: IoType = io.string();

const mver = io.struct({
  version: io.uint32le,
});

export { imvec, mapObjString, mver };
