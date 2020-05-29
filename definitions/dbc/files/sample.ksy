meta:
  id: sample
  file-extension: Sample.dbc
  endian: le
  imports:
    - ../header
    - ../localized_string_ref
    - ../string_ref
seq:
  - id: header
    type: header
  - id: records
    type: record
    repeat: expr
    repeat-expr: header.record_count
types:
  record:
    seq:
      - id: id
        type: u4
      - id: name
        type: string_ref(_root.header.string_block_offset)
      - id: localized_name
        type: localized_string_ref(_root.header.string_block_offset)
      - id: points
        type: s4
      - id: height
        type: f4
