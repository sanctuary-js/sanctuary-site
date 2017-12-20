(function(f) {

  'use strict';

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f(require('sanctuary-def'),
                       require('sanctuary-type-classes'),
                       require('sanctuary-type-identifiers'));
  } else {
    self.Sum = f(self.sanctuaryDef,
                 self.sanctuaryTypeClasses,
                 self.sanctuaryTypeIdentifiers);
  }

}(function($, Z, type) {

  'use strict';

  //  Sum :: Number -> Sum
  function Sum(value) {
    if (!(this instanceof Sum)) return new Sum(value);
    this.value = value;
  }

  Sum['@@type'] = 'sanctuary-site/Sum';

  //  Type :: Type
  Sum.Type = $.NullaryType(
    Sum['@@type'],
    '',
    function(x) { return type(x) === Sum['@@type']; }
  );

  Sum['fantasy-land/empty'] = function() { return Sum(0); };

  Sum.prototype['fantasy-land/equals'] = function(other) {
    return Z.equals(this.value, other.value);
  };

  Sum.prototype['fantasy-land/concat'] = function(other) {
    return Sum(this.value + other.value);
  };

  Sum.prototype['fantasy-land/invert'] = function() {
    return Sum(-this.value);
  };

  Sum.prototype.inspect =
  Sum.prototype.toString = function() {
    return 'Sum(' + Z.toString(this.value) + ')';
  };

  return Sum;

}));
