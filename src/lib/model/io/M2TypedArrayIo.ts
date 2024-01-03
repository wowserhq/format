import * as io from '@wowserhq/io';
import { IoContext, IoMode, IoSource, IoType, openStream } from '@wowserhq/io';

class M2TypedArrayIo implements IoType {
  #type: IoType;
  #elements: number;

  constructor(type: IoType, elements = 1) {
    this.#type = type;
    this.#elements = elements;
  }

  getSize(value) {
    return 0;
  }

  read(source: IoSource, context: IoContext = {}) {
    const stream = openStream(source, IoMode.Read);

    const count = stream.readUint32();
    const offset = stream.readUint32();

    const savedOffset = stream.offset;
    stream.offset = offset;

    const values = io.typedArray(this.#type, { size: count * this.#elements }).read(stream);

    stream.offset = savedOffset;

    return values;
  }
}

export default M2TypedArrayIo;
