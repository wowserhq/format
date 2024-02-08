import MapLayer from './MapLayer.js';
import {
  MAP_CHUNK_COUNT,
  MAP_CHUNK_COUNT_X,
  MAP_CHUNK_COUNT_Y,
  MAP_CHUNK_WIDTH,
  MAP_CHUNK_HEIGHT,
  MAP_CHUNK_FACE_COUNT_X,
  MAP_CHUNK_FACE_COUNT_Y,
  MAP_CHUNK_VERTEX_STEP_X,
  MAP_CHUNK_VERTEX_STEP_Y,
  MAP_CHUNK_VERTEX_COUNT,
} from './const.js';

class MapChunk {
  #areaId: number;
  #holes: number = 0;
  #layers: MapLayer[] = [];
  #position: number[];
  #vertexHeights: Float32Array;
  #vertexNormals: Int8Array;

  constructor(position: number[], areaId: number, holes: number = 0) {
    this.#position = position;
    this.#areaId = areaId;
    this.#holes = holes;
  }

  get areaId() {
    return this.#areaId;
  }

  get layers() {
    return this.#layers;
  }

  get position() {
    return this.#position;
  }

  get vertexHeights() {
    return this.#vertexHeights;
  }

  set vertexHeights(vertexHeights: Float32Array) {
    this.#vertexHeights = vertexHeights;
  }

  get vertexNormals() {
    return this.#vertexNormals;
  }

  set vertexNormals(vertexNormals: Int8Array) {
    this.#vertexNormals = vertexNormals;
  }

  get holes() {
    return this.#holes;
  }

  set holes(holes: number) {
    this.#holes = holes;
  }
}

export default MapChunk;

export {
  MapChunk,
  MAP_CHUNK_COUNT,
  MAP_CHUNK_COUNT_X,
  MAP_CHUNK_COUNT_Y,
  MAP_CHUNK_WIDTH,
  MAP_CHUNK_HEIGHT,
  MAP_CHUNK_FACE_COUNT_X,
  MAP_CHUNK_FACE_COUNT_Y,
  MAP_CHUNK_VERTEX_STEP_X,
  MAP_CHUNK_VERTEX_STEP_Y,
  MAP_CHUNK_VERTEX_COUNT,
};
