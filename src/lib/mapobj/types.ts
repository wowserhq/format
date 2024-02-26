import { MAP_OBJ_FRAGMENT_SHADER, MAP_OBJ_VERTEX_SHADER } from './const.js';

type MapObjBatch = {
  flags: number;
  boundingBox: number[];
  indexStart: number;
  indexCount: number;
  firstVertex: number;
  lastVertex: number;
  materialIndex: number;
};

type MapObjColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

type MapObjGroupInfo = {
  flags: number;
  boundingBox: number[];
  name: string;
};

type MapObjMaterial = {
  flags: number;
  fragmentShader: MAP_OBJ_FRAGMENT_SHADER;
  vertexShader: MAP_OBJ_VERTEX_SHADER;
  textures: string[];
  sidnColor: MapObjColor;
  diffuseColor: MapObjColor;
};

export { MapObjBatch, MapObjColor, MapObjGroupInfo, MapObjMaterial };
