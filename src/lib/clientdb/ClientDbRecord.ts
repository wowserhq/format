import { IoStream, IoType } from '@wowserhq/io';
import * as dbIo from './io.js';

class ClientDbRecord {
  id: number;

  #recordIo: IoType;

  constructor(recordIo: IoType) {
    this.#recordIo = recordIo;
  }

  load(stream: IoStream, stringBlock: IoStream) {
    const record = this.#recordIo.read(stream);

    for (const [key, value] of Object.entries(record)) {
      if (key.endsWith('.locstring')) {
        const strings = this.#readLocString(value as number[], stringBlock);
        const normalizedKey = key.replace('.locstring', '');

        this[normalizedKey] = strings;
      } else {
        this[key] = value;
      }
    }

    return this;
  }

  #readLocString(value: number[], stringBlock: IoStream) {
    // All values before last are offsets in the string block
    const offsets = value.slice(0, -1);

    // Last value is flags
    const flags = value.at(-1);

    const strings: string[] = [];

    for (const offset of offsets) {
      stringBlock.offset = offset;
      const string = dbIo.string.read(stringBlock);
      strings.push(string);
    }

    return strings;
  }
}

export default ClientDbRecord;
export { ClientDbRecord };
