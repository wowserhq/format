class M2TextureTransform {
  #translationTrack: any;
  #rotationTrack: any;
  #scalingTrack: any;

  constructor(translationTrack: any, rotationTrack: any, scalingTrack: any) {
    this.#translationTrack = translationTrack;
    this.#rotationTrack = rotationTrack;
    this.#scalingTrack = scalingTrack;
  }

  get translationTrack() {
    return this.#translationTrack;
  }

  get rotationTrack() {
    return this.#rotationTrack;
  }

  get scalingTrack() {
    return this.#scalingTrack;
  }
}

export default M2TextureTransform;
