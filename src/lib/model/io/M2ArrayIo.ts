import * as io from '@wowserhq/io';
import { IoContext, IoMode, IoSource, IoType, openStream } from '@wowserhq/io';

class M2ArrayIo implements IoType {
  #type: IoType;

  constructor(type: IoType) {
    this.#type = type;
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

    const values = io.array(this.#type, { size: count }).read(stream, context);

    stream.offset = savedOffset;

    return values;
  }
}

export default M2ArrayIo;
