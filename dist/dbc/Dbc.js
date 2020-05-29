// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream', './Header'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'), require('./Header'));
  } else {
    root.Dbc = factory(root.KaitaiStream, root.Header);
  }
}(this, function (KaitaiStream, Header) {
var Dbc = (function() {
  function Dbc(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  Dbc.prototype._read = function() {
    this.header = new Header(this._io, this, null);
    this.records = new Array(this.header.recordCount);
    for (var i = 0; i < this.header.recordCount; i++) {
      this.records[i] = new Record(this._io, this, this._root);
    }
  }

  var Record = Dbc.Record = (function() {
    function Record(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Record.prototype._read = function() {
      this.fields = new Array(this._root.header.fieldCount);
      for (var i = 0; i < this._root.header.fieldCount; i++) {
        this.fields[i] = this._io.readU4le();
      }
    }

    return Record;
  })();

  return Dbc;
})();
return Dbc;
}));
