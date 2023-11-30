const fs = require('fs-extra');

const cjsPackage = {
  type: 'commonjs',
};

const esmPackage = {
  type: 'module',
};

fs.writeJsonSync('./dist/cjs/package.json', cjsPackage);
fs.writeJsonSync('./dist/esm/package.json', esmPackage);
