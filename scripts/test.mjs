import fs from 'fs';
import util from 'util';

import kaitai from 'kaitai-struct';

const simplify = (obj) => (
  JSON.parse(JSON.stringify(obj, (key, value) => {
    if (key.startsWith('_')) {
      return undefined;
    }
    const { constructor } = value;
    if (constructor.name.endsWith('StringRef')) {
      return value.value;
    }
    return value;
  }))
);

const test = async (file, definition) => {
  const fixture = fs.readFileSync(file);
  const stream = new kaitai.KaitaiStream(fixture);

  const DBC = (await import(definition)).default;
  try {
    const dbc = new DBC(stream);
    // console.log(util.inspect(simplify(dbc), { colors: true, depth: 4 }));

  } catch(e) {
    console.error(e);
  }
};

test('spec/fixtures/Sample.dbc', '../dist/dbc/files/Sample.js');
test('ChrClasses.dbc', '../dist/dbc/files/ChrClasses.js');
test('ChrRaces.dbc', '../dist/dbc/files/ChrRaces.js');
test('Spell.dbc', '../dist/dbc/files/Spell.js');
