import { IoMode, IoSource, openStream } from '@wowserhq/io';
import * as wdtIo from './io/wdt.js';
import {
  AREA_INFO_FLAG,
  MAP_AREA_COUNT,
  MAP_AREA_HEIGHT,
  MAP_AREA_WIDTH,
  MAP_CHUNK_WIDTH,
  MAP_CHUNK_HEIGHT,
  MAP_CORNER_X,
  MAP_CORNER_Y,
  MAP_WIDTH,
  MAP_HEIGHT,
} from './const.js';
import { indexChunks, Tlv } from '../util.js';

class Map {
  #version = 18;
  #layerSplatDepth: 4 | 8 = 8;
  #availableAreas = new Uint8Array(MAP_AREA_COUNT);

  get availableAreas() {
    return this.#availableAreas;
  }

  get layerSplatDepth() {
    return this.#layerSplatDepth;
  }

  get version() {
    return this.#version;
  }

  static getIndicesFromPosition(x: number, y: number) {
    if (x > MAP_CORNER_X || x < -MAP_CORNER_X) {
      throw new Error('x coordinate out of bounds');
    }

    if (y > MAP_CORNER_Y || y < -MAP_CORNER_Y) {
      throw new Error('y coordinate out of bounds');
    }

    const xOffset = MAP_CORNER_X - x;
    const yOffset = MAP_CORNER_Y - y;

    const areaX = (xOffset / MAP_AREA_HEIGHT) | 0;
    const areaY = (yOffset / MAP_AREA_WIDTH) | 0;
    const chunkX = (xOffset / MAP_CHUNK_HEIGHT) | 0;
    const chunkY = (yOffset / MAP_CHUNK_WIDTH) | 0;

    return {
      areaX,
      areaY,
      chunkX,
      chunkY,
    };
  }

  load(source: IoSource) {
    const stream = openStream(source, IoMode.Read);
    const chunks = wdtIo.wdt.read(stream);
    stream.close();

    const data = indexChunks(chunks);

    const versionChunk = data.get('MVER');
    if (versionChunk) {
      if (versionChunk !== 18) {
        throw new Error(`Unsupported WDT version: ${versionChunk}`);
      }

      this.#version = versionChunk;
    }

    const headerChunk = data.get('MPHD');
    if (headerChunk) {
      this.#layerSplatDepth =
        (headerChunk.flags & 0x4) !== 0 || (headerChunk.flags & 0x80) !== 0 ? 8 : 4;
    }

    const areaInfoChunk = data.get('MAIN');
    if (areaInfoChunk) {
      for (let areaId = 0; areaId < MAP_AREA_COUNT; areaId++) {
        const areaInfo = areaInfoChunk[areaId];

        if (areaInfo.flags & AREA_INFO_FLAG.AREA_AVAILABLE) {
          this.#availableAreas[areaId] = 1;
        }
      }
    }

    return this;
  }
}

export default Map;

export { Map, MAP_WIDTH, MAP_HEIGHT, MAP_CORNER_X, MAP_CORNER_Y };
