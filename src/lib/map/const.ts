const MAP_WIDTH = 34133.332;
const MAP_HEIGHT = 34133.332;
const MAP_ORIGIN_X = 0;
const MAP_ORIGIN_Y = 0;
const MAP_CORNER_X = (MAP_HEIGHT - MAP_ORIGIN_X) / 2.0;
const MAP_CORNER_Y = (MAP_WIDTH - MAP_ORIGIN_Y) / 2.0;

const MAP_AREA_COUNT_X = 64;
const MAP_AREA_COUNT_Y = 64;
const MAP_AREA_COUNT = MAP_AREA_COUNT_X * MAP_AREA_COUNT_Y;

const MAP_AREA_WIDTH = MAP_WIDTH / MAP_AREA_COUNT_Y;
const MAP_AREA_HEIGHT = MAP_HEIGHT / MAP_AREA_COUNT_X;

const MAP_CHUNK_COUNT_X = 16;
const MAP_CHUNK_COUNT_Y = 16;
const MAP_CHUNK_COUNT = MAP_CHUNK_COUNT_X * MAP_CHUNK_COUNT_Y;
const MAP_CHUNK_WIDTH = MAP_WIDTH / (MAP_CHUNK_COUNT_Y * MAP_AREA_COUNT_Y);
const MAP_CHUNK_HEIGHT = MAP_HEIGHT / (MAP_CHUNK_COUNT_X * MAP_AREA_COUNT_X);
const MAP_CHUNK_FACE_COUNT_X = 8;
const MAP_CHUNK_FACE_COUNT_Y = 8;
const MAP_CHUNK_VERTEX_STEP_X = MAP_CHUNK_HEIGHT / MAP_CHUNK_FACE_COUNT_X;
const MAP_CHUNK_VERTEX_STEP_Y = MAP_CHUNK_WIDTH / MAP_CHUNK_FACE_COUNT_Y;
const MAP_CHUNK_VERTEX_COUNT =
  MAP_CHUNK_FACE_COUNT_X * MAP_CHUNK_FACE_COUNT_Y +
  (MAP_CHUNK_FACE_COUNT_X + 1) * (MAP_CHUNK_FACE_COUNT_Y + 1);

const MAP_LAYER_SPLAT_X = 64;
const MAP_LAYER_SPLAT_Y = 64;
const MAP_LAYER_SPLAT_SIZE = MAP_LAYER_SPLAT_X * MAP_LAYER_SPLAT_Y;

enum AREA_INFO_FLAG {
  AREA_AVAILABLE = 0x1,
}

enum MAP_CHUNK_FLAG {
  FIXED_LAYER_SPLAT = 0x200,
}

enum MAP_LAYER_PROPERTY {
  SPLAT_COMPRESSED = 0x200,
}

export {
  AREA_INFO_FLAG,
  MAP_CHUNK_FLAG,
  MAP_LAYER_PROPERTY,
  MAP_WIDTH,
  MAP_HEIGHT,
  MAP_CORNER_X,
  MAP_CORNER_Y,
  MAP_AREA_COUNT,
  MAP_AREA_COUNT_X,
  MAP_AREA_COUNT_Y,
  MAP_AREA_WIDTH,
  MAP_AREA_HEIGHT,
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
  MAP_LAYER_SPLAT_X,
  MAP_LAYER_SPLAT_Y,
  MAP_LAYER_SPLAT_SIZE,
};