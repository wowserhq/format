import { IoMode, IoSource, openStream } from '@wowserhq/io';
import * as adtIo from './io/adt.js';
import * as commonIo from './io/common.js';
import { indexChunks } from '../util.js';
import Map from './Map.js';
import MapChunk from './MapChunk.js';
import MapLayer from './MapLayer.js';
import MapDoodadDef from './MapDoodadDef.js';
import MapObjDef from './MapObjDef.js';
import {
  MAP_CHUNK_FLAG,
  MAP_LAYER_PROPERTY,
  MAP_LAYER_SPLAT_SIZE,
  MAP_AREA_COUNT,
  MAP_AREA_COUNT_X,
  MAP_AREA_COUNT_Y,
  MAP_AREA_WIDTH,
  MAP_AREA_HEIGHT,
} from './const.js';
import { splat4To8, splatCompressedTo8 } from './util.js';

class MapArea {
  #version = 18;
  #chunks: MapChunk[] = [];
  #layerSplatDepth: 4 | 8;
  #doodadDefs: MapDoodadDef[] = [];
  #objDefs: MapObjDef[] = [];

  constructor(layerSplatDepth: 4 | 8 = 8) {
    this.#layerSplatDepth = layerSplatDepth;
  }

  get chunks() {
    return this.#chunks;
  }

  get version() {
    return this.#version;
  }

  get doodadDefs() {
    return this.#doodadDefs;
  }

  get objDefs() {
    return this.#objDefs;
  }

  load(source: IoSource) {
    const stream = openStream(source, IoMode.Read);
    const chunks = adtIo.adt.read(stream);
    stream.close();

    const data = indexChunks(chunks);

    const versionChunk = data.get('MVER');
    if (versionChunk) {
      if (versionChunk !== 18) {
        throw new Error(`Unsupported ADT version: ${versionChunk}`);
      }

      this.#version = versionChunk;
    }

    this.#loadChunks(data.get('MCNK'), data);
    this.#loadDoodadDefs(data.get('MDDF'), data);
    this.#loadObjDefs(data.get('MODF'), data);

    return this;
  }

  #loadDoodadDefs(defs: any[], areaData: globalThis.Map<string, any>) {
    if (!defs || defs.length === 0) {
      return;
    }

    const nameOfs = areaData.get('MMID');
    const names = openStream(areaData.get('MMDX'));

    for (const def of defs) {
      names.offset = nameOfs[def.nameId];
      const name = commonIo.mapString.read(names);

      const normalizedPosition = Map.getNormalizedDefPosition(def.position);
      const normalizedRotation = Map.getNormalizedDefRotation(def.rotation);

      this.#doodadDefs.push(
        new MapDoodadDef(name, def.uniqueId, normalizedPosition, normalizedRotation, def.scale),
      );
    }
  }

  #loadObjDefs(defs: any[], areaData: globalThis.Map<string, any>) {
    if (!defs || defs.length === 0) {
      return;
    }

    const nameOfs = areaData.get('MWID');
    const names = openStream(areaData.get('MWMO'));

    for (const def of defs) {
      names.offset = nameOfs[def.nameId];
      const name = commonIo.mapString.read(names);

      const normalizedPosition = Map.getNormalizedDefPosition(def.position);
      const normalizedRotation = Map.getNormalizedDefRotation(def.rotation);

      this.#objDefs.push(new MapObjDef(name, def.uniqueId, normalizedPosition, normalizedRotation));
    }
  }

  #loadChunks(chunks: any[], areaData: globalThis.Map<string, any>) {
    for (const chunk of chunks) {
      this.#loadChunk(chunk.header, indexChunks(chunk.data), areaData);
    }
  }

  #loadChunk(
    chunkHeader: any,
    chunkData: globalThis.Map<string, any>,
    areaData: globalThis.Map<string, any>,
  ) {
    const chunk = new MapChunk(chunkHeader.position, chunkHeader.areaId, chunkHeader.holes);

    // Vertices

    chunk.vertexHeights = chunkData.get('MCVT');
    chunk.vertexNormals = chunkData.get('MCNR');

    // Layers

    const textures: string[] = areaData.get('MTEX');
    const alpha: Uint8Array = chunkData.get('MCAL');

    for (const { textureId, properties, alphaOffset, effectId } of chunkData.get('MCLY') ?? []) {
      const texture = textures[textureId];

      let splat: Uint8Array = null;
      const hasSplat = (properties & MAP_LAYER_PROPERTY.HAS_SPLAT) !== 0;

      if (hasSplat && alpha && alpha.length > 0) {
        // Normalize 4-bit and compressed splats into 8-bit depth splats

        if (this.#layerSplatDepth === 4) {
          const rawSplat = new Uint8Array(
            alpha.buffer,
            alpha.byteOffset + alphaOffset,
            MAP_LAYER_SPLAT_SIZE / 2,
          );
          const needsFix = (chunkHeader.flags & MAP_CHUNK_FLAG.FIXED_LAYER_SPLAT) === 0;
          splat = splat4To8(rawSplat, needsFix);
        } else if (properties & MAP_LAYER_PROPERTY.SPLAT_COMPRESSED) {
          const rawSplat = new Uint8Array(alpha.buffer, alpha.byteOffset + alphaOffset);
          splat = splatCompressedTo8(rawSplat);
        } else {
          splat = new Uint8Array(
            alpha.buffer,
            alpha.byteOffset + alphaOffset,
            MAP_LAYER_SPLAT_SIZE,
          );
        }
      }

      const layer = new MapLayer(texture, splat, effectId);

      chunk.layers.push(layer);
    }

    this.#chunks.push(chunk);
  }
}

export default MapArea;

export {
  MapArea,
  MAP_AREA_COUNT,
  MAP_AREA_COUNT_X,
  MAP_AREA_COUNT_Y,
  MAP_AREA_WIDTH,
  MAP_AREA_HEIGHT,
};
