import { IoType } from '@wowserhq/io';
import * as io from '@wowserhq/io';
import { mver } from './common.js';
import { MAP_AREA_COUNT } from '../const.js';

const areaInfo: IoType = io.struct({
  flags: io.uint32le,
  padding: io.uint32le,
});

const mphd: IoType = io.struct({
  flags: io.uint32le,
  unknown: io.uint32le,
  padding: io.array(io.uint32le, { size: 6 }),
});

const main: IoType = io.array(areaInfo, { size: MAP_AREA_COUNT });

const mwmo: IoType = io.string({ terminate: true });

const modf: IoType = io.struct({
  nameId: io.uint32le,
  uniqueId: io.uint32le,
  position: io.array(io.float32le, { size: 3 }),
  rotation: io.array(io.float32le, { size: 3 }),
  extents: io.array(io.float32le, { size: 6 }),
  flags: io.uint16le,
  doodadSet: io.uint16le,
  nameSet: io.uint16le,
  padding: io.uint16le,
});

const wdtChunks = {
  MAIN: main,
  MODF: modf,
  MPHD: mphd,
  MVER: mver,
  MWMO: mwmo,
};

const wdtChunk: IoType = io.tlv(
  io.string({ size: 4, reverse: true, terminate: false }),
  io.uint32,
  wdtChunks,
);

const wdt: IoType = io.array(wdtChunk);

export { areaInfo, main, modf, mphd, mwmo, wdt, wdtChunk };
