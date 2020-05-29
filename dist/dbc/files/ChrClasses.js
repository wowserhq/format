// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream', './../StringRef', './../Header', './../LocalizedStringRef'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'), require('./../StringRef'), require('./../Header'), require('./../LocalizedStringRef'));
  } else {
    root.ChrClasses = factory(root.KaitaiStream, root.StringRef, root.Header, root.LocalizedStringRef);
  }
}(this, function (KaitaiStream, StringRef, Header, LocalizedStringRef) {
var ChrClasses = (function() {
  function ChrClasses(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  ChrClasses.prototype._read = function() {
    this.header = new Header(this._io, this, null);
    this.records = new Array(this.header.recordCount);
    for (var i = 0; i < this.header.recordCount; i++) {
      this.records[i] = new Record(this._io, this, this._root);
    }
  }

  var Record = ChrClasses.Record = (function() {
    function Record(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Record.prototype._read = function() {
      this.id = this._io.readU4le();
      this.unk1 = this._io.readU4le();
      this.powerType = this._io.readU4le();
      this.petType = this._io.readU4le();
      this.name = new LocalizedStringRef(this._io, this, null, this._root.header.stringBlockOffset);
      this.nameFemale = new LocalizedStringRef(this._io, this, null, this._root.header.stringBlockOffset);
      this.nameMale = new LocalizedStringRef(this._io, this, null, this._root.header.stringBlockOffset);
      this.filename = new StringRef(this._io, this, null, this._root.header.stringBlockOffset);
      this.spellClassSet = this._io.readU4le();
      this.flags = this._io.readU4le();
      this.cameraId = this._io.readU4le();
      this.expansionId = this._io.readU4le();
    }

    return Record;
  })();

  return ChrClasses;
})();
return ChrClasses;
}));
