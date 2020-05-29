// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream', './../Header', './../LocalizedStringRef'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'), require('./../Header'), require('./../LocalizedStringRef'));
  } else {
    root.Sample = factory(root.KaitaiStream, root.Header, root.LocalizedStringRef);
  }
}(this, function (KaitaiStream, Header, LocalizedStringRef) {
var Sample = (function() {
  function Sample(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  Sample.prototype._read = function() {
    this.header = new Header(this._io, this, null);
    this.records = new Array(this.header.recordCount);
    for (var i = 0; i < this.header.recordCount; i++) {
      this.records[i] = new Record(this._io, this, this._root);
    }
  }

  var Record = Sample.Record = (function() {
    function Record(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Record.prototype._read = function() {
      this.id = this._io.readU4le();
      this.categoryId = this._io.readU4le();
      this.dispelId = this._io.readU4le();
      this.mechanicId = this._io.readU4le();
      this.attributes = new Array(8);
      for (var i = 0; i < 8; i++) {
        this.attributes[i] = this._io.readU4le();
      }
      this.stances = this._io.readU4le();
      this.unknown1 = this._io.readBytes(4);
      this.stancesExcluded = this._io.readU4le();
      this.unknown2 = this._io.readBytes(4);
      this.targets = this._io.readU4le();
      this.targetCreatureType = this._io.readU4le();
      this.requiresSpellFocus = this._io.readU4le();
      this.facingCasterFlags = this._io.readU4le();
      this.casterAuraState = this._io.readU4le();
      this.targetAuraState = this._io.readU4le();
      this.casterAuraStateExcluded = this._io.readU4le();
      this.targetAuraStateExcluded = this._io.readU4le();
      this.casterAuraSpellId = this._io.readU4le();
      this.targetAuraSpellId = this._io.readU4le();
      this.casterAuraSpellExcluded = this._io.readU4le();
      this.targetAuraSpellExcluded = this._io.readU4le();
      this.castingTimeId = this._io.readU4le();
      this.recoveryTime = this._io.readU4le();
      this.categoryRecoveryTime = this._io.readU4le();
      this.interruptFlags = this._io.readU4le();
      this.auraInterruptFlags = this._io.readU4le();
      this.channelInterruptFlags = this._io.readU4le();
      this.procFlags = this._io.readU4le();
      this.procChance = this._io.readU4le();
      this.procCharges = this._io.readU4le();
      this.maxLevel = this._io.readU4le();
      this.baseLevel = this._io.readU4le();
      this.spellLevel = this._io.readU4le();
      this.durationId = this._io.readU4le();
      this.powerType = this._io.readU4le();
      this.manaCost = this._io.readU4le();
      this.manaCostPerLevel = this._io.readU4le();
      this.manaPerSecond = this._io.readU4le();
      this.manaPerSecondPerLevel = this._io.readU4le();
      this.rangeId = this._io.readU4le();
      this.speed = this._io.readF4le();
      this.modalNextSpell = this._io.readU4le();
      this.stackAmount = this._io.readU4le();
      this.totemIds = new Array(2);
      for (var i = 0; i < 2; i++) {
        this.totemIds[i] = this._io.readU4le();
      }
      this.reagentIds = new Array(8);
      for (var i = 0; i < 8; i++) {
        this.reagentIds[i] = this._io.readU4le();
      }
      this.reagentCounts = new Array(8);
      for (var i = 0; i < 8; i++) {
        this.reagentCounts[i] = this._io.readU4le();
      }
      this.equippedItemClassId = this._io.readS4le();
      this.equippedItemSubClassMask = this._io.readS4le();
      this.equippedItemInventoryTypeMask = this._io.readS4le();
      this.effectIds = new Array(3);
      for (var i = 0; i < 3; i++) {
        this.effectIds[i] = this._io.readU4le();
      }
      this.effectDieSides = new Array(3);
      for (var i = 0; i < 3; i++) {
        this.effectDieSides[i] = this._io.readS4le();
      }
      this.effectRealPointsPerLevel = new Array(3);
      for (var i = 0; i < 3; i++) {
        this.effectRealPointsPerLevel[i] = this._io.readF4le();
      }
      this.effectBasePoints = new Array(3);
      for (var i = 0; i < 3; i++) {
        this.effectBasePoints[i] = this._io.readS4le();
      }
      this.effectMechanicIds = new Array(3);
      for (var i = 0; i < 3; i++) {
        this.effectMechanicIds[i] = this._io.readU4le();
      }
      this.effectImplicitTargets = new Array(6);
      for (var i = 0; i < 6; i++) {
        this.effectImplicitTargets[i] = this._io.readU4le();
      }
      this.effectRadiusIds = new Array(3);
      for (var i = 0; i < 3; i++) {
        this.effectRadiusIds[i] = this._io.readU4le();
      }
      this.effectAurasIds = new Array(3);
      for (var i = 0; i < 3; i++) {
        this.effectAurasIds[i] = this._io.readU4le();
      }
      this.effectAmplitudes = new Array(3);
      for (var i = 0; i < 3; i++) {
        this.effectAmplitudes[i] = this._io.readU4le();
      }
      this.effectProcValues = new Array(3);
      for (var i = 0; i < 3; i++) {
        this.effectProcValues[i] = this._io.readF4le();
      }
      this.effectChainTargets = new Array(3);
      for (var i = 0; i < 3; i++) {
        this.effectChainTargets[i] = this._io.readU4le();
      }
      this.effectItemTypes = new Array(3);
      for (var i = 0; i < 3; i++) {
        this.effectItemTypes[i] = this._io.readU4le();
      }
      this.effectMiscValues = new Array(6);
      for (var i = 0; i < 6; i++) {
        this.effectMiscValues[i] = this._io.readF4le();
      }
      this.effectTriggerSpells = new Array(3);
      for (var i = 0; i < 3; i++) {
        this.effectTriggerSpells[i] = this._io.readU4le();
      }
      this.effectPointsPerComboPoint = new Array(3);
      for (var i = 0; i < 3; i++) {
        this.effectPointsPerComboPoint[i] = this._io.readF4le();
      }
      this.effectSpellClassMasks = new Array(9);
      for (var i = 0; i < 9; i++) {
        this.effectSpellClassMasks[i] = this._io.readU4le();
      }
      this.visualIds = new Array(2);
      for (var i = 0; i < 2; i++) {
        this.visualIds[i] = this._io.readU4le();
      }
      this.iconId = this._io.readU4le();
      this.activeIconId = this._io.readU4le();
      this.priority = this._io.readU4le();
      this.name = new LocalizedStringRef(this._io, this, null, this._root.header.stringBlockOffset);
      this.rank = new LocalizedStringRef(this._io, this, null, this._root.header.stringBlockOffset);
      this.description = new LocalizedStringRef(this._io, this, null, this._root.header.stringBlockOffset);
      this.toolTip = new LocalizedStringRef(this._io, this, null, this._root.header.stringBlockOffset);
      this.manaCostPercentage = this._io.readU4le();
      this.startRecoveryCategory = this._io.readU4le();
      this.startRecoveryTime = this._io.readU4le();
      this.maxTargetLevel = this._io.readU4le();
      this.familyName = this._io.readU4le();
      this.familyFlags = new Array(3);
      for (var i = 0; i < 3; i++) {
        this.familyFlags[i] = this._io.readU4le();
      }
      this.maxAffectedTargets = this._io.readU4le();
      this.damageClass = this._io.readU4le();
      this.preventionType = this._io.readU4le();
      this.stanceBarOrder = this._io.readU4le();
      this.damageMultiplier = new Array(3);
      for (var i = 0; i < 3; i++) {
        this.damageMultiplier[i] = this._io.readF4le();
      }
      this.minFactionId = this._io.readU4le();
      this.minReputation = this._io.readU4le();
      this.requiredAuraVision = this._io.readU4le();
      this.totemCategoryIds = new Array(2);
      for (var i = 0; i < 2; i++) {
        this.totemCategoryIds[i] = this._io.readU4le();
      }
      this.areaGroupId = this._io.readS4le();
      this.schoolMask = this._io.readU4le();
      this.runeCostId = this._io.readU4le();
      this.spellMissileId = this._io.readU4le();
      this.powerDisplayId = this._io.readU4le();
      this.effectBonusMultipliers = new Array(3);
      for (var i = 0; i < 3; i++) {
        this.effectBonusMultipliers[i] = this._io.readF4le();
      }
      this.spellDescriptionVariableId = this._io.readU4le();
      this.spellDifficultyId = this._io.readU4le();
    }

    return Record;
  })();

  return Sample;
})();
return Sample;
}));
