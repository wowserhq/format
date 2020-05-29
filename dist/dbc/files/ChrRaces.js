// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream', './../StringRef', './../Header', './../LocalizedStringRef'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'), require('./../StringRef'), require('./../Header'), require('./../LocalizedStringRef'));
  } else {
    root.ChrRaces = factory(root.KaitaiStream, root.StringRef, root.Header, root.LocalizedStringRef);
  }
}(this, function (KaitaiStream, StringRef, Header, LocalizedStringRef) {
var ChrRaces = (function() {
  function ChrRaces(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  ChrRaces.prototype._read = function() {
    this.header = new Header(this._io, this, null);
    this.records = new Array(this.header.recordCount);
    for (var i = 0; i < this.header.recordCount; i++) {
      this.records[i] = new Record(this._io, this, this._root);
    }
  }

  var Record = ChrRaces.Record = (function() {
    function Record(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Record.prototype._read = function() {
      this.id = this._io.readU4le();
      this.flags = this._io.readU4le();
      this.factionId = this._io.readU4le();
      this.explorationSoundId = this._io.readU4le();
      this.maleDisplayId = this._io.readU4le();
      this.femaleDisplayId = this._io.readU4le();
      this.clientPrefix = new StringRef(this._io, this, null, this._root.header.stringBlockOffset);
      this.skip = this._io.readBytes(4);
      this.baseLanguage = this._io.readU4le();
      this.resSicknessSpellId = this._io.readU4le();
      this.splashSoundId = this._io.readU4le();
      this.clientFileString = new StringRef(this._io, this, null, this._root.header.stringBlockOffset);
      this.cinematicSequenceId = this._io.readU4le();
      this.faction = this._io.readU4le();
      this.name = new LocalizedStringRef(this._io, this, null, this._root.header.stringBlockOffset);
      this.nameFemale = new LocalizedStringRef(this._io, this, null, this._root.header.stringBlockOffset);
      this.nameMale = new LocalizedStringRef(this._io, this, null, this._root.header.stringBlockOffset);
      this.facialHairCustomization = new StringRef(this._io, this, null, this._root.header.stringBlockOffset);
      this.facialHairCustomization2 = new StringRef(this._io, this, null, this._root.header.stringBlockOffset);
      this.hairCustomization = new StringRef(this._io, this, null, this._root.header.stringBlockOffset);
      this.expansionId = this._io.readU4le();
    }

    return Record;
  })();

  return ChrRaces;
})();
return ChrRaces;
}));
