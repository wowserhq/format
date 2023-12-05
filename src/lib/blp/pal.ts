const pala0toRgba8888 = (width: number, height: number, input: Uint8Array, palette: Uint8Array) => {
  const output = new Uint8Array(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const outOfs = i * 4;
    const palOfs = input[i] * 4;

    // palette is bgr
    output[outOfs + 0] = palette[palOfs + 2];
    output[outOfs + 1] = palette[palOfs + 1];
    output[outOfs + 2] = palette[palOfs + 0];

    // alpha is 0 bits
    output[outOfs + 3] = 255;
  }

  return output;
};

const pala1toRgba8888 = (width: number, height: number, input: Uint8Array, palette: Uint8Array) => {
  const output = new Uint8Array(width * height * 4);
  const alphaOfs = width * height;

  for (let i = 0; i < width * height; i++) {
    const outOfs = i * 4;
    const palOfs = input[i] * 4;

    // palette is bgr
    output[outOfs + 0] = palette[palOfs + 2];
    output[outOfs + 1] = palette[palOfs + 1];
    output[outOfs + 2] = palette[palOfs + 0];

    // alpha is 1 bit and appears after palette indices in input
    const alphaByte = input[alphaOfs + ((i / 8) | 0)];
    output[outOfs + 3] = (alphaByte & (1 << i % 8)) === 0 ? 0x00 : 0xff;
  }

  return output;
};

const pala4toRgba8888 = (width: number, height: number, input: Uint8Array, palette: Uint8Array) => {
  const output = new Uint8Array(width * height * 4);
  const alphaOfs = width * height;

  for (let i = 0; i < width * height; i++) {
    const outOfs = i * 4;
    const palOfs = input[i] * 4;

    // palette is bgr
    output[outOfs + 0] = palette[palOfs + 2];
    output[outOfs + 1] = palette[palOfs + 1];
    output[outOfs + 2] = palette[palOfs + 0];

    // alpha is 4 bits and appears after palette indices in input
    const alphaByte = input[alphaOfs + ((i / 2) | 0)];
    const alphaBits = (alphaByte >> ((i % 2) * 4)) & 0xf;
    output[outOfs + 3] = (alphaBits << 4) | alphaBits;
  }

  return output;
};

const pala8toRgba8888 = (width: number, height: number, input: Uint8Array, palette: Uint8Array) => {
  const output = new Uint8Array(width * height * 4);
  const alphaOfs = width * height;

  for (let i = 0; i < width * height; i++) {
    const outOfs = i * 4;
    const palOfs = input[i] * 4;

    // palette is bgr
    output[outOfs + 0] = palette[palOfs + 2];
    output[outOfs + 1] = palette[palOfs + 1];
    output[outOfs + 2] = palette[palOfs + 0];

    // alpha is 8 bits and appears after palette indices in input
    output[outOfs + 3] = input[alphaOfs + i];
  }

  return output;
};

const palToRgba8888 = (
  width: number,
  height: number,
  input: Uint8Array,
  palette: Uint8Array,
  alphaSize: number,
) => {
  switch (alphaSize) {
    case 0:
      return pala0toRgba8888(width, height, input, palette);
    case 1:
      return pala1toRgba8888(width, height, input, palette);
    case 4:
      return pala4toRgba8888(width, height, input, palette);
    case 8:
      return pala8toRgba8888(width, height, input, palette);
    default:
      throw new Error(`Unsupported alpha size: ${alphaSize}`);
  }
};

export { palToRgba8888 };
