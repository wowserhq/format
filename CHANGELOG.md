# Changelog

## [0.10.0](https://github.com/wowserhq/format/compare/v0.9.3...v0.10.0) (2024-01-03)


### Features

* **map:** add map-aligned position and rotation to doodad defs ([ec7e690](https://github.com/wowserhq/format/commit/ec7e69096019fd2136443bcb6f368edc91fe3bfc))
* **map:** load doodad defs and obj defs when loading area ([05856f2](https://github.com/wowserhq/format/commit/05856f2fbb2ff28149b9ca3dc19be66313337301))
* **model:** add support for reading m2 models ([8c4ade3](https://github.com/wowserhq/format/commit/8c4ade3518f96c107b207fee19d0a948570dc537))


### Bug Fixes

* **blp:** handle unusually sized mip data at very small sizes ([5d83376](https://github.com/wowserhq/format/commit/5d833762e5fe70e4a29cdc0efdb78c7e7724837a))

## [0.9.3](https://github.com/wowserhq/format/compare/v0.9.2...v0.9.3) (2023-12-31)


### Bug Fixes

* **map:** correct various splat issues when loading map chunks ([efc9d16](https://github.com/wowserhq/format/commit/efc9d163376bc02f5b2862c5da74e97491582050))

## [0.9.2](https://github.com/wowserhq/format/compare/v0.9.1...v0.9.2) (2023-12-31)


### Bug Fixes

* **map:** override length values appropriately when reading map chunks ([a292ed9](https://github.com/wowserhq/format/commit/a292ed93450f5de0da9b3e0fb87e2ee44e708f22))

## [0.9.1](https://github.com/wowserhq/format/compare/v0.9.0...v0.9.1) (2023-12-31)


### Bug Fixes

* **map:** handle missing layers when loading map chunks ([c40777b](https://github.com/wowserhq/format/commit/c40777bc4769e7a95bcd5a5c7c4eea063ea53865))

## [0.9.0](https://github.com/wowserhq/format/compare/v0.8.1...v0.9.0) (2023-12-29)


### Features

* **map:** add getter for available areas ([b6dc978](https://github.com/wowserhq/format/commit/b6dc97846edf554f233b69f44a01e7b09ed99b0c))

## [0.8.1](https://github.com/wowserhq/format/compare/v0.8.0...v0.8.1) (2023-12-27)


### Bug Fixes

* add missing types export to package ([235f5fa](https://github.com/wowserhq/format/commit/235f5fad9f9a29c35fe8a031282361eee4ba793d))

## [0.8.0](https://github.com/wowserhq/format/compare/v0.7.0...v0.8.0) (2023-12-26)


### Features

* **blp:** add helper to return all images from a BLP ([227b0da](https://github.com/wowserhq/format/commit/227b0dac8f6f67a0e2b9aa114f574a92e5e88476))
* **blp:** permit chaining load calls ([6becae8](https://github.com/wowserhq/format/commit/6becae88553cbee9ac53d9e2a36922c5b014d4a1))
* **map:** add initial support for loading map formats ([#34](https://github.com/wowserhq/format/issues/34)) ([1e7b0d1](https://github.com/wowserhq/format/commit/1e7b0d17f0fd17d0bed3bb2ad72e8d7a3f32c8f0))

## [0.7.0](https://github.com/wowserhq/format/compare/v0.6.0...v0.7.0) (2023-12-16)


### Features

* **blp:** add support for setting images with raw color format ([#26](https://github.com/wowserhq/format/issues/26)) ([78f9e5f](https://github.com/wowserhq/format/commit/78f9e5fb38f240c0b7562a52e59f16a1000da47f))
* **blp:** add supporting for saving BLPs ([#23](https://github.com/wowserhq/format/issues/23)) ([a196167](https://github.com/wowserhq/format/commit/a1961675a4d08aa4462fdebaf0038260356e3dc5))

## [0.6.0](https://github.com/wowserhq/format/compare/v0.5.0...v0.6.0) (2023-12-10)


### Features

* **blp:** continue improving dxt decompression performance ([61ce439](https://github.com/wowserhq/format/commit/61ce439e0c1fe7a0dc5923edae874463aa9c535a))

## [0.5.0](https://github.com/wowserhq/format/compare/v0.4.0...v0.5.0) (2023-12-09)


### Features

* **blp:** reduce allocations in dxt compression logic ([b863f8e](https://github.com/wowserhq/format/commit/b863f8e378707676c6293b8e8da8cc39f2f0cd4c))

## [0.4.0](https://github.com/wowserhq/format/compare/v0.3.0...v0.4.0) (2023-12-09)


### Features

* **blp:** improve dxt decompression performance ([d197175](https://github.com/wowserhq/format/commit/d1971754944f6efdfe041f8b8d7a5e670262f36b))


### Bug Fixes

* **blp:** correct accuracy of dxt3 alpha decompression ([0a13003](https://github.com/wowserhq/format/commit/0a13003949330b6618d3c183deb55159ad8a141b))

## [0.3.0](https://github.com/wowserhq/format/compare/v0.2.0...v0.3.0) (2023-12-07)


### Features

* **blp:** add support for getting images from raw BLPs ([3ba582a](https://github.com/wowserhq/format/commit/3ba582a5ad04394bb6917922a40a0db59b807173))


### Bug Fixes

* **blp:** use little-endian naming convention in BLP_IMAGE_FORMAT ([0dce033](https://github.com/wowserhq/format/commit/0dce033f650a7cb36689b9a51db756e5e6155a51))

## [0.2.0](https://github.com/wowserhq/format/compare/v0.1.0...v0.2.0) (2023-12-05)


### Features

* **blp:** add support for getting images from paletted BLPs ([449a161](https://github.com/wowserhq/format/commit/449a161c7243975ba7d9e72a16438a252e70d56d))

## 0.1.0 (2023-11-30)

### Features

* initial release
