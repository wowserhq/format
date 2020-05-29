meta:
  id: chr_races
  file-extension: ChrRaces.dbc
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
      - id: flags
        type: u4

      - id: faction_id
        type: u4
      - id: exploration_sound_id
        type: u4
      - id: male_display_id
        type: u4
      - id: female_display_id
        type: u4

      - id: client_prefix
        type: string_ref(_root.header.string_block_offset)

      - id: skip
        size: 4

      - id: base_language
        type: u4
      - id: res_sickness_spell_id
        type: u4
      - id: splash_sound_id
        type: u4
      - id: client_file_string
        type: string_ref(_root.header.string_block_offset)
      - id: cinematic_sequence_id
        type: u4
      - id: faction
        type: u4

      - id: name
        type: localized_string_ref(_root.header.string_block_offset)
      - id: name_female
        type: localized_string_ref(_root.header.string_block_offset)
      - id: name_male
        type: localized_string_ref(_root.header.string_block_offset)

      - id: facial_hair_customization
        type: string_ref(_root.header.string_block_offset)
      - id: facial_hair_customization2
        type: string_ref(_root.header.string_block_offset)
      - id: hair_customization
        type: string_ref(_root.header.string_block_offset)

      - id: expansion_id
        type: u4
