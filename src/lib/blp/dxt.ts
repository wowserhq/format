/*
 * DXT/BC helper functions
 *
 * Based in part on dxtn
 * https://github.com/LordVonAdel/dxtn
 * Copyright (c) 2021 Adrian Urban
 * Licensed under the MIT license
 *
 * Also based in part on squish
 * Copyright (c) 2006 Simon Brown
 * Licensed under the MIT license
 */

const DXT_BLOCK_WIDTH = 4;
const DXT_BLOCK_HEIGHT = 4;

const DXT1_BLOCK_SIZE = 8;
const DXT3_BLOCK_SIZE = 16;
const DXT5_BLOCK_SIZE = 16;
const RGBA_BLOCK_SIZE = 64;

const COLOR_LOOKUP = new ArrayBuffer(16);
const COLOR_LOOKUP_8 = new Uint8Array(COLOR_LOOKUP);
const COLOR_LOOKUP_32 = new Uint32Array(COLOR_LOOKUP);
const COLOR_INDICES = new ArrayBuffer(16);
const COLOR_INDICES_8 = new Uint8Array(COLOR_INDICES);
const ALPHA_LOOKUP = new Uint8Array(8);
const DECOMPRESSED = new ArrayBuffer(RGBA_BLOCK_SIZE);
const DECOMPRESSED_8 = new Uint8Array(DECOMPRESSED);
const DECOMPRESSED_32 = new Uint32Array(DECOMPRESSED);

const unpack565 = (color: number) => {
  const red = (color >> 11) & 0x1f;
  const green = (color >> 5) & 0x3f;
  const blue = color & 0x1f;

  return [(red << 3) | (red >> 2), (green << 2) | (green >> 4), (blue << 3) | (blue >> 2)];
};

// prettier-ignore
const dxt1GenerateColorLookup = (blockData: Uint8Array, blockOfs: number) => {
  const color0 = (blockData[blockOfs + 1] << 8) + blockData[blockOfs + 0];
  const color1 = (blockData[blockOfs + 3] << 8) + blockData[blockOfs + 2];

  const [r0, g0, b0] = unpack565(color0);
  const [r1, g1, b1] = unpack565(color1);

  COLOR_LOOKUP_8[0] = r0;
  COLOR_LOOKUP_8[1] = g0;
  COLOR_LOOKUP_8[2] = b0;
  COLOR_LOOKUP_8[3] = 255;

  COLOR_LOOKUP_8[4] = r1;
  COLOR_LOOKUP_8[5] = g1;
  COLOR_LOOKUP_8[6] = b1;
  COLOR_LOOKUP_8[7] = 255;

  if (color0 > color1) {
    COLOR_LOOKUP_8[ 8] = ((2 * r0 + r1) / 3) | 0;
    COLOR_LOOKUP_8[ 9] = ((2 * g0 + g1) / 3) | 0;
    COLOR_LOOKUP_8[10] = ((2 * b0 + b1) / 3) | 0;
    COLOR_LOOKUP_8[11] = 255;

    COLOR_LOOKUP_8[12] = ((r0 + 2 * r1) / 3) | 0;
    COLOR_LOOKUP_8[13] = ((g0 + 2 * g1) / 3) | 0;
    COLOR_LOOKUP_8[14] = ((b0 + 2 * b1) / 3) | 0;
    COLOR_LOOKUP_8[15] = 255;
  } else {
    COLOR_LOOKUP_8[ 8] = ((r0 + r1) / 2) | 0;
    COLOR_LOOKUP_8[ 9] = ((g0 + g1) / 2) | 0;
    COLOR_LOOKUP_8[10] = ((b0 + b1) / 2) | 0;
    COLOR_LOOKUP_8[11] = 255;

    COLOR_LOOKUP_8[12] = 0;
    COLOR_LOOKUP_8[13] = 0;
    COLOR_LOOKUP_8[14] = 0;
    COLOR_LOOKUP_8[15] = 0;
  }
};

// prettier-ignore
const dxt1GenerateColorIndices = (blockData: Uint8Array, blockOfs: number) => {
  const packed4 = blockData[blockOfs + 4];
  COLOR_INDICES_8[ 0] =  packed4       & 0x3;
  COLOR_INDICES_8[ 1] = (packed4 >> 2) & 0x3;
  COLOR_INDICES_8[ 2] = (packed4 >> 4) & 0x3;
  COLOR_INDICES_8[ 3] = (packed4 >> 6) & 0x3;

  const packed5 = blockData[blockOfs + 5];
  COLOR_INDICES_8[ 4] =  packed5       & 0x3;
  COLOR_INDICES_8[ 5] = (packed5 >> 2) & 0x3;
  COLOR_INDICES_8[ 6] = (packed5 >> 4) & 0x3;
  COLOR_INDICES_8[ 7] = (packed5 >> 6) & 0x3;

  const packed6 = blockData[blockOfs + 6];
  COLOR_INDICES_8[ 8] =  packed6       & 0x3;
  COLOR_INDICES_8[ 9] = (packed6 >> 2) & 0x3;
  COLOR_INDICES_8[10] = (packed6 >> 4) & 0x3;
  COLOR_INDICES_8[11] = (packed6 >> 6) & 0x3;

  const packed7 = blockData[blockOfs + 7];
  COLOR_INDICES_8[12] =  packed7       & 0x3;
  COLOR_INDICES_8[13] = (packed7 >> 2) & 0x3;
  COLOR_INDICES_8[14] = (packed7 >> 4) & 0x3;
  COLOR_INDICES_8[15] = (packed7 >> 6) & 0x3;
};

const dxt1DecompressBlock = (blockData: Uint8Array, blockOfs: number) => {
  dxt1GenerateColorLookup(blockData, blockOfs);
  dxt1GenerateColorIndices(blockData, blockOfs);

  for (let i = 0; i < 16; ++i) {
    DECOMPRESSED_32[i] = COLOR_LOOKUP_32[COLOR_INDICES_8[i]];
  }
};

const dxt3DecompressBlock = (blockData: Uint8Array, blockOfs: number) => {
  dxt1DecompressBlock(blockData, blockOfs + 8);

  for (let i = 0; i < 8; i++) {
    const pixelOfs = i * 8;

    const quant = blockData[blockOfs + i];
    const lo = quant & 0x0f;
    const hi = quant & 0xf0;

    DECOMPRESSED_8[pixelOfs + 3] = lo | (lo << 4);
    DECOMPRESSED_8[pixelOfs + 7] = hi | (hi >> 4);
  }
};

const dxt5GenerateAlphaLookup = (alpha0: number, alpha1: number) => {
  ALPHA_LOOKUP[0] = alpha0;
  ALPHA_LOOKUP[1] = alpha1;

  if (alpha0 > alpha1) {
    ALPHA_LOOKUP[2] = ((6 * alpha0 + 1 * alpha1) / 7) | 0;
    ALPHA_LOOKUP[3] = ((5 * alpha0 + 2 * alpha1) / 7) | 0;
    ALPHA_LOOKUP[4] = ((4 * alpha0 + 3 * alpha1) / 7) | 0;
    ALPHA_LOOKUP[5] = ((3 * alpha0 + 4 * alpha1) / 7) | 0;
    ALPHA_LOOKUP[6] = ((2 * alpha0 + 5 * alpha1) / 7) | 0;
    ALPHA_LOOKUP[7] = ((1 * alpha0 + 6 * alpha1) / 7) | 0;
  } else {
    ALPHA_LOOKUP[2] = ((4 * alpha0 + 1 * alpha1) / 5) | 0;
    ALPHA_LOOKUP[3] = ((3 * alpha0 + 2 * alpha1) / 5) | 0;
    ALPHA_LOOKUP[4] = ((2 * alpha0 + 3 * alpha1) / 5) | 0;
    ALPHA_LOOKUP[5] = ((1 * alpha0 + 4 * alpha1) / 5) | 0;
    ALPHA_LOOKUP[6] = 0;
    ALPHA_LOOKUP[7] = 255;
  }
};

// prettier-ignore
const dxt5DecompressBlock = (blockData: Uint8Array, blockOfs: number) => {
  dxt1DecompressBlock(blockData, blockOfs + 8);

  const alpha0 = blockData[blockOfs + 0];
  const alpha1 = blockData[blockOfs + 1];
  dxt5GenerateAlphaLookup(alpha0, alpha1);

  const packed2 = blockData[blockOfs + 2];
  const packed3 = blockData[blockOfs + 3];
  const packed4 = blockData[blockOfs + 4];
  DECOMPRESSED_8[31] = ALPHA_LOOKUP[ (packed4 & 0b11100000) >> 5];
  DECOMPRESSED_8[27] = ALPHA_LOOKUP[ (packed4 & 0b00011100) >> 2];
  DECOMPRESSED_8[23] = ALPHA_LOOKUP[((packed4 & 0b00000011) << 1) + ((packed3 & 0b10000000) >> 7)];
  DECOMPRESSED_8[19] = ALPHA_LOOKUP[ (packed3 & 0b01110000) >> 4];
  DECOMPRESSED_8[15] = ALPHA_LOOKUP[ (packed3 & 0b00001110) >> 1];
  DECOMPRESSED_8[11] = ALPHA_LOOKUP[((packed3 & 0b00000001) << 2) + ((packed2 & 0b11000000) >> 6)];
  DECOMPRESSED_8[ 7] = ALPHA_LOOKUP[ (packed2 & 0b00111000) >> 3];
  DECOMPRESSED_8[ 3] = ALPHA_LOOKUP[ (packed2 & 0b00000111) >> 0];

  const packed5 = blockData[blockOfs + 5];
  const packed6 = blockData[blockOfs + 6];
  const packed7 = blockData[blockOfs + 7];
  DECOMPRESSED_8[63] = ALPHA_LOOKUP[ (packed7 & 0b11100000) >> 5];
  DECOMPRESSED_8[59] = ALPHA_LOOKUP[ (packed7 & 0b00011100) >> 2];
  DECOMPRESSED_8[55] = ALPHA_LOOKUP[((packed7 & 0b00000011) << 1) + ((packed6 & 0b10000000) >> 7)];
  DECOMPRESSED_8[51] = ALPHA_LOOKUP[ (packed6 & 0b01110000) >> 4];
  DECOMPRESSED_8[47] = ALPHA_LOOKUP[ (packed6 & 0b00001110) >> 1];
  DECOMPRESSED_8[43] = ALPHA_LOOKUP[((packed6 & 0b00000001) << 2) + ((packed5 & 0b11000000) >> 6)];
  DECOMPRESSED_8[39] = ALPHA_LOOKUP[ (packed5 & 0b00111000) >> 3];
  DECOMPRESSED_8[35] = ALPHA_LOOKUP[ (packed5 & 0b00000111) >> 0];
};

const dxtToAbgr8888 = (
  width: number,
  height: number,
  input: Uint8Array,
  blockSize: number,
  decompressBlock: (block: Uint8Array, blockOfs: number) => void,
) => {
  if (width % DXT_BLOCK_WIDTH !== 0) {
    throw new Error(`Texture width is not a multiple of ${DXT_BLOCK_WIDTH}: ${width}`);
  }

  if (height % DXT_BLOCK_HEIGHT !== 0) {
    throw new Error(`Texture height is not a multiple of ${DXT_BLOCK_HEIGHT}: ${height}`);
  }

  const bw = width / DXT_BLOCK_WIDTH;
  const bh = height / DXT_BLOCK_HEIGHT;
  const bc = bw * bh;

  if (input.byteLength !== bc * blockSize) {
    throw new Error(
      `Unexpected input length given texture dimensions: ${input.byteLength} != ${bc * blockSize}`,
    );
  }

  const output = new ArrayBuffer(width * height * 4);
  const output8 = new Uint8Array(output);
  const output32 = new Uint32Array(output);

  for (let i = 0; i < bc; i++) {
    decompressBlock(input, blockSize * i);

    const sx = (i % bw) * 4;
    const sy = ((i / bw) | 0) * 4;

    let d = 0;
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        const p = x + sx + (y + sy) * width;

        output32[p] = DECOMPRESSED_32[d];

        d += 1;
      }
    }
  }

  return output8;
};

const dxt1ToAbgr8888 = (width: number, height: number, input: Uint8Array) =>
  dxtToAbgr8888(width, height, input, DXT1_BLOCK_SIZE, dxt1DecompressBlock);

const dxt3ToAbgr8888 = (width: number, height: number, input: Uint8Array) =>
  dxtToAbgr8888(width, height, input, DXT3_BLOCK_SIZE, dxt3DecompressBlock);

const dxt5ToAbgr8888 = (width: number, height: number, input: Uint8Array) =>
  dxtToAbgr8888(width, height, input, DXT5_BLOCK_SIZE, dxt5DecompressBlock);

export { dxt1ToAbgr8888, dxt3ToAbgr8888, dxt5ToAbgr8888 };
