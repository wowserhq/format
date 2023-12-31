import { IoContext, IoSource, IoType, IoMode, IoStream, openStream } from '@wowserhq/io';
import * as mcnkIo from './mcnk.js';

/**
 * An IoType to read MCNK data from ADT files.
 *
 * While MCNK is nominally a headered TLV format, a number of presumed bugs in Blizzard's authoring
 * tools lead to multiple tags with invalid lengths. The game client uses alternative length values
 * specified in the header for these tags.
 */
class McnkIo implements IoType {
  getSize() {
    return 0;
  }

  #readChunk(stream: IoStream, context: IoContext, header: Record<string, any>) {
    const tagValue = mcnkIo.chunkTag.read(stream);

    let lengthValue = stream.readUint32Le();
    if (tagValue === 'MCAL') {
      lengthValue = header.mcalSize - 8;
    } else if (tagValue === 'MCLQ') {
      lengthValue = header.mclqSize - 8;
    } else if (tagValue === 'MCSH') {
      lengthValue = header.mcshSize;
    }

    const valueType = mcnkIo.chunks[tagValue];
    const valueBytes = stream.readBytes(lengthValue);

    let valueValue = valueBytes;
    if (valueType && valueType.read) {
      const valueStream = openStream(valueBytes, IoMode.Read);
      valueValue = valueType.read(valueStream, context);
    }

    // If tag is padded, adjust offset accordingly
    const padding = mcnkIo.padding[tagValue] ?? 0;
    stream.offset += padding;

    return {
      tag: tagValue,
      length: lengthValue,
      value: valueValue,
    };
  }

  #readChunks(stream: IoStream, context: IoContext, header: Record<string, any>) {
    const chunks = [];

    while (!stream.eof) {
      chunks.push(this.#readChunk(stream, context, header));
    }

    return chunks;
  }

  read(source: IoSource, context: IoContext = {}) {
    const stream = openStream(source, IoMode.Read);
    const value: Record<string, any> = {};

    context.local = null;
    context.root = context.root ?? null;

    const header = mcnkIo.header.read(source);
    value.header = header;
    value.data = this.#readChunks(stream, context, header);

    return value;
  }
}

export default McnkIo;
