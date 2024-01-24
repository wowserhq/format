type M2Track<T> = {
  trackType: number;
  loopIndex: number;
  sequenceTimes: Uint32Array[];
  sequenceKeys: T[];
};

type M2TextureTransform = {
  translationTrack: M2Track<Float32Array>;
  rotationTrack: M2Track<Float32Array>;
  scalingTrack: M2Track<Float32Array>;
};

type M2TextureWeight = {
  weightTrack: M2Track<Int16Array>;
};

export { M2Track, M2TextureTransform, M2TextureWeight };
