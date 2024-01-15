import { IoStream, IoType } from '@wowserhq/io';
import * as dbIo from './io.js';
import { DB_LOCALE } from './const.js';

class ClientDbRecord {
  id: number;

  #recordIo: IoType;

  constructor(recordIo: IoType) {
    this.#recordIo = recordIo;
  }

  load(stream: IoStream, stringBlock: IoStream, locale: DB_LOCALE) {
    const record = this.#recordIo.read(stream);

    for (const [key, value] of Object.entries(record)) {
      if (key.endsWith('.locstring')) {
        const string = this.#readLocString(value as number[], stringBlock, locale);
        const normalizedKey = key.replace('.locstring', '');

        this[normalizedKey] = string;
      } else if (key.endsWith('.string')) {
        const string = this.#readString(value as number, stringBlock);
        const normalizedKey = key.replace('.string', '');

        this[normalizedKey] = string;
      } else {
        this[key] = value;
      }
    }

    return this;
  }

  #readLocString(value: number[], stringBlock: IoStream, locale: DB_LOCALE) {
    // All values before last are offsets in the string block
    const offsets = value.slice(0, -1);

    // Last value is flags
    const flags = value.at(-1);

    // Read locale-specific string
    stringBlock.offset = offsets[locale];
    const localeString = dbIo.string.read(stringBlock);

    return localeString;
  }

  #readString(offset: number, stringBlock: IoStream) {
    stringBlock.offset = offset;
    const string = dbIo.string.read(stringBlock);

    return string;
  }
}

export default ClientDbRecord;
export { ClientDbRecord };
