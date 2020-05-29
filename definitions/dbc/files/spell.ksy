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
      - id: category_id
        type: u4
      - id: dispel_id
        type: u4
      - id: mechanic_id
        type: u4

      - id: attributes
        type: u4
        repeat: expr
        repeat-expr: 8

      - id: stances
        type: u4
      - id: unknown1
        size: 4
      - id: stances_excluded
        type: u4
      - id: unknown2
        size: 4

      - id: targets
        type: u4
      - id: target_creature_type
        type: u4

      - id: requires_spell_focus
        type: u4
      - id: facing_caster_flags
        type: u4

      - id: caster_aura_state
        type: u4
      - id: target_aura_state
        type: u4
      - id: caster_aura_state_excluded
        type: u4
      - id: target_aura_state_excluded
        type: u4
      - id: caster_aura_spell_id
        type: u4
      - id: target_aura_spell_id
        type: u4
      - id: caster_aura_spell_excluded
        type: u4
      - id: target_aura_spell_excluded
        type: u4

      - id: casting_time_id
        type: u4
      - id: recovery_time
        type: u4
      - id: category_recovery_time
        type: u4
      - id: interrupt_flags
        type: u4
      - id: aura_interrupt_flags
        type: u4
      - id: channel_interrupt_flags
        type: u4
      - id: proc_flags
        type: u4
      - id: proc_chance
        type: u4
      - id: proc_charges
        type: u4
      - id: max_level
        type: u4
      - id: base_level
        type: u4
      - id: spell_level
        type: u4
      - id: duration_id
        type: u4
      - id: power_type
        type: u4
      - id: mana_cost
        type: u4
      - id: mana_cost_per_level
        type: u4
      - id: mana_per_second
        type: u4
      - id: mana_per_second_per_level
        type: u4
      - id: range_id
        type: u4
      - id: speed
        type: f4
      - id: modal_next_spell
        type: u4
      - id: stack_amount
        type: u4

      - id: totem_ids
        type: u4
        repeat: expr
        repeat-expr: 2
      - id: reagent_ids
        type: u4
        repeat: expr
        repeat-expr: 8
      - id: reagent_counts
        type: u4
        repeat: expr
        repeat-expr: 8

      - id: equipped_item_class_id
        type: s4
      - id: equipped_item_sub_class_mask
        type: s4
      - id: equipped_item_inventory_type_mask
        type: s4

      - id: effect_ids
        type: u4
        repeat: expr
        repeat-expr: 3
      - id: effect_die_sides
        type: s4
        repeat: expr
        repeat-expr: 3
      - id: effect_real_points_per_level
        type: f4
        repeat: expr
        repeat-expr: 3
      - id: effect_base_points
        type: s4
        repeat: expr
        repeat-expr: 3
      - id: effect_mechanic_ids
        type: u4
        repeat: expr
        repeat-expr: 3
      - id: effect_implicit_targets
        type: u4
        repeat: expr
        repeat-expr: 6
      - id: effect_radius_ids
        type: u4
        repeat: expr
        repeat-expr: 3
      - id: effect_auras_ids
        type: u4
        repeat: expr
        repeat-expr: 3
      - id: effect_amplitudes
        type: u4
        repeat: expr
        repeat-expr: 3
      - id: effect_proc_values
        type: f4
        repeat: expr
        repeat-expr: 3
      - id: effect_chain_targets
        type: u4
        repeat: expr
        repeat-expr: 3
      - id: effect_item_types
        type: u4
        repeat: expr
        repeat-expr: 3
      - id: effect_misc_values
        type: f4
        repeat: expr
        repeat-expr: 6
      - id: effect_trigger_spells
        type: u4
        repeat: expr
        repeat-expr: 3
      - id: effect_points_per_combo_point
        type: f4
        repeat: expr
        repeat-expr: 3
      - id: effect_spell_class_masks
        type: u4
        repeat: expr
        repeat-expr: 9

      - id: visual_ids
        type: u4
        repeat: expr
        repeat-expr: 2
      - id: icon_id
        type: u4
      - id: active_icon_id
        type: u4

      - id: priority
        type: u4
      - id: name
        type: localized_string_ref(_root.header.string_block_offset)
      - id: rank
        type: localized_string_ref(_root.header.string_block_offset)
      - id: description
        type: localized_string_ref(_root.header.string_block_offset)
      - id: tool_tip
        type: localized_string_ref(_root.header.string_block_offset)

      - id: mana_cost_percentage
        type: u4
      - id: start_recovery_category
        type: u4
      - id: start_recovery_time
        type: u4
      - id: max_target_level
        type: u4
      - id: family_name
        type: u4
      - id: family_flags
        type: u4
        repeat: expr
        repeat-expr: 3

      - id: max_affected_targets
        type: u4
      - id: damage_class
        type: u4
      - id: prevention_type
        type: u4
      - id: stance_bar_order
        type: u4
      - id: damage_multiplier
        type: f4
        repeat: expr
        repeat-expr: 3
      - id: min_faction_id
        type: u4
      - id: min_reputation
        type: u4
      - id: required_aura_vision
        type: u4
      - id: totem_category_ids
        type: u4
        repeat: expr
        repeat-expr: 2
      - id: area_group_id
        type: s4
      - id: school_mask
        type: u4
      - id: rune_cost_id
        type: u4
      - id: spell_missile_id
        type: u4
      - id: power_display_id
        type: u4
      - id: effect_bonus_multipliers
        type: f4
        repeat: expr
        repeat-expr: 3

      - id: spell_description_variable_id
        type: u4
      - id: spell_difficulty_id
        type: u4
