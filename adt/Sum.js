(f => {

  'use strict';

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f (require ('sanctuary-def'),
                        require ('sanctuary-show'),
                        require ('sanctuary-type-classes'),
                        require ('sanctuary-type-identifiers'));
  } else {
    self.Sum = f (self.sanctuaryDef,
                  self.sanctuaryShow,
                  self.sanctuaryTypeClasses,
                  self.sanctuaryTypeIdentifiers);
  }

}) (($, show, Z, type) => {

  'use strict';

  //  Sum :: Number -> Sum
  function Sum(value) {
    if (!(this instanceof Sum)) return new Sum (value);
    this.value = value;
  }

  //  sumTypeIdent :: String
  const sumTypeIdent = Sum.prototype['@@type'] = 'sanctuary-site/Sum';

  Sum['fantasy-land/empty'] = () => Sum (0);

  Sum.prototype['fantasy-land/equals'] = function(other) {
    return Z.equals (this.value, other.value);
  };

  Sum.prototype['fantasy-land/concat'] = function(other) {
    return Sum (this.value + other.value);
  };

  Sum.prototype['fantasy-land/invert'] = function() {
    return Sum (-this.value);
  };

  Sum.prototype['@@show'] = function() {
    return 'Sum (' + show (this.value) + ')';
  };

  //  Sum.Type :: Type
  Sum.Type = $.NullaryType
    ('Sum')
    ('https://github.com/sanctuary-js/sanctuary-site/blob/gh-pages/adt/Sum.js')
    ([])
    (x => type (x) === sumTypeIdent);

  return Sum;

});
