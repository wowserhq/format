enum M2_BONE_FLAG {
  FLAG_SPHERICAL_BILLBOARD = 0x8,
  FLAG_CYLINDRICAL_BILLBOARD_X = 0x10,
  FLAG_CYLINDRICAL_BILLBOARD_Y = 0x20,
  FLAG_CYLINDRICAL_BILLBOARD_Z = 0x40,
  FLAG_BILLBOARD = FLAG_SPHERICAL_BILLBOARD |
    FLAG_CYLINDRICAL_BILLBOARD_X |
    FLAG_CYLINDRICAL_BILLBOARD_Y |
    FLAG_CYLINDRICAL_BILLBOARD_Z,
}

enum M2_MODEL_FLAG {
  USE_COMBINER_COMBOS = 0x8,
}

enum M2_MATERIAL_BLEND {
  BLEND_OPAQUE = 0,
  BLEND_ALPHA_KEY,
  BLEND_ALPHA,
  BLEND_NO_ALPHA_ADD,
  BLEND_ADD,
  BLEND_MOD,
  BLEND_MOD2X,
}

enum M2_MATERIAL_FLAG {
  FLAG_DISABLE_LIGHTING = 0x1,
  FLAG_DISABLE_FOG = 0x2,
  FLAG_TWO_SIDED = 0x4,
  FLAG_DISABLE_DEPTH_TEST = 0x8,
  FLAG_DISABLE_DEPTH_WRITE = 0x10,
}

enum M2_TEXTURE_COMBINER {
  COMBINER_OPAQUE = 0x0,
  COMBINER_MOD = 0x1,
  COMBINER_DECAL = 0x2,
  COMBINER_ADD = 0x3,
  COMBINER_MOD2X = 0x4,
  COMBINER_FADE = 0x5,
  COMBINER_MOD2XNA = 0x6,
  COMBINER_ADDNA = 0x7,
}

const M2_TEXTURE_COMBINER_OP_MASK = 0x7;
const M2_TEXTURE_COMBINER_ENV_MAP = 0x8;
const M2_TEXTURE_COMBINER_STAGE_SHIFT = 0x4;

enum M2_TEXTURE_COMPONENT {
  COMPONENT_NONE = 0,
  COMPONENT_SKIN,
  COMPONENT_OBJECT_SKIN,
  COMPONENT_WEAPON_BLADE,
  COMPONENT_WEAPON_HANDLE,
  COMPONENT_ENVIRONMENT,
  COMPONENT_CHAR_HAIR,
  COMPONENT_CHAR_FACIAL_HAIR,
  COMPONENT_SKIN_EXTRA,
  COMPONENT_UI_SKIN,
  COMPONENT_TAUREN_MANE,
  COMPONENT_MONSTER_1,
  COMPONENT_MONSTER_2,
  COMPONENT_MONSTER_3,
  COMPONENT_ITEM_ICON,
}

enum M2_TEXTURE_COORD {
  COORD_ENV = 0xffff,
  COORD_T1 = 0,
  COORD_T2,
}

enum M2_TEXTURE_FLAG {
  FLAG_WRAP_S = 0x1,
  FLAG_WRAP_T = 0x2,
}

enum M2_VERTEX_SHADER {
  VERTEX_T1 = 0,
  VERTEX_T2,
  VERTEX_ENV,
  VERTEX_T1_T2,
  VERTEX_T1_ENV,
  VERTEX_ENV_T2,
  VERTEX_ENV_ENV,
  VERTEX_UNKNOWN,
}

enum M2_FRAGMENT_SHADER {
  FRAGMENT_OPAQUE = 0,
  FRAGMENT_MOD,
  FRAGMENT_DECAL,
  FRAGMENT_ADD,
  FRAGMENT_MOD2X,
  FRAGMENT_FADE,
  FRAGMENT_OPAQUE_OPAQUE,
  FRAGMENT_OPAQUE_ADD,
  FRAGMENT_OPAQUE_ADDALPHA,
  FRAGMENT_OPAQUE_ADDALPHA_ALPHA,
  FRAGMENT_OPAQUE_MOD2X,
  FRAGMENT_OPAQUE_MOD2XNA,
  FRAGMENT_OPAQUE_MOD2XNA_ALPHA,
  FRAGMENT_OPAQUE_ADDNA,
  FRAGMENT_OPAQUE_MOD,
  FRAGMENT_MOD_OPAQUE,
  FRAGMENT_MOD_MOD,
  FRAGMENT_MOD_ADD,
  FRAGMENT_MOD_MOD2X,
  FRAGMENT_MOD_MOD2XNA,
  FRAGMENT_MOD_ADDNA,
  FRAGMENT_ADD_MOD,
  FRAGMENT_MOD2X_MOD2X,
  FRAGMENT_UNKNOWN,
}

export {
  M2_BONE_FLAG,
  M2_MODEL_FLAG,
  M2_MATERIAL_BLEND,
  M2_MATERIAL_FLAG,
  M2_TEXTURE_COMBINER,
  M2_TEXTURE_COMBINER_OP_MASK,
  M2_TEXTURE_COMBINER_ENV_MAP,
  M2_TEXTURE_COMBINER_STAGE_SHIFT,
  M2_TEXTURE_COORD,
  M2_TEXTURE_COMPONENT,
  M2_TEXTURE_FLAG,
  M2_VERTEX_SHADER,
  M2_FRAGMENT_SHADER,
};
