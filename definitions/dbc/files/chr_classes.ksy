meta:
  id: chr_classes
  file-extension: ChrClasses.dbc
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
      - id: unk1
        type: u4
      - id: power_type
        type: u4
      - id: pet_type
        type: u4
      - id: name
        type: localized_string_ref(_root.header.string_block_offset)
      - id: name_female
        type: localized_string_ref(_root.header.string_block_offset)
      - id: name_male
        type: localized_string_ref(_root.header.string_block_offset)
      - id: filename
        type: string_ref(_root.header.string_block_offset)
      - id: spell_class_set
        type: u4
      - id: flags
        type: u4
      - id: camera_id
        type: u4
      - id: expansion_id
        type: u4
