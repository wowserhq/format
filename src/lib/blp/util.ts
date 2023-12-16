const calcMipLevelCount = (width: number, height: number) => {
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

const resizeBilinear = (
  data: Uint8Array,
  width: number,
  height: number,
  newWidth: number,
  newHeight: number,
): Uint8Array => {
  const newData = new Uint8Array(newWidth * newHeight * 4);

  for (let y = 0; y < newHeight; y++) {
    for (let x = 0; x < newWidth; x++) {
      const targetIndex = (y * newWidth + x) * 4;

      // Calculate corresponding coordinates in the original image
      const sourceX = (x * (width - 1)) / (newWidth - 1);
      const sourceY = (y * (height - 1)) / (newHeight - 1);

      // Get the four surrounding pixels in the original image
      const xFloor = Math.floor(sourceX);
      const yFloor = Math.floor(sourceY);
      const xCeil = Math.ceil(sourceX);
      const yCeil = Math.ceil(sourceY);

      // Bilinear interpolation weights
      const xWeight = sourceX - xFloor;
      const yWeight = sourceY - yFloor;

      // Interpolate each color channel separately
      for (let i = 0; i < 4; i++) {
        const topLeft = data[(yFloor * width + xFloor) * 4 + i];
        const topRight = data[(yFloor * width + xCeil) * 4 + i];
        const bottomLeft = data[(yCeil * width + xFloor) * 4 + i];
        const bottomRight = data[(yCeil * width + xCeil) * 4 + i];

        // Bilinear interpolation formula
        const topInterpolation = topLeft + xWeight * (topRight - topLeft);
        const bottomInterpolation = bottomLeft + xWeight * (bottomRight - bottomLeft);
        const finalInterpolation =
          topInterpolation + yWeight * (bottomInterpolation - topInterpolation);

        newData[targetIndex + i] = finalInterpolation;
      }
    }
  }

  return newData;
};

export { calcMipLevelCount, getSizeAtMipLevel, resizeBilinear };
