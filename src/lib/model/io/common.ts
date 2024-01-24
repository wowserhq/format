import { IoType } from '@wowserhq/io';
import M2ArrayIo from './M2ArrayIo.js';
import M2TypedArrayIo from './M2TypedArrayIo.js';
import M2StringIo from './M2StringIo.js';
import * as io from '@wowserhq/io';

const m2array = (type: IoType): IoType => new M2ArrayIo(type);

const m2typedArray = (type: IoType, elements = 1): IoType => new M2TypedArrayIo(type, elements);

const m2string: IoType = new M2StringIo();

const m2range: IoType = io.struct({
  minimum: io.uint32le,
  maximum: io.uint32le,
});

const m2bounds: IoType = io.struct({
  extent: io.typedArray(io.float32le, { size: 6 }),
  radius: io.float32le,
});

const m2track = (type: IoType, elements = 1): IoType =>
  io.struct({
    trackType: io.uint16le,
    loopIndex: io.uint16le,
    sequenceTimes: m2array(m2typedArray(io.uint32le)),
    sequenceKeys: m2array(m2typedArray(type, elements)),
  });

export { m2array, m2typedArray, m2string, m2range, m2bounds, m2track };
