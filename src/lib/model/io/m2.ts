import * as io from '@wowserhq/io';
import { IoType } from '@wowserhq/io';
import { m2array, m2typedArray, m2bounds, m2range, m2string, m2track } from './common.js';

const m2sequence = io.struct({
  id: io.uint16le,
  variationIndex: io.uint16le,
  duration: io.uint32le,
  moveSpeed: io.float32le,
  flags: io.uint32le,
  frequency: io.uint16le,
  pad: io.uint16le,
  replay: m2range,
  blendTime: io.uint32le,
  bounds: m2bounds,
  variationNext: io.int16le,
  aliasNext: io.uint16le,
});

const m2compBone = io.struct({
  boneId: io.int32le,
  flags: io.uint32le,
  parentIndex: io.int16le,
  distToParent: io.uint16le,
  boneNameCrc: io.uint32le,
  translationTrack: m2track(io.float32le, 3),
  rotationTrack: m2track(io.int16le, 4),
  scaleTrack: m2track(io.float32le, 3),
  pivot: io.typedArray(io.float32le, { size: 3 }),
});

const m2vertex = io.struct({
  pos: io.array(io.float32le, { size: 3 }),
  boneWeights: io.array(io.uint8, { size: 4 }),
  boneIndices: io.array(io.uint8, { size: 4 }),
  normal: io.array(io.float32le, { size: 3 }),
  texCoords: io.array(io.float32le, { size: 4 }),
});

const m2color = io.struct({
  colorTrack: m2track(io.float32le, 3),
  alphaTrack: m2track(io.int16le),
});

const m2texture = io.struct({
  component: io.uint32le,
  flags: io.uint32le,
  filename: m2string,
});

const m2textureWeight = io.struct({
  weightTrack: m2track(io.int16le),
});

const m2textureTransform = io.struct({
  translationTrack: m2track(io.float32le, 3),
  rotationTrack: m2track(io.float32le, 4),
  scalingTrack: m2track(io.float32le, 3),
});

const m2material = io.struct({
  flags: io.uint16le,
  blendMode: io.uint16le,
});

const m2attachment = io.struct({
  attachmentId: io.uint32le,
  boneIndex: io.uint16le,
  padding: io.uint16le,
  position: io.typedArray(io.float32le, { size: 3 }),
  visibilityTrack: m2track(io.uint8),
});

const m2event = io.struct({
  eventId: io.uint32le,
  data: io.uint32le,
  boneIndex: io.uint16le,
  position: io.typedArray(io.float32le, { size: 3 }),
  /* TODO eventTrack */
  todo: io.typedArray(io.uint8, { size: 12 }),
});

const m2light = io.struct({
  lightType: io.uint16le,
  boneIndex: io.uint16le,
  position: io.typedArray(io.float32le, { size: 3 }),
  /* TODO tracks */
  todo: io.typedArray(io.uint8, { size: 140 }),
});

const m2camera = io.struct({
  cameraId: io.uint32le,
  fieldOfView: io.float32le,
  farClip: io.float32le,
  nearClip: io.float32le,
  /* TODO tracks */
  todo: io.typedArray(io.uint8, { size: 84 }),
});

const m2ribbon = io.struct({
  ribbonId: io.uint32le,
  boneIndex: io.uint16le,
  position: io.typedArray(io.float32le, { size: 3 }),
  /* TODO remainder */
  todo: io.typedArray(io.uint8, { size: 156 }),
});

const m2particle = io.struct({
  particleId: io.uint32le,
  flags: io.uint32le,
  position: io.typedArray(io.float32le, { size: 3 }),
  boneIndex: io.uint16le,
  textureIndex: io.uint16le,
  /* TODO remainder */
  todo: io.typedArray(io.uint8, { size: 452 }),
});

const m2skinSection = io.struct({
  id: io.uint16le,
  level: io.uint16le,
  vertexStart: io.uint16le,
  vertexCount: io.uint16le,
  indexStart: io.uint16le,
  indexCount: io.uint16le,
  boneCount: io.uint16le,
  boneComboIndex: io.uint16le,
  boneInfluences: io.uint16le,
  centerBoneIndex: io.uint16le,
  centerPosition: io.array(io.float32le, { size: 3 }),
  sortCenterPosition: io.array(io.float32le, { size: 3 }),
  sortRadius: io.float32le,
});

const m2batch = io.struct({
  flags: io.uint8,
  priorityPlane: io.int8,
  shaderId: io.uint16le,
  skinSectionIndex: io.uint16le,
  geosetIndex: io.uint16le,
  colorIndex: io.uint16le,
  materialIndex: io.uint16le,
  materialLayer: io.uint16le,
  textureCount: io.uint16le,
  textureComboIndex: io.uint16le,
  textureCoordComboIndex: io.uint16le,
  textureWeightComboIndex: io.uint16le,
  textureTransformComboIndex: io.uint16le,
});

const m2: IoType = io.struct({
  magic: io.string({ size: 4 }),
  version: io.uint32le,
  name: m2string,
  flags: io.uint32le,
  loops: m2typedArray(io.uint32le),
  sequences: m2array(m2sequence),
  sequenceIdxHashById: m2typedArray(io.int16le),
  bones: m2array(m2compBone),
  boneIndicesById: m2typedArray(io.uint16le),
  vertices: m2typedArray(io.uint8, 48),
  skinProfileCount: io.uint32le,
  colors: m2array(m2color),
  textures: m2array(m2texture),
  textureWeights: m2array(m2textureWeight),
  textureTransforms: m2array(m2textureTransform),
  textureIndicesById: m2typedArray(io.uint16le),
  materials: m2array(m2material),
  boneCombos: m2typedArray(io.uint16le),
  textureCombos: m2typedArray(io.uint16le),
  textureCoordCombos: m2typedArray(io.uint16le),
  textureWeightCombos: m2typedArray(io.uint16le),
  textureTransformCombos: m2typedArray(io.uint16le),
  bounds: m2bounds,
  collisionBounds: m2bounds,
  collisionIndices: m2typedArray(io.uint16le),
  collisionPositions: m2typedArray(io.float32le, 3),
  collisionFaceNormals: m2typedArray(io.float32le, 3),
  attachments: m2array(m2attachment),
  attachmentIndicesById: m2typedArray(io.uint16le),
  events: m2array(m2event),
  lights: m2array(m2light),
  cameras: m2array(m2camera),
  cameraIndicesById: m2typedArray(io.uint16le),
  ribbons: m2array(m2ribbon),
  particles: m2array(m2particle),
});

const m2skin: IoType = io.struct({
  magic: io.string({ size: 4 }),
  vertices: m2typedArray(io.uint16le),
  indices: m2typedArray(io.uint16le),
  bones: m2typedArray(io.uint8, 4),
  skinSections: m2array(m2skinSection),
  batches: m2array(m2batch),
  maxBoneCount: io.uint32le,
});

export { m2, m2skin };
