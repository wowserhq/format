meta:
  id: string_ref
  endian: le
params:
  - id: string_block_offset
    type: u4
seq:
  - id: offset
    type: u4
instances:
  value:
    pos: string_block_offset + offset
    type: strz
    encoding: utf8
