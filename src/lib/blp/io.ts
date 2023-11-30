import * as io from '@wowserhq/io';
import { MAX_MIPS } from './const.js';

const header = io.struct(
  {
    magic: io.string({ size: 4, terminate: false }),
    formatVersion: io.uint32le,
    colorFormat: io.uint8,
    alphaSize: io.uint8,
    preferredFormat: io.uint8,
    hasMips: io.uint8,
    width: io.uint32le,
    height: io.uint32le,
    mipOffsets: io.array(io.uint32le, { size: MAX_MIPS }),
    mipSizes: io.array(io.uint32le, { size: MAX_MIPS }),
    extended: io.array(io.uint8, { size: 1024 }),
  },
  {},
);

export { header };
