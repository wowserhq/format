import { IoMode, IoSource, IoType, openStream } from '@wowserhq/io';
import * as io from '@wowserhq/io';
import { RecordIoContext } from '../types.js';

const blockString: IoType = io.string({ terminate: true });

const stringRef: IoType = io.uint32le;

class DbStringIo implements IoType {
  getSize() {
    return stringRef.getSize(undefined);
  }

  read(source: IoSource, context: RecordIoContext = {}) {
    const stream = openStream(source, IoMode.Read);

    const stringBlock = context.stringBlock;

    const offset = stringRef.read(stream);

    stringBlock.offset = offset;
    const string = blockString.read(stringBlock);

    return string;
  }
}

export default DbStringIo;
