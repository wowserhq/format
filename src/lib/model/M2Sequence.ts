class M2Sequence {
  #id: number;
  #variationIndex: number;
  #duration: number;
  #moveSpeed: number;
  #flags: number;
  #frequency: number;
  #blendTime: number;
  #variationNext: number;
  #aliasNext: number;

  constructor(
    id: number,
    variationIndex: number,
    duration: number,
    moveSpeed: number,
    flags: number,
    frequency: number,
    blendTime: number,
    variationNext: number,
    aliasNext: number,
  ) {
    this.#id = id;
    this.#variationIndex = variationIndex;
    this.#duration = duration;
    this.#moveSpeed = moveSpeed;
    this.#flags = flags;
    this.#frequency = frequency;
    this.#blendTime = blendTime;
    this.#variationNext = variationNext;
    this.#aliasNext = aliasNext;
  }

  get aliasNext() {
    return this.#aliasNext;
  }

  get blendTime() {
    return this.#blendTime;
  }

  get duration() {
    return this.#duration;
  }

  get flags() {
    return this.#flags;
  }

  get frequency() {
    return this.#frequency;
  }

  get id() {
    return this.#id;
  }

  get moveSpeed() {
    return this.#moveSpeed;
  }

  get variationIndex() {
    return this.#variationIndex;
  }

  get variationNext() {
    return this.#variationNext;
  }
}

export default M2Sequence;
