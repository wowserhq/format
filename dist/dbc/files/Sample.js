// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream', './../StringRef', './../Header', './../LocalizedStringRef'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'), require('./../StringRef'), require('./../Header'), require('./../LocalizedStringRef'));
  } else {
    root.Sample = factory(root.KaitaiStream, root.StringRef, root.Header, root.LocalizedStringRef);
  }
}(this, function (KaitaiStream, StringRef, Header, LocalizedStringRef) {
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
      this.name = new StringRef(this._io, this, null, this._root.header.stringBlockOffset);
      this.localizedName = new LocalizedStringRef(this._io, this, null, this._root.header.stringBlockOffset);
      this.points = this._io.readS4le();
      this.height = this._io.readF4le();
    }

    return Record;
  })();

  return Sample;
})();
return Sample;
}));
