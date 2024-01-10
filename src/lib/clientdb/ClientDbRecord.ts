import { IoSource, IoType, openStream } from '@wowserhq/io';

class ClientDbRecord {
  id: number;

  #recordIo: IoType;

  constructor(recordIo: IoType) {
    this.#recordIo = recordIo;
  }

  load(source: IoSource) {
    const stream = openStream(source);

    const record = this.#recordIo.read(stream);

    for (const [key, value] of Object.entries(record)) {
      this[key] = value;
    }

    return this;
  }
}

export default ClientDbRecord;
