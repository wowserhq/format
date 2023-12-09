/*
 * DXT/BC helper functions
 *
 * Based in part on dxtn
 * https://github.com/LordVonAdel/dxtn
 * Copyright (c) 2021 Adrian Urban
 * Licensed under the MIT license
 */

const DXT_BLOCK_WIDTH = 4;
const DXT_BLOCK_HEIGHT = 4;

const DXT1_BLOCK_SIZE = 8;
const DXT3_BLOCK_SIZE = 16;
const DXT5_BLOCK_SIZE = 16;
const RGBA_BLOCK_SIZE = 64;

const COLOR_LOOKUP = new Uint8Array(16);
const COLOR_INDICES = new Uint8Array(16);
const ALPHA_LOOKUP = new Uint8Array(8);
const DECOMPRESSED = new Uint8Array(RGBA_BLOCK_SIZE);

const unpack565 = (color: number) => {
  const red = (color >> 11) & 0x1f;
  const green = (color >> 5) & 0x3f;
  const blue = color & 0x1f;

  return [(red << 3) | (red >> 2), (green << 2) | (green >> 4), (blue << 3) | (blue >> 2)];
};

// prettier-ignore
const dxt1GenerateColorLookup = (block: Uint8Array) => {
  const color0 = (block[1] << 8) + block[0];
  const color1 = (block[3] << 8) + block[2];

  const [r0, g0, b0] = unpack565(color0);
  const [r1, g1, b1] = unpack565(color1);

  COLOR_LOOKUP[0] = r0;
  COLOR_LOOKUP[1] = g0;
  COLOR_LOOKUP[2] = b0;
  COLOR_LOOKUP[3] = 255;

  COLOR_LOOKUP[4] = r1;
  COLOR_LOOKUP[5] = g1;
  COLOR_LOOKUP[6] = b1;
  COLOR_LOOKUP[7] = 255;

  if (color0 > color1) {
    COLOR_LOOKUP[ 8] = ((2 * r0 + r1) / 3) | 0;
    COLOR_LOOKUP[ 9] = ((2 * g0 + g1) / 3) | 0;
    COLOR_LOOKUP[10] = ((2 * b0 + b1) / 3) | 0;
    COLOR_LOOKUP[11] = 255;

    COLOR_LOOKUP[12] = ((r0 + 2 * r1) / 3) | 0;
    COLOR_LOOKUP[13] = ((g0 + 2 * g1) / 3) | 0;
    COLOR_LOOKUP[14] = ((b0 + 2 * b1) / 3) | 0;
    COLOR_LOOKUP[15] = 255;
  } else {
    COLOR_LOOKUP[ 8] = ((r0 + r1) / 2) | 0;
    COLOR_LOOKUP[ 9] = ((g0 + g1) / 2) | 0;
    COLOR_LOOKUP[10] = ((b0 + b1) / 2) | 0;
    COLOR_LOOKUP[11] = 255;

    COLOR_LOOKUP[12] = 0;
    COLOR_LOOKUP[13] = 0;
    COLOR_LOOKUP[14] = 0;
    COLOR_LOOKUP[15] = 0;
  }
};

// prettier-ignore
const dxt1GenerateColorIndices = (block: Uint8Array) => {
  const packed0 = block[4];
  COLOR_INDICES[ 0] =  packed0       & 0x3;
  COLOR_INDICES[ 1] = (packed0 >> 2) & 0x3;
  COLOR_INDICES[ 2] = (packed0 >> 4) & 0x3;
  COLOR_INDICES[ 3] = (packed0 >> 6) & 0x3;

  const packed1 = block[5];
  COLOR_INDICES[ 4] =  packed1       & 0x3;
  COLOR_INDICES[ 5] = (packed1 >> 2) & 0x3;
  COLOR_INDICES[ 6] = (packed1 >> 4) & 0x3;
  COLOR_INDICES[ 7] = (packed1 >> 6) & 0x3;

  const packed2 = block[6];
  COLOR_INDICES[ 8] =  packed2       & 0x3;
  COLOR_INDICES[ 9] = (packed2 >> 2) & 0x3;
  COLOR_INDICES[10] = (packed2 >> 4) & 0x3;
  COLOR_INDICES[11] = (packed2 >> 6) & 0x3;

  const packed3 = block[7];
  COLOR_INDICES[12] =  packed3       & 0x3;
  COLOR_INDICES[13] = (packed3 >> 2) & 0x3;
  COLOR_INDICES[14] = (packed3 >> 4) & 0x3;
  COLOR_INDICES[15] = (packed3 >> 6) & 0x3;
};

const dxt1DecompressBlock = (block: Uint8Array) => {
  if (block.byteLength != DXT1_BLOCK_SIZE) {
    return;
  }

  dxt1GenerateColorLookup(block);
  dxt1GenerateColorIndices(block);

  for (let i = 0; i < 16; ++i) {
    const pixelOfs = 4 * i;
    const lookupOfs = 4 * COLOR_INDICES[i];

    DECOMPRESSED[pixelOfs + 0] = COLOR_LOOKUP[lookupOfs + 0];
    DECOMPRESSED[pixelOfs + 1] = COLOR_LOOKUP[lookupOfs + 1];
    DECOMPRESSED[pixelOfs + 2] = COLOR_LOOKUP[lookupOfs + 2];
    DECOMPRESSED[pixelOfs + 3] = COLOR_LOOKUP[lookupOfs + 3];
  }
};

const dxt3DecompressBlock = (block: Uint8Array) => {
  dxt1DecompressBlock(block.subarray(8, 16));

  for (let i = 0; i < 8; i++) {
    DECOMPRESSED[i * 8 + 3] = (block[i] & 0x0f) << 4;
    DECOMPRESSED[i * 8 + 7] = block[i] & 0xf0;
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
const dxt5DecompressBlock = (block: Uint8Array) => {
  dxt1DecompressBlock(block.subarray(8, 16));

  const alpha0 = block[0];
  const alpha1 = block[1];
  dxt5GenerateAlphaLookup(alpha0, alpha1);

  DECOMPRESSED[31] = ALPHA_LOOKUP[ (block[4] & 0b11100000) >> 5];
  DECOMPRESSED[27] = ALPHA_LOOKUP[ (block[4] & 0b00011100) >> 2];
  DECOMPRESSED[23] = ALPHA_LOOKUP[((block[4] & 0b00000011) << 1) + ((block[3] & 0b10000000) >> 7)];
  DECOMPRESSED[19] = ALPHA_LOOKUP[ (block[3] & 0b01110000) >> 4];
  DECOMPRESSED[15] = ALPHA_LOOKUP[ (block[3] & 0b00001110) >> 1];
  DECOMPRESSED[11] = ALPHA_LOOKUP[((block[3] & 0b00000001) << 2) + ((block[2] & 0b11000000) >> 6)];
  DECOMPRESSED[ 7] = ALPHA_LOOKUP[ (block[2] & 0b00111000) >> 3];
  DECOMPRESSED[ 3] = ALPHA_LOOKUP[ (block[2] & 0b00000111) >> 0];

  DECOMPRESSED[63] = ALPHA_LOOKUP[ (block[7] & 0b11100000) >> 5];
  DECOMPRESSED[59] = ALPHA_LOOKUP[ (block[7] & 0b00011100) >> 2];
  DECOMPRESSED[55] = ALPHA_LOOKUP[((block[7] & 0b00000011) << 1) + ((block[6] & 0b10000000) >> 7)];
  DECOMPRESSED[51] = ALPHA_LOOKUP[ (block[6] & 0b01110000) >> 4];
  DECOMPRESSED[47] = ALPHA_LOOKUP[ (block[6] & 0b00001110) >> 1];
  DECOMPRESSED[43] = ALPHA_LOOKUP[((block[6] & 0b00000001) << 2) + ((block[5] & 0b11000000) >> 6)];
  DECOMPRESSED[39] = ALPHA_LOOKUP[ (block[5] & 0b00111000) >> 3];
  DECOMPRESSED[35] = ALPHA_LOOKUP[ (block[5] & 0b00000111) >> 0];
};

const dxtToAbgr8888 = (
  width: number,
  height: number,
  input: Uint8Array,
  blockSize: number,
  decompressBlock: (block: Uint8Array) => void,
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

  const output = new Uint8Array(width * height * 4);

  for (let i = 0; i < bc; i++) {
    const block = input.subarray(blockSize * i, blockSize * (i + 1));
    decompressBlock(block);

    const sx = (i % bw) * 4;
    const sy = ((i / bw) | 0) * 4;

    let d = 0;
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        const p = (x + sx) * 4 + (y + sy) * 4 * width;

        output[p + 0] = DECOMPRESSED[d + 0];
        output[p + 1] = DECOMPRESSED[d + 1];
        output[p + 2] = DECOMPRESSED[d + 2];
        output[p + 3] = DECOMPRESSED[d + 3];

        d += 4;
      }
    }
  }

  return output;
};

const dxt1ToAbgr8888 = (width: number, height: number, input: Uint8Array) =>
  dxtToAbgr8888(width, height, input, DXT1_BLOCK_SIZE, dxt1DecompressBlock);

const dxt3ToAbgr8888 = (width: number, height: number, input: Uint8Array) =>
  dxtToAbgr8888(width, height, input, DXT3_BLOCK_SIZE, dxt3DecompressBlock);

const dxt5ToAbgr8888 = (width: number, height: number, input: Uint8Array) =>
  dxtToAbgr8888(width, height, input, DXT5_BLOCK_SIZE, dxt5DecompressBlock);

export { dxt1ToAbgr8888, dxt3ToAbgr8888, dxt5ToAbgr8888 };
