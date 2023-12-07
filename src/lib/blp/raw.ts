const rawArgb8888ToAbgr8888 = (width: number, height: number, input: Uint8Array) => {
  const output = new Uint8Array(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const ofs = i * 4;

    output[ofs + 0] = input[ofs + 2];
    output[ofs + 1] = input[ofs + 1];
    output[ofs + 2] = input[ofs + 0];
    output[ofs + 3] = input[ofs + 3];
  }

  return output;
};

export { rawArgb8888ToAbgr8888 };
