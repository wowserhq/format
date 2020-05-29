// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.Header = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var Header = (function() {
  function Header(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  Header.prototype._read = function() {
    this.magic = this._io.readBytes(4);
    if (!((KaitaiStream.byteArrayCompare(this.magic, [87, 68, 66, 67]) == 0))) {
      throw new KaitaiStream.ValidationNotEqualError([87, 68, 66, 67], this.magic, this._io, "/seq/0");
    }
    this.recordCount = this._io.readU4le();
    this.fieldCount = this._io.readU4le();
    this.recordSize = this._io.readU4le();
    this.stringBlockSize = this._io.readU4le();
  }
  Object.defineProperty(Header.prototype, 'stringBlockOffset', {
    get: function() {
      if (this._m_stringBlockOffset !== undefined)
        return this._m_stringBlockOffset;
      this._m_stringBlockOffset = ((5 * 4) + (this.recordCount * this.recordSize));
      return this._m_stringBlockOffset;
    }
  });

  return Header;
})();
return Header;
}));
