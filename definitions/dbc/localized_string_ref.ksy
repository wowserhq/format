meta:
  id: localized_string_ref
  endian: le
  imports:
    - string_ref
params:
  - id: string_block_offset
    type: u4
seq:
  - id: en_us
    type: string_ref(string_block_offset)
  - id: ko_kr
    type: string_ref(string_block_offset)
  - id: fr_fr
    type: string_ref(string_block_offset)
  - id: de_de
    type: string_ref(string_block_offset)
  - id: en_cn
    type: string_ref(string_block_offset)
  - id: en_tw
    type: string_ref(string_block_offset)
  - id: es_es
    type: string_ref(string_block_offset)
  - id: es_mx
    type: string_ref(string_block_offset)
  - id: ru_ru
    type: string_ref(string_block_offset)
  - id: pt_pt
    type: string_ref(string_block_offset)
  - id: it_it
    type: string_ref(string_block_offset)
  - id: masks
    type: u4
    repeat: expr
    repeat-expr: 6
instances:
  value:
    value: en_us.value
