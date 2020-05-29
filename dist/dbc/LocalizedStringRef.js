// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream', './StringRef'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'), require('./StringRef'));
  } else {
    root.LocalizedStringRef = factory(root.KaitaiStream, root.StringRef);
  }
}(this, function (KaitaiStream, StringRef) {
var LocalizedStringRef = (function() {
  function LocalizedStringRef(_io, _parent, _root, stringBlockOffset) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;
    this.stringBlockOffset = stringBlockOffset;

    this._read();
  }
  LocalizedStringRef.prototype._read = function() {
    this.enUs = new StringRef(this._io, this, null, this.stringBlockOffset);
    this.koKr = new StringRef(this._io, this, null, this.stringBlockOffset);
    this.frFr = new StringRef(this._io, this, null, this.stringBlockOffset);
    this.deDe = new StringRef(this._io, this, null, this.stringBlockOffset);
    this.enCn = new StringRef(this._io, this, null, this.stringBlockOffset);
    this.enTw = new StringRef(this._io, this, null, this.stringBlockOffset);
    this.esEs = new StringRef(this._io, this, null, this.stringBlockOffset);
    this.esMx = new StringRef(this._io, this, null, this.stringBlockOffset);
    this.ruRu = new StringRef(this._io, this, null, this.stringBlockOffset);
    this.ptPt = new StringRef(this._io, this, null, this.stringBlockOffset);
    this.itIt = new StringRef(this._io, this, null, this.stringBlockOffset);
    this.masks = new Array(6);
    for (var i = 0; i < 6; i++) {
      this.masks[i] = this._io.readU4le();
    }
  }
  Object.defineProperty(LocalizedStringRef.prototype, 'value', {
    get: function() {
      if (this._m_value !== undefined)
        return this._m_value;
      this._m_value = this.enUs.value;
      return this._m_value;
    }
  });

  return LocalizedStringRef;
})();
return LocalizedStringRef;
}));
