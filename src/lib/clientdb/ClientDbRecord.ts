import { IoStream, IoType } from '@wowserhq/io';
import { DB_LOCALE } from './const.js';
import { RecordIoContext } from './types.js';

class ClientDbRecord {
  id: number;

  #recordIo: IoType;

  constructor(recordIo: IoType) {
    this.#recordIo = recordIo;
  }

  load(stream: IoStream, stringBlock: IoStream, locale: DB_LOCALE) {
    const context: RecordIoContext = { stringBlock, locale };
    const record = this.#recordIo.read(stream, context);

    for (const [key, value] of Object.entries(record)) {
      this[key] = value;
    }

    return this;
  }
}

export default ClientDbRecord;
export { ClientDbRecord };
