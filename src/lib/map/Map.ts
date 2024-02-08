import { IoMode, IoSource, openStream } from '@wowserhq/io';
import { quat } from 'gl-matrix';
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

  /**
   * Convert the given position vector in the doodad or map obj def coordinate system into a vector
   * in the map coordinate system.
   *
   * @param defPosition - Vector in doodad / map obj def coordinate system
   */
  static getNormalizedDefPosition(defPosition: number[]) {
    const normalized = new Array(3);

    normalized[0] = MAP_CORNER_X - defPosition[2];
    normalized[1] = MAP_CORNER_Y - defPosition[0];
    normalized[2] = defPosition[1];

    return normalized;
  }

  /**
   * Convert the given Euler angle in the doodad or map obj def coordinate system into a quaternion
   * in the map coordinate system.
   *
   * @param defRotation - Euler angle in doodad / map obj def coordinate system
   */
  static getNormalizedDefRotation(defRotation: number[]) {
    const normalized = quat.create();

    // glMatrix defaults to the correct euler order (zyx) to convert to the map coordinate system
    quat.fromEuler(normalized, defRotation[2], defRotation[0], defRotation[1] + 180);

    return Array.from(normalized);
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
