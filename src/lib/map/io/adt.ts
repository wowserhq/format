import * as io from '@wowserhq/io';
import { IoType } from '@wowserhq/io';
import { mver } from './common.js';
import McnkIo from './McnkIo.js';

const mapChunkInfo = io.struct({
  offset: io.uint32le,
  size: io.uint32le,
  flags: io.uint32le,
  padding: io.uint32le,
});

const mapDoodadDef = io.struct({
  nameId: io.uint32le,
  uniqueId: io.uint32le,
  position: io.array(io.float32le, { size: 3 }),
  rotation: io.array(io.float32le, { size: 3 }),
  scale: io.uint16le,
  flags: io.uint16le,
});

const mapObjDef = io.struct({
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

const mcnk = new McnkIo();

const mhdr = io.struct({
  flags: io.uint32le,
  mcinOffset: io.uint32le,
  mtexOffset: io.uint32le,
  mmdxOffset: io.uint32le,
  mmidOffset: io.uint32le,
  mwmoOffset: io.uint32le,
  mwidOffset: io.uint32le,
  mddfOffset: io.uint32le,
  modfOffset: io.uint32le,
  mfboOffset: io.uint32le,
  mh2oOffset: io.uint32le,
  mtxfOffset: io.uint32le,
  padding: io.array(io.uint32le, { size: 4 }),
});

const mcin = io.array(mapChunkInfo);

const mtex = io.array(io.string({ terminate: true }));

const mmid = io.typedArray(io.uint32le);

const mddf = io.array(mapDoodadDef);

const mwid = io.typedArray(io.uint32le);

const modf = io.array(mapObjDef);

const adtChunks = {
  MHDR: mhdr,
  MVER: mver,
  MCIN: mcin,
  MTEX: mtex,
  MCNK: mcnk,
  MMID: mmid,
  MDDF: mddf,
  MWID: mwid,
  MODF: modf,
};

const adtChunk = io.tlv(
  io.string({ size: 4, reverse: true, terminate: false }),
  io.uint32le,
  adtChunks,
);

const adt: IoType = io.array(adtChunk);

export { adt };
