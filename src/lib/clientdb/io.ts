import * as io from '@wowserhq/io';
import { IoType } from '@wowserhq/io';

const header: IoType = io.struct({
  magic: io.string({ size: 4, terminate: false }),
  recordCount: io.uint32le,
  fieldCount: io.uint32le,
  recordSize: io.uint32le,
  stringBlockSize: io.uint32le,
});

const string: IoType = io.string({ terminate: true });

export { header, string };
