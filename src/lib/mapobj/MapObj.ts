import { IoMode, IoSource, openStream } from '@wowserhq/io';
import { indexChunks } from '../util.js';
import * as rootIo from './io/root.js';
import * as commonIo from './io/common.js';
import { MapObjColor, MapObjGroupInfo, MapObjMaterial } from './types.js';
import {
  MAP_OBJ_FLAG,
  MAP_OBJ_GROUP_FLAG,
  MAP_OBJ_FRAGMENT_SHADER,
  MAP_OBJ_MATERIAL_FLAG,
  MAP_OBJ_SHADER,
  MAP_OBJ_VERTEX_SHADER,
} from './const.js';

class MapObj {
  #version = 17;
  #flags = 0x0;
  #ambientColor: MapObjColor = { r: 127, g: 127, b: 127, a: 255 };
  #groupInfo: MapObjGroupInfo[] = [];
  #materials: MapObjMaterial[] = [];

  get ambientColor() {
    return this.#ambientColor;
  }

  get flags() {
    return this.#flags;
  }

  get groupInfo() {
    return this.#groupInfo;
  }

  get materials() {
    return this.#materials;
  }

  get version() {
    return this.#version;
  }

  load(source: IoSource) {
    const stream = openStream(source, IoMode.Read);
    const chunks = rootIo.root.read(stream);
    stream.close();

    const data = indexChunks(chunks);

    const versionChunk = data.get('MVER');
    if (versionChunk) {
      if (versionChunk.version !== 17) {
        throw new Error(`Unsupported WMO version: ${versionChunk.version}`);
      }

      this.#version = versionChunk.version;
    }

    const headerChunk = data.get('MOHD');
    if (headerChunk) {
      this.#ambientColor = headerChunk.ambientColor;
      this.#flags = headerChunk.flags;
    }

    this.#loadGroupInfo(data.get('MOGI'), data);

    this.#loadMaterials(data.get('MOMT'), data);

    return this;
  }

  #loadGroupInfo(groupInfos: any[], rootData: Map<string, any>) {
    const groupNameStream = openStream(rootData.get('MOGN'), IoMode.Read);

    for (const groupInfo of groupInfos) {
      let name;
      if (groupInfo.nameOffset >= 0) {
        groupNameStream.offset = groupInfo.nameOffset;
        name = commonIo.mapObjString.read(groupNameStream);
      }

      this.#groupInfo.push({
        flags: groupInfo.flags,
        boundingBox: groupInfo.boundingBox,
        name,
      });
    }

    groupNameStream.close();
  }

  #loadMaterials(materials: any[], rootData: Map<string, any>) {
    const textureStream = openStream(rootData.get('MOTX'), IoMode.Read);

    for (const material of materials) {
      const textures = [];

      textureStream.offset = material.texture1Offset;
      const texture1 = commonIo.mapObjString.read(textureStream);
      if (texture1) {
        textures.push(texture1);
      }

      textureStream.offset = material.texture2Offset;
      const texture2 = commonIo.mapObjString.read(textureStream);
      if (texture2) {
        textures.push(texture2);
      }

      const shader = MAP_OBJ_SHADER[material.shader];

      this.#materials.push({
        flags: material.flags,
        ...shader,
        textures,
        sidnColor: material.sidnColor,
        diffuseColor: material.diffuseColor,
      });
    }

    textureStream.close();
  }
}

export default MapObj;
export {
  MapObj,
  MapObjGroupInfo,
  MapObjMaterial,
  MAP_OBJ_FLAG,
  MAP_OBJ_GROUP_FLAG,
  MAP_OBJ_MATERIAL_FLAG,
  MAP_OBJ_FRAGMENT_SHADER,
  MAP_OBJ_VERTEX_SHADER,
};
