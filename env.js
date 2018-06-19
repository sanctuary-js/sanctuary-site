/* global module:false, require:false, self:false */

(function(f) {

  'use strict';

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f (require ('sanctuary'),
                        require ('sanctuary-def'),
                        require ('sanctuary-descending'),
                        require ('sanctuary-identity'),
                        require ('sanctuary-type-classes'),
                        require ('sanctuary-type-identifiers'),
                        require ('./adt/Html.js'),
                        require ('./adt/List.js'),
                        require ('./adt/Sum.js'));
  } else {
    self.env = f (self.sanctuary,
                  self.sanctuaryDef,
                  self.sanctuaryDescending,
                  self.sanctuaryIdentity,
                  self.sanctuaryTypeClasses,
                  self.sanctuaryTypeIdentifiers,
                  self.Html,
                  self.List,
                  self.Sum);
  }

} (function(S, $, Descending, Identity, Z, type, Html, List, Sum) {

  'use strict';

  //  toArray :: Foldable f => f a -> Array a
  function toArray(foldable) {
    return Z.reduce (function(xs, x) { xs.push (x); return xs; },
                     [],
                     foldable);
  }

  //  typeEq :: String -> a -> Boolean
  function typeEq(typeIdent) {
    return function(x) {
      return type (x) === typeIdent;
    };
  }

  //  DescendingType :: Type -> Type
  var DescendingType = $.UnaryType
    ('sanctuary-descending/Descending')
    ('https://github.com/sanctuary-js/sanctuary-descending')
    (typeEq (Descending['@@type']))
    (toArray);

  //  IdentityType :: Type -> Type
  var IdentityType = $.UnaryType
    ('sanctuary-identity/Identity')
    ('https://github.com/sanctuary-js/sanctuary-identity')
    (typeEq (Identity['@@type']))
    (toArray);

  //  ListType :: Type -> Type
  var ListType = $.UnaryType
    ('sanctuary-site/List')
    ('https://github.com/sanctuary-js/sanctuary-site/blob/gh-pages/adt/List.js')
    (typeEq (List['@@type']))
    (toArray);

  //  SumType :: Type
  var SumType = $.NullaryType
    ('sanctuary-site/Sum')
    ('https://github.com/sanctuary-js/sanctuary-site/blob/gh-pages/adt/Sum.js')
    (typeEq (Sum['@@type']));

  return S.env.concat ([
    DescendingType ($.Unknown),
    Html.Type,
    IdentityType ($.Unknown),
    ListType ($.Unknown),
    SumType
  ]);

}));
