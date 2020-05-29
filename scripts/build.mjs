import fs from 'fs';
import path from 'path';

import KaitaiStructCompiler from 'kaitai-struct-compiler';
import yaml from 'js-yaml';

const sourceRoot = path.join('definitions');
const distRoot = path.join('dist');

const debug = false;

const compiler = new KaitaiStructCompiler();

const idToFilename = (id) => (
  id.replace(/(?:\b|_)(\w)/g, (_, a) => a.toUpperCase())
);

const resolverFor = (root) => ({
  entries: new Map(),
  importYaml: function (relpath, _mode) {
    const fqpath = path.join(sourceRoot, root, `${relpath}.ksy`);
    const source = fs.readFileSync(fqpath, 'utf8');
    const parsed = yaml.safeLoad(source);
    this.entries.set(idToFilename(parsed.meta.id), path.join(root, idToFilename(relpath)));
    return Promise.resolve(parsed);
  }
});

const build = async (ksy) => {
  const root = path.dirname(ksy);
  const resolver = resolverFor(root);
  const source = await resolver.importYaml(path.basename(ksy));

  const files = await compiler.compile('javascript', source, resolver, debug);

  for (let [id, contents] of Object.entries(files)) {
    const relpath = resolver.entries.get(path.basename(id, '.js'));
    const fqpath = path.join(distRoot, `${relpath}.js`);

    for (const [filename, deppath] of resolver.entries) {
      const regexp = new RegExp(`'\./${filename}'`, 'g');
      contents = contents.replace(regexp, (original) => (
        `'./${path.relative(path.join(relpath, '..'), deppath)}'`
      ))
    }

    fs.writeFileSync(fqpath, contents);
  }
};

(async () => {
  try {
    await build('dbc/dbc');
    await build('dbc/files/chr_classes');
    await build('dbc/files/chr_races');
    await build('dbc/files/sample');
    await build('dbc/files/spell');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
