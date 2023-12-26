import { MAP_LAYER_SPLAT_SIZE, MAP_LAYER_SPLAT_X } from './const.js';

const splat4To8 = (raw: Uint8Array, needsFix: boolean = false) => {
  const splat = new Uint8Array(MAP_LAYER_SPLAT_SIZE);
  const side = MAP_LAYER_SPLAT_X;

  for (let i = 0; i < MAP_LAYER_SPLAT_SIZE / 2; i++) {
    const value = raw[i];
    const offset = i * 2;

    splat[offset] = (value & 0x0f) * 17;
    splat[offset + 1] = (value >> 4) * 17;

    if (needsFix) {
      if (offset > MAP_LAYER_SPLAT_SIZE - side) {
        splat[offset] = splat[offset - side];
        splat[offset + 1] = splat[offset + 1 - side];
      }

      if (offset % side === side - 2) {
        splat[offset + 1] = splat[offset];
      }
    }
  }

  return splat;
};

const splatCompressedTo8 = (compressed: Uint8Array) => {
  const decompressed = new Uint8Array(MAP_LAYER_SPLAT_SIZE);

  let c = 0;
  let d = 0;

  while (d < decompressed.byteLength) {
    const fill = compressed[c] & 0x80;
    const count = compressed[c] & 0x7f;

    c++;

    for (let i = 0; i < count; i++) {
      if (d === decompressed.byteLength) {
        break;
      }

      decompressed[d] = compressed[c];

      d++;

      if (!fill) {
        c++;
      }
    }

    if (fill) {
      c++;
    }
  }

  return decompressed;
};

export { splat4To8, splatCompressedTo8 };
