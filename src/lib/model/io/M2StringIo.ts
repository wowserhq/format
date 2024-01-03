import * as io from '@wowserhq/io';
import { IoContext, IoMode, IoSource, IoType, openStream } from '@wowserhq/io';

class M2String implements IoType {
  getSize(value) {
    return 0;
  }

  read(source: IoSource, context: IoContext = {}) {
    const stream = openStream(source, IoMode.Read);

    const size = stream.readUint32Le();
    const offset = stream.readUint32Le();

    const savedOffset = stream.offset;
    stream.offset = offset;

    const value = io.string({ size }).read(stream, context);

    stream.offset = savedOffset;

    return value;
  }
}

export default M2String;
