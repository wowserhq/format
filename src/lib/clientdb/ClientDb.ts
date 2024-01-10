import { IoSource, openStream } from '@wowserhq/io';
import ClientDbRecord from './ClientDbRecord.js';
import * as dbIo from './io.js';

interface Constructor<T> {
  new (...args: any[]): T;
}

class ClientDb<T extends ClientDbRecord> {
  #RecordClass: Constructor<T>;

  #minId = 0xfffffff;
  #maxId = 0;

  #recordCount = 0;

  #records: T[];
  #recordsById: Record<number, T>;

  constructor(RecordClass: Constructor<T>) {
    this.#RecordClass = RecordClass;
  }

  get records() {
    return this.#records;
  }

  load(source: IoSource): ClientDb<T> {
    const stream = openStream(source);

    const header = dbIo.header.read(stream);

    this.#recordCount = header.recordCount;

    const records = new Array(this.#recordCount);
    const recordsById = {};

    for (let i = 0; i < this.#recordCount; i++) {
      const record = new this.#RecordClass().load(stream);

      this.#minId = record.id < this.#minId ? record.id : this.#minId;
      this.#maxId = record.id > this.#maxId ? record.id : this.#maxId;

      records[i] = record;
      recordsById[record.id] = record;
    }

    this.#records = records;
    this.#recordsById = recordsById;

    stream.close();

    return this;
  }

  getRecord(id: number): T {
    if (id < this.#minId || id > this.#maxId) {
      return null;
    }

    return this.#recordsById[id];
  }

  getRecordByIndex(index: number) {
    if (index < 0 || index >= this.#recordCount) {
      return null;
    }

    return this.#records[index];
  }
}

export default ClientDb;
export { ClientDb };
