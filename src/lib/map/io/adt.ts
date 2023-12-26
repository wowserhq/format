import * as io from '@wowserhq/io';
import { mver } from './common.js';
import { MAP_CHUNK_VERTEX_COUNT } from '../const.js';
import { IoType } from '@wowserhq/io';

const mapChunkInfo = io.struct({
  offset: io.uint32le,
  size: io.uint32le,
  flags: io.uint32le,
  padding: io.uint32le,
});

const mapChunkHeader = io.struct({
  flags: io.uint32le,
  indexX: io.uint32le,
  indexY: io.uint32le,
  layerCount: io.uint32le,
  doodadRefCount: io.uint32le,
  mcvtOffset: io.uint32le,
  mcnrOffset: io.uint32le,
  mclyOffset: io.uint32le,
  mcrfOffset: io.uint32le,
  mcalOffset: io.uint32le,
  mcalSize: io.uint32le,
  mcshOffset: io.uint32le,
  mcshSize: io.uint32le,
  areaId: io.uint32le,
  mapObjRefCount: io.uint32le,
  holes: io.uint16le,
  padding: io.uint16le,
  predTex: io.array(io.uint16le, { size: 8 }),
  noEffectDoodad: io.array(io.uint8, { size: 8 }),
  mcseOffset: io.uint32le,
  soundEmitterCount: io.uint32le,
  mclqOffset: io.uint32le,
  mclqSize: io.uint32le,
  position: io.array(io.float32le, { size: 3 }),
  mccvOffset: io.uint32le,
  padding2: io.array(io.uint32le, { size: 2 }),
});

const mapLayer = io.struct({
  textureId: io.uint32le,
  properties: io.uint32le,
  alphaOffset: io.uint32le,
  effectId: io.uint32le,
});

const mcvt = io.typedArray(io.float32le, { size: MAP_CHUNK_VERTEX_COUNT });

const mcly = io.array(mapLayer);

const mcnr = io.typedArray(io.int8, { size: 3 * MAP_CHUNK_VERTEX_COUNT });

const mcnkChunks = {
  MCVT: mcvt,
  MCLY: mcly,
  MCNR: mcnr,
};

const mcnkPadding = {
  MCNR: 13,
};

const mcnkChunk = io.tlv(
  io.string({ size: 4, reverse: true, terminate: false }),
  io.uint32le,
  mcnkChunks,
  { padding: mcnkPadding },
);

const mcnk = io.struct({
  header: mapChunkHeader,
  data: io.array(mcnkChunk),
});

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
