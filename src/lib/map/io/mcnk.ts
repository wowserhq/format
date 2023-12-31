import * as io from '@wowserhq/io';
import { IoType } from '@wowserhq/io';
import { MAP_CHUNK_VERTEX_COUNT } from '../const.js';

const header: IoType = io.struct({
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

const layer = io.struct({
  textureId: io.uint32le,
  properties: io.uint32le,
  alphaOffset: io.uint32le,
  effectId: io.uint32le,
});

const chunkTag: IoType = io.string({ size: 4, reverse: true, terminate: false });

const mcvt = io.typedArray(io.float32le, { size: MAP_CHUNK_VERTEX_COUNT });

const mcly = io.array(layer);

const mcnr = io.typedArray(io.int8, { size: 3 * MAP_CHUNK_VERTEX_COUNT });

const chunks: Record<string, IoType> = {
  MCVT: mcvt,
  MCLY: mcly,
  MCNR: mcnr,
};

const padding = {
  MCNR: 13,
};

export { header, chunkTag, chunks, padding };
