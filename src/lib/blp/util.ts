const calcLevelCount = (width, height) => {
  let count = 1;

  let w = width === height * 6 ? width / 6 : width;
  let h = height;

  while (w > 1 || h > 1) {
    w = w >> 1 >= 1 ? w >> 1 : 1;
    h = h >> 1 >= 1 ? h >> 1 : 1;
    count++;
  }

  return count;
};

const getSizeAtMipLevel = (size: number, level: number) => (size / (1 << level)) | 0;

export { calcLevelCount, getSizeAtMipLevel };
