(function(f) {

  'use strict';

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f (require ('sanctuary-show'),
                        require ('sanctuary-type-classes'));
  } else {
    self.Sum = f (self.sanctuaryShow, self.sanctuaryTypeClasses);
  }

} (function(show, Z) {

  'use strict';

  //  Sum :: Number -> Sum
  function Sum(value) {
    if (!(this instanceof Sum)) return new Sum (value);
    this.value = value;
  }

  Sum['@@type'] = 'sanctuary-site/Sum';

  Sum['fantasy-land/empty'] = function() { return Sum (0); };

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

  return Sum;

}));
