(function(f) {

  'use strict';

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f (require ('sanctuary-def'),
                        require ('sanctuary-show'),
                        require ('sanctuary-type-classes'),
                        require ('sanctuary-type-identifiers'));
  } else {
    self.List = f (self.sanctuaryDef,
                   self.sanctuaryShow,
                   self.sanctuaryTypeClasses,
                   self.sanctuaryTypeIdentifiers);
  }

} (($, show, Z, type) => {

  'use strict';

  const List = {prototype: _List.prototype};

  List.prototype.constructor = List;

  function _List(tag, head, tail) {
    this.isCons = tag === 'Cons';
    this.isNil = tag === 'Nil';
    if (this.isCons) {
      this.head = head;
      this.tail = tail;
    }
  }

  //  Nil :: List a
  const Nil = List.Nil = new _List ('Nil');

  //  Cons :: (a, List a) -> List a
  const Cons = List.Cons = head => tail => new _List ('Cons', head, tail);

  //  listTypeIdent :: String
  const listTypeIdent = List.prototype['@@type'] = 'sanctuary-site/List';

  List['fantasy-land/empty'] = () => Nil;

  List['fantasy-land/of'] = x => Cons (x) (Nil);

  List['fantasy-land/zero'] = List['fantasy-land/empty'];

  List.prototype['fantasy-land/equals'] = function(other) {
    return this.isNil ?
      other.isNil :
      other.isCons &&
        Z.equals (this.head, other.head) &&
        Z.equals (this.tail, other.tail);
  };

  List.prototype['fantasy-land/concat'] = function(other) {
    return this.isNil ?
      other :
      Cons (this.head) (Z.concat (this.tail, other));
  };

  List.prototype['fantasy-land/map'] = function(f) {
    return this.isNil ?
      Nil :
      Cons (f (this.head)) (Z.map (f, this.tail));
  };

  List.prototype['fantasy-land/ap'] = function(other) {
    return this.isNil || other.isNil ?
      Nil :
      Z.concat (Z.map (other.head, this), Z.ap (other.tail, this));
  };

  List.prototype['fantasy-land/chain'] = function(f) {
    return this.isNil ?
      Nil :
      Z.concat (f (this.head), Z.chain (f, this.tail));
  };

  List.prototype['fantasy-land/alt'] = List.prototype['fantasy-land/concat'];

  List.prototype['fantasy-land/reduce'] = function(f, x) {
    return this.isNil ?
      x :
      Z.reduce (f, f (x, this.head), this.tail);
  };

  List.prototype['fantasy-land/traverse'] = function(typeRep, f) {
    return this.isNil ?
      Z.of (typeRep, Nil) :
      Z.ap (Z.map (Cons, f (this.head)),
            Z.traverse (typeRep, f, this.tail));
  };

  List.prototype['@@show'] = function() {
    return this.isNil ?
      'Nil' :
      'Cons (' + show (this.head) + ') (' + show (this.tail) + ')';
  };

  //  List.Type :: Type -> Type
  List.Type = $.UnaryType
    ('List')
    ('https://github.com/sanctuary-js/sanctuary-site/blob/gh-pages/adt/List.js')
    ([])
    (x => type (x) === listTypeIdent)
    (list => list);

  return List;

}));
