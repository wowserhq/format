# Wowser Format

[![join community](https://img.shields.io/badge/discord-join_community-blue.svg?style=flat)](https://discord.com/invite/DeVVKVg)
[![npm](https://img.shields.io/npm/v/%40wowserhq%2Fformat)](https://www.npmjs.com/package/@wowserhq/format)
[![ci status](https://github.com/wowserhq/format/actions/workflows/ci.yml/badge.svg)](https://github.com/wowserhq/format/actions/workflows/ci.yml)
[![codecov](https://codecov.io/github/wowserhq/format/graph/badge.svg?token=6X4JBB54YI)](https://codecov.io/github/wowserhq/format)

Format classes to work with common data files used in World of Warcraft.

## Usage

To install Wowser Format:

```sh
npm install @wowserhq/format
```

Wowser Format has a single dependency: it uses `@wowserhq/io` to handle file IO (reads and writes).

### BLP

Wowser Format supports loading and converting image data contained in BLP files. BLP files encoded
in palette, DXT, and raw form are all supported. BLP files encoded in JPEG form are not currently
supported.

#### Rendering a BLP in a `<canvas>` element

```js
import { Blp, BLP_IMAGE_FORMAT } from '@wowserhq/format';

const loadBlp = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch BLP: Error ${response.status}`);
  }

  const data = await response.arrayBuffer();

  const blp = new Blp();
  blp.load(new Uint8Array(data));

  // <canvas> elements use image data stored in [r, g, b, a] byte order. Per standard naming
  // conventions, the BLP_IMAGE_FORMAT enum references formats in highest-to-lowest order on
  // little-endian systems. As a result, IMAGE_ABGR8888 is the appropriate image format for use
  // with ImageData and <canvas> elements.
  const image = blp.getImage(0, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);
  const imageData = new ImageData(new Uint8ClampedArray(image.data), image.width, image.height);

  return imageData;
};

const imageData = await loadBlp('url-of-blp-here');

const canvas = document.createElement('canvas');
canvas.width = image.width;
canvas.height = image.height;

const context = canvas.getContext('2d');
context.putImageData(imageData, 0, 0);
```

## License

Wowser Format is copyright © Wowser Contributors. It is licensed under the **MIT** license. See
`LICENSE` for more information.
