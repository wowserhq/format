import { IoMode, IoSource, openStream } from '@wowserhq/io';
import { indexChunks } from '../util.js';
import * as groupIo from './io/group.js';
import { MAP_OBJ_GROUP_FLAG } from './const.js';
import { MapObjBatch } from './types.js';

class MapObjGroup {
  #version = 17;

  #batches: MapObjBatch[] = [];

  #indices: Uint16Array;
  #normals: Float32Array;
  #textureCoords: Float32Array;
  #vertices: Float32Array;

  get batches() {
    return this.#batches;
  }

  get indices() {
    return this.#indices;
  }

  get normals() {
    return this.#normals;
  }

  get textureCoords() {
    return this.#textureCoords;
  }

  get version() {
    return this.#version;
  }

  get vertices() {
    return this.#vertices;
  }

  load(source: IoSource) {
    const stream = openStream(source, IoMode.Read);
    const group = groupIo.group.read(stream);
    stream.close();

    const data = indexChunks(group);

    const versionChunk = data.get('MVER');
    if (versionChunk) {
      if (versionChunk.version !== 17) {
        throw new Error(`Unsupported WMO version: ${versionChunk.version}`);
      }

      this.#version = versionChunk.version;
    }

    const { header: groupHeader, data: groupChunks } = data.get('MOGP');
    const groupData = indexChunks(groupChunks);

    const batchesChunk = groupData.get('MOBA');
    if (batchesChunk) {
      this.#batches = batchesChunk;
    }

    const indicesChunk = groupData.get('MOVI');
    if (indicesChunk) {
      this.#indices = indicesChunk;
    }

    const normalsChunk = groupData.get('MONR');
    if (normalsChunk) {
      this.#normals = normalsChunk;
    }

    const textureCoordsChunk = groupData.get('MOTV');
    if (textureCoordsChunk) {
      this.#textureCoords = textureCoordsChunk;
    }

    const verticesChunk = groupData.get('MOVT');
    if (verticesChunk) {
      this.#vertices = verticesChunk;
    }

    return this;
  }
}

export default MapObjGroup;
export { MapObjGroup, MapObjBatch, MAP_OBJ_GROUP_FLAG };
