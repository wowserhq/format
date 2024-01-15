import { IoType } from '@wowserhq/io';
import * as io from '@wowserhq/io';
import DbLocStringIo from './io/DbLocStringIo.js';
import DbStringIo from './io/DbStringIo.js';

const header: IoType = io.struct({
  magic: io.string({ size: 4, terminate: false }),
  recordCount: io.uint32le,
  fieldCount: io.uint32le,
  recordSize: io.uint32le,
  stringBlockSize: io.uint32le,
});

const locString = new DbLocStringIo();

const string = new DbStringIo();

export { header, locString, string };
