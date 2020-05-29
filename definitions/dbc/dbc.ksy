meta:
  id: dbc
  file-extension: dbc
  endian: le
  imports:
    - header
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
      - id: fields
        type: u4
        repeat: expr
        repeat-expr: _root.header.field_count
