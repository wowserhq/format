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

const adtChunks = {
  MHDR: mhdr,
  MVER: mver,
  MCIN: mcin,
  MTEX: mtex,
  MCNK: mcnk,
};

const adtChunk = io.tlv(
  io.string({ size: 4, reverse: true, terminate: false }),
  io.uint32le,
  adtChunks,
);

const adt: IoType = io.array(adtChunk);

export { adt };
