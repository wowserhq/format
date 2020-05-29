// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.StringBlock = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var StringBlock = (function() {
  function StringBlock(_io, _parent, _root, offset) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;
    this.offset = offset;

    this._read();
  }
  StringBlock.prototype._read = function() {
    this.strings = [];
    var i = 0;
    while (!this._io.isEof()) {
      this.strings.push(KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "utf8"));
      i++;
    }
  }

  return StringBlock;
})();
return StringBlock;
}));
