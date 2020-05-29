// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.StringRef = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var StringRef = (function() {
  function StringRef(_io, _parent, _root, stringBlockOffset) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;
    this.stringBlockOffset = stringBlockOffset;

    this._read();
  }
  StringRef.prototype._read = function() {
    this.offset = this._io.readU4le();
  }
  Object.defineProperty(StringRef.prototype, 'value', {
    get: function() {
      if (this._m_value !== undefined)
        return this._m_value;
      var _pos = this._io.pos;
      this._io.seek((this.stringBlockOffset + this.offset));
      this._m_value = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "utf8");
      this._io.seek(_pos);
      return this._m_value;
    }
  });

  return StringRef;
})();
return StringRef;
}));
