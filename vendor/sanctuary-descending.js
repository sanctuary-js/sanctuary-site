/*        ||||
          ||||
          ||||
          ||||
    \\\\  ||||  ////
     \\\\ |||| ////
      \\\\||||////
       \\\\||////
        \\\\////
         \\\///
          \\//
           \/         */

//. <a href="https://github.com/fantasyland/fantasy-land"><img alt="Fantasy Land" src="https://raw.githubusercontent.com/fantasyland/fantasy-land/master/logo.png" width="75" height="75" align="left"></a>
//.
//. # sanctuary-descending
//.
//. Descending is a simple container type: a value of type `Descending a`
//. always contains exactly one value, of type `a`.
//.
//. Values of type `Descending a` sort in the reverse order of values of
//. type `a`.
//.
//. Descending differs from [Identity][] only in the behaviour of its
//. `fantasy-land/lte` method.

(function(f) {

  'use strict';

  var util = {inspect: {}};

  /* istanbul ignore else */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f (require ('util'),
                        require ('sanctuary-show'),
                        require ('sanctuary-type-classes'));
  } else if (typeof define === 'function' && define.amd != null) {
    define (['sanctuary-show', 'sanctuary-type-classes'], function(show, Z) {
      return f (util, show, Z);
    });
  } else {
    self.sanctuaryDescending = f (util,
                                  self.sanctuaryShow,
                                  self.sanctuaryTypeClasses);
  }

} (function(util, show, Z) {

  'use strict';

  /* istanbul ignore if */
  if (typeof __doctest !== 'undefined') {
    /* eslint-disable no-unused-vars */
    var S = __doctest.require ('sanctuary');
    var $ = __doctest.require ('sanctuary-def');
    var type = __doctest.require ('sanctuary-type-identifiers');
    /* eslint-enable no-unused-vars */
  }

  var descendingTypeIdent = 'sanctuary-descending/Descending@1';

  var prototype = {
    /* eslint-disable key-spacing */
    'constructor':            Descending,
    '@@type':                 descendingTypeIdent,
    '@@show':                 Descending$prototype$show,
    'fantasy-land/map':       Descending$prototype$map,
    'fantasy-land/ap':        Descending$prototype$ap,
    'fantasy-land/chain':     Descending$prototype$chain,
    'fantasy-land/reduce':    Descending$prototype$reduce,
    'fantasy-land/traverse':  Descending$prototype$traverse,
    'fantasy-land/extend':    Descending$prototype$extend,
    'fantasy-land/extract':   Descending$prototype$extract
    /* eslint-enable key-spacing */
  };

  var custom = util.inspect.custom;
  /* istanbul ignore else */
  if (typeof custom === 'symbol') {
    prototype[custom] = Descending$prototype$show;
  } else {
    prototype.inspect = Descending$prototype$show;
  }

  //. ```javascript
  //. > S.sort ([5, 1, 2])
  //. [1, 2, 5]
  //.
  //. > S.sort ([Descending (5), Descending (1), Descending (2)])
  //. [Descending (5), Descending (2), Descending (1)]
  //.
  //. > S.sortBy (Descending) ([5, 1, 2])
  //. [5, 2, 1]
  //. ```
  //.
  //. `Descending a` satisfies the following [Fantasy Land][] specifications:
  //.
  //. ```javascript
  //. > const Useless = require ('sanctuary-useless')
  //.
  //. > const isTypeClass = x =>
  //. .   type (x) === 'sanctuary-type-classes/TypeClass@1'
  //.
  //. > S.map (k => k + ' '.repeat (16 - k.length) +
  //. .             (Z[k].test (Descending (Useless)) ? '\u2705   ' :
  //. .              Z[k].test (Descending (['foo'])) ? '\u2705 * ' :
  //. .              /* otherwise */                    '\u274C   '))
  //. .       (S.keys (S.unchecked.filter (isTypeClass) (Z)))
  //. [ 'Setoid          ✅ * ',  // if ‘a’ satisfies Setoid
  //. . 'Ord             ✅ * ',  // if ‘a’ satisfies Ord
  //. . 'Semigroupoid    ❌   ',
  //. . 'Category        ❌   ',
  //. . 'Semigroup       ✅ * ',  // if ‘a’ satisfies Semigroup
  //. . 'Monoid          ❌   ',
  //. . 'Group           ❌   ',
  //. . 'Filterable      ❌   ',
  //. . 'Functor         ✅   ',
  //. . 'Bifunctor       ❌   ',
  //. . 'Profunctor      ❌   ',
  //. . 'Apply           ✅   ',
  //. . 'Applicative     ✅   ',
  //. . 'Chain           ✅   ',
  //. . 'ChainRec        ✅   ',
  //. . 'Monad           ✅   ',
  //. . 'Alt             ❌   ',
  //. . 'Plus            ❌   ',
  //. . 'Alternative     ❌   ',
  //. . 'Foldable        ✅   ',
  //. . 'Traversable     ✅   ',
  //. . 'Extend          ✅   ',
  //. . 'Comonad         ✅   ',
  //. . 'Contravariant   ❌   ' ]
  //. ```

  //# Descending :: a -> Descending a
  //.
  //. Descending's sole data constructor. Additionally, it serves as the
  //. Descending [type representative][].
  //.
  //. ```javascript
  //. > Descending (42)
  //. Descending (42)
  //. ```
  function Descending(value) {
    var descending = Object.create (prototype);
    if (Z.Setoid.test (value)) {
      descending['fantasy-land/equals'] = Descending$prototype$equals;
      if (Z.Ord.test (value)) {
        descending['fantasy-land/lte'] = Descending$prototype$lte;
      }
    }
    if (Z.Semigroup.test (value)) {
      descending['fantasy-land/concat'] = Descending$prototype$concat;
    }
    descending.value = value;
    return descending;
  }

  //# Descending.fantasy-land/of :: a -> Descending a
  //.
  //. `of (Descending) (x)` is equivalent to `Descending (x)`.
  //.
  //. ```javascript
  //. > S.of (Descending) (42)
  //. Descending (42)
  //. ```
  Descending['fantasy-land/of'] = Descending;

  function next(x) { return {tag: next, value: x}; }
  function done(x) { return {tag: done, value: x}; }

  //# Descending.fantasy-land/chainRec :: ((a -> c, b -> c, a) -> Descending c, a) -> Descending b
  //.
  //. ```javascript
  //. > Z.chainRec (
  //. .   Descending,
  //. .   (next, done, x) => Descending (x >= 0 ? done (x * x) : next (x + 1)),
  //. .   8
  //. . )
  //. Descending (64)
  //.
  //. > Z.chainRec (
  //. .   Descending,
  //. .   (next, done, x) => Descending (x >= 0 ? done (x * x) : next (x + 1)),
  //. .   -8
  //. . )
  //. Descending (0)
  //. ```
  Descending['fantasy-land/chainRec'] = function(f, x) {
    var r = next (x);
    while (r.tag === next) r = (f (next, done, r.value)).value;
    return Descending (r.value);
  };

  //# Descending#@@show :: Showable a => Descending a ~> () -> String
  //.
  //. `show (Descending (x))` is equivalent to
  //. `'Descending (' + show (x) + ')'`.
  //.
  //. ```javascript
  //. > show (Descending (['foo', 'bar', 'baz']))
  //. 'Descending (["foo", "bar", "baz"])'
  //. ```
  function Descending$prototype$show() {
    return 'Descending (' + show (this.value) + ')';
  }

  //# Descending#fantasy-land/equals :: Setoid a => Descending a ~> Descending a -> Boolean
  //.
  //. `Descending (x)` is equal to `Descending (y)` [iff][] `x` is equal to `y`
  //. according to [`Z.equals`][].
  //.
  //. ```javascript
  //. > S.equals (Descending ([1, 2, 3])) (Descending ([1, 2, 3]))
  //. true
  //.
  //. > S.equals (Descending ([1, 2, 3])) (Descending ([3, 2, 1]))
  //. false
  //. ```
  function Descending$prototype$equals(other) {
    return Z.equals (this.value, other.value);
  }

  //# Descending#fantasy-land/lte :: Ord a => Descending a ~> Descending a -> Boolean
  //.
  //. `Descending (x)` is less than or equal to `Descending (y)` [iff][]
  //. `y` is less than or equal to `x` according to [`Z.lte`][] (note the
  //. transposition of `x` and `y`).
  //.
  //. ```javascript
  //. > S.sort ([Descending (5), Descending (1), Descending (2)])
  //. [Descending (5), Descending (2), Descending (1)]
  //. ```
  function Descending$prototype$lte(other) {
    return Z.lte (other.value, this.value);
  }

  //# Descending#fantasy-land/concat :: Semigroup a => Descending a ~> Descending a -> Descending a
  //.
  //. `concat (Descending (x)) (Descending (y))` is equivalent to
  //. `Descending (concat (x) (y))`.
  //.
  //. ```javascript
  //. > S.concat (Descending ([1, 2, 3])) (Descending ([4, 5, 6]))
  //. Descending ([1, 2, 3, 4, 5, 6])
  //. ```
  function Descending$prototype$concat(other) {
    return Descending (Z.concat (this.value, other.value));
  }

  //# Descending#fantasy-land/map :: Descending a ~> (a -> b) -> Descending b
  //.
  //. `map (f) (Descending (x))` is equivalent to `Descending (f (x))`.
  //.
  //. ```javascript
  //. > S.map (Math.sqrt) (Descending (64))
  //. Descending (8)
  //. ```
  function Descending$prototype$map(f) {
    return Descending (f (this.value));
  }

  //# Descending#fantasy-land/ap :: Descending a ~> Descending (a -> b) -> Descending b
  //.
  //. `ap (Descending (f)) (Descending (x))` is equivalent to
  //. `Descending (f (x))`.
  //.
  //. ```javascript
  //. > S.ap (Descending (Math.sqrt)) (Descending (64))
  //. Descending (8)
  //. ```
  function Descending$prototype$ap(other) {
    return Descending (other.value (this.value));
  }

  //# Descending#fantasy-land/chain :: Descending a ~> (a -> Descending b) -> Descending b
  //.
  //. `chain (f) (Descending (x))` is equivalent to `f (x)`.
  //.
  //. ```javascript
  //. > S.chain (n => Descending (n + 1)) (Descending (99))
  //. Descending (100)
  //. ```
  function Descending$prototype$chain(f) {
    return f (this.value);
  }

  //# Descending#fantasy-land/reduce :: Descending a ~> ((b, a) -> b, b) -> b
  //.
  //. `reduce (f) (x) (Descending (y))` is equivalent to `f (x) (y)`.
  //.
  //. ```javascript
  //. > S.reduce (S.concat) ([1, 2, 3]) (Descending ([4, 5, 6]))
  //. [1, 2, 3, 4, 5, 6]
  //. ```
  function Descending$prototype$reduce(f, x) {
    return f (x, this.value);
  }

  //# Descending#fantasy-land/traverse :: Applicative f => Descending a ~> (TypeRep f, a -> f b) -> f (Descending b)
  //.
  //. `traverse (_) (f) (Descending (x))` is equivalent to
  //. `map (Descending) (f (x))`.
  //.
  //. ```javascript
  //. > S.traverse (Array) (x => [x + 1, x + 2, x + 3]) (Descending (100))
  //. [Descending (101), Descending (102), Descending (103)]
  //. ```
  function Descending$prototype$traverse(typeRep, f) {
    return Z.map (Descending, f (this.value));
  }

  //# Descending#fantasy-land/extend :: Descending a ~> (Descending a -> b) -> Descending b
  //.
  //. `extend (f) (Descending (x))` is equivalent to
  //. `Descending (f (Descending (x)))`.
  //.
  //. ```javascript
  //. > S.extend (S.reduce (S.add) (1)) (Descending (99))
  //. Descending (100)
  //. ```
  function Descending$prototype$extend(f) {
    return Descending (f (this));
  }

  //# Descending#fantasy-land/extract :: Descending a ~> () -> a
  //.
  //. `extract (Descending (x))` is equivalent to `x`.
  //.
  //. ```javascript
  //. > S.extract (Descending (42))
  //. 42
  //. ```
  function Descending$prototype$extract() {
    return this.value;
  }

  return Descending;

}));

//. [Fantasy Land]:             v:fantasyland/fantasy-land
//. [Identity]:                 https://github.com/sanctuary-js/sanctuary-identity
//. [`Z.equals`]:               v:sanctuary-js/sanctuary-type-classes#equals
//. [`Z.lte`]:                  v:sanctuary-js/sanctuary-type-classes#lte
//. [iff]:                      https://en.wikipedia.org/wiki/If_and_only_if
//. [type representative]:      v:fantasyland/fantasy-land#type-representatives
