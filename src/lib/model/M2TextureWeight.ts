class M2TextureWeight {
  #weightTrack: any;

  constructor(weightTrack: any) {
    this.#weightTrack = weightTrack;
  }

  get weightTrack() {
    return this.#weightTrack;
  }
}

export default M2TextureWeight;
