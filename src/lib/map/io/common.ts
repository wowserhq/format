import { IoType } from '@wowserhq/io';
import * as io from '@wowserhq/io';

const mapString: IoType = io.string();

const mver: IoType = io.uint32le;

export { mver, mapString };
