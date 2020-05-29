meta:
  id: header
  endian: le
seq:
  - id: magic
    contents: 'WDBC'
  - id: record_count
    type: u4
  - id: field_count
    type: u4
  - id: record_size
    type: u4
  - id: string_block_size
    type: u4
instances:
  string_block_offset:
    value: 5 * 4 + record_count * record_size
