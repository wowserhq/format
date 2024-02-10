type M2Track<T> = {
  trackType: number;
  loopIndex: number;
  sequenceTimes: Uint32Array[];
  sequenceKeys: T[];
};

type M2Bounds = {
  extent: Float32Array;
  radius: number;
};

type M2Bone = {
  boneId: number;
  flags: number;
  parentIndex: number;
  distToParent: number;
  boneNameCrc: number;
  pivot: Float32Array;
  translationTrack: M2Track<Float32Array>;
  rotationTrack: M2Track<Int16Array>;
  scaleTrack: M2Track<Float32Array>;
};

type M2Color = {
  colorTrack: M2Track<Float32Array>;
  alphaTrack: M2Track<Int16Array>;
};

type M2Sequence = {
  id: number;
  variationIndex: number;
  duration: number;
  moveSpeed: number;
  flags: number;
  frequency: number;
  blendTime: number;
  bounds: M2Bounds;
  variationNext: number;
  aliasNext: number;
};

type M2SkinSection = {
  id: number;
  vertexStart: number;
  vertexCount: number;
  indexStart: number;
  indexCount: number;
  boneCount: number;
  boneComboIndex: number;
  boneInfluences: number;
  centerBoneIndex: number;
  centerPosition: number[];
  sortCenterPosition: number[];
  sortRadius: number;
};

type M2TextureTransform = {
  translationTrack: M2Track<Float32Array>;
  rotationTrack: M2Track<Float32Array>;
  scalingTrack: M2Track<Float32Array>;
};

type M2TextureWeight = {
  weightTrack: M2Track<Int16Array>;
};

export { M2Bone, M2Color, M2Sequence, M2SkinSection, M2TextureTransform, M2TextureWeight, M2Track };
