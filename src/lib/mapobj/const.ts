enum MAP_OBJ_FLAG {
  FLAG_CVERTS_TRANS_ATTENUATED = 0x1,
  FLAG_UNIFIED_SHADING = 0x2,
  FLAG_CVERTS_FIXED = 0x8,
}

enum MAP_OBJ_GROUP_FLAG {
  FLAG_CVERTS = 0x4,
  FLAG_EXTERIOR = 0x8,
  FLAG_EXTERIOR_LIT = 0x40,
  FLAG_INTERIOR = 0x2000,
}

enum MAP_OBJ_MATERIAL_FLAG {
  FLAG_UNLIT = 0x1,
  FLAG_UNFOGGED = 0x2,
  FLAG_UNCULLED = 0x4,
  FLAG_EXTLIGHT = 0x8,
  FLAG_SIDN = 0x10,
  FLAG_WINDOW = 0x20,
  FLAG_CLAMP_S = 0x40,
  FLAG_CLAMP_T = 0x80,
}

enum MAP_OBJ_FRAGMENT_SHADER {
  FRAGMENT_DIFFUSE = 0,
  FRAGMENT_SPECULAR,
  FRAGMENT_METAL,
  FRAGMENT_ENV,
  FRAGMENT_OPAQUE,
  FRAGMENT_ENV_METAL,
  FRAGMENT_COMPOSITE,
  FRAGMENT_UNKNOWN,
}

enum MAP_OBJ_VERTEX_SHADER {
  VERTEX_DIFFUSE_T1 = 0,
  VERTEX_DIFFUSE_T1_REFL,
  VERTEX_DIFFUSE_COMP,
  VERTEX_SPECULAR_T1,
  VERTEX_UNKNOWN,
}

const MAP_OBJ_SHADER = [
  // Shader 0
  {
    vertexShader: MAP_OBJ_VERTEX_SHADER.VERTEX_DIFFUSE_T1,
    fragmentShader: MAP_OBJ_FRAGMENT_SHADER.FRAGMENT_DIFFUSE,
  },

  // Shader 1
  {
    vertexShader: MAP_OBJ_VERTEX_SHADER.VERTEX_SPECULAR_T1,
    fragmentShader: MAP_OBJ_FRAGMENT_SHADER.FRAGMENT_SPECULAR,
  },

  // Shader 2
  {
    vertexShader: MAP_OBJ_VERTEX_SHADER.VERTEX_SPECULAR_T1,
    fragmentShader: MAP_OBJ_FRAGMENT_SHADER.FRAGMENT_METAL,
  },

  // Shader 3
  {
    vertexShader: MAP_OBJ_VERTEX_SHADER.VERTEX_DIFFUSE_T1_REFL,
    fragmentShader: MAP_OBJ_FRAGMENT_SHADER.FRAGMENT_ENV,
  },

  // Shader 4
  {
    vertexShader: MAP_OBJ_VERTEX_SHADER.VERTEX_DIFFUSE_T1,
    fragmentShader: MAP_OBJ_FRAGMENT_SHADER.FRAGMENT_OPAQUE,
  },

  // Shader 5
  {
    vertexShader: MAP_OBJ_VERTEX_SHADER.VERTEX_DIFFUSE_T1_REFL,
    fragmentShader: MAP_OBJ_FRAGMENT_SHADER.FRAGMENT_ENV_METAL,
  },

  // Shader 6
  {
    vertexShader: MAP_OBJ_VERTEX_SHADER.VERTEX_DIFFUSE_COMP,
    fragmentShader: MAP_OBJ_FRAGMENT_SHADER.FRAGMENT_COMPOSITE,
  },
];

export {
  MAP_OBJ_FLAG,
  MAP_OBJ_GROUP_FLAG,
  MAP_OBJ_MATERIAL_FLAG,
  MAP_OBJ_FRAGMENT_SHADER,
  MAP_OBJ_VERTEX_SHADER,
  MAP_OBJ_SHADER,
};
