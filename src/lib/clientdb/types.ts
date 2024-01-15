import { IoContext, IoStream } from '@wowserhq/io';
import { DB_LOCALE } from './const.js';

interface RecordIoContext extends IoContext {
  stringBlock?: IoStream;
  locale?: DB_LOCALE;
}

export { RecordIoContext };
