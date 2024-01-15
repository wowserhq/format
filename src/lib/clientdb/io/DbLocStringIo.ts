import { IoMode, IoSource, IoType, openStream } from '@wowserhq/io';
import * as io from '@wowserhq/io';
import { RecordIoContext } from '../types.js';

const blockString: IoType = io.string({ terminate: true });

const locStringRef: IoType = io.struct({
  offsets: io.array(io.uint32le, { size: 16 }),
  flags: io.uint32le,
});

class DbLocStringIo implements IoType {
  getSize() {
    return locStringRef.getSize(undefined);
  }

  read(source: IoSource, context: RecordIoContext = {}) {
    const stream = openStream(source, IoMode.Read);

    const stringBlock = context.stringBlock;
    const locale = context.locale;

    const ref = locStringRef.read(stream);
    const offset = ref.offsets[locale];

    stringBlock.offset = offset;
    const string = blockString.read(stringBlock);

    return string;
  }
}

export default DbLocStringIo;
