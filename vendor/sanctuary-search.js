//
//       .@@@@@@.
//    .@@@''  ''@@@.
//   @@@'        '@@@
//  @@@'          '@@@
//  @@@   a -> b   @@@
//  @@@.          .@@@
//   @@@.        .@@@
//    '@@@..  ..@@@].
//       '@@@@@@' '[[]].
//                   '[[]].
//                      '[[]].
//                         '[[]]
//. # sanctuary-search
//.
//. This package exports a function for completely or partially matching
//. Hindley–Milner [type signatures][]. The matching algorithm is more
//. sophisticated than substring matching in several respects:
//.
//.   - whitespace is not significant (beyond its role in separating tokens);
//.   - function name searches are case-insensitive;
//.   - type variable substitution may occur, allowing `'x -> x'` to match
//.     `'I :: a -> a'`; and
//.   - incomplete types are not matched (`'s a'` does not match
//.     `'compose :: Semigroupoid s => s b c -> s a b -> s a c'`).

(function(f) {

  'use strict';

  function withoutTypeChecking(S) {
    return f (S.create ({checkTypes: false, env: S.env}));
  }

  /* istanbul ignore else */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = withoutTypeChecking (require ('sanctuary'));
  } else if (typeof define === 'function' && define.amd != null) {
    define (['sanctuary'], withoutTypeChecking);
  } else {
    self.sanctuarySearch = withoutTypeChecking (self.sanctuary);
  }

} (function(S) {

  'use strict';

  //  tokens :: StrMap Boolean
  var tokens = {
    '::': true,
    '=>': true,
    '~>': true,
    '->': true,
    '()': true,
    '{}': true,
    '(': true,
    ')': true,
    '{': true,
    '}': true,
    ',': false
  };

  //  syntax :: RegExp
  var syntax = S.pipe ([
    Object.keys,
    S.map (S.regexEscape),
    S.joinWith ('|'),
    S.concat ('('),
    S.flip (S.concat) (')'),
    S.regex ('')
  ]) (tokens);

  //  parseSignature :: String -> Maybe (Array (Pair Integer String))
  function parseSignature(signature) {
    var tokens = S.chain (S.splitOn (' ')) (signature.split (syntax));
    var context = [];
    var depth = 0;
    var result = [];
    for (var idx = 0; idx < tokens.length; idx += 1) {
      var token = tokens[idx];
      if (token === '(') {
        context.push (token);
        depth += 1;
      } else if (token === ')') {
        if (context.pop () !== '(') return S.Nothing;
        depth -= 1;
      } else if (token === '{') {
        context.push (token);
        result.push (S.Pair (depth) (token));
      } else if (token === '}') {
        if (context.pop () !== '{') return S.Nothing;
        result.push (S.Pair (depth) (token));
      } else if (token !== '') {
        result.push (S.Pair (depth) (token));
      }
    }
    if (context.length > 0) return S.Nothing;
    return S.Just (result);
  }

  //  repeat :: String -> Integer -> String
  var repeat = S.curry2 (function(s, n) {
    var result = '';
    while (result.length < n) result += s;
    return result;
  });

  //  format :: Array (Pair Integer String) -> String
  function format(pairs) {
    var s = '';
    var depth = 0;
    for (var idx = 0; idx < pairs.length; idx += 1) {
      var pair = pairs[idx];
      s += repeat (')') (depth - pair.fst) +
           (S.fromMaybe (true) (S.value (pair.snd) (tokens)) ? s && ' ' : '') +
           repeat ('(') (pair.fst - depth) +
           pair.snd;
      depth = pair.fst;
    }
    return s + repeat (')') (depth);
  }

  //  normalTokenNotShallowerThan
  //  :: Pair Integer String
  //  -> Pair Integer String
  //  -> Boolean
  function normalTokenNotShallowerThan(p1) {
    return function(p2) {
      return S.isNothing (S.value (p2.snd) (tokens)) && p2.fst >= p1.fst;
    };
  }

  //  sliceMatches
  //  :: Array (Pair Integer String)
  //  -> Array (Pair Integer String)
  //  -> Integer
  //  -> StrMap String
  //  -> Maybe (Pair (StrMap String)
  //                 (Pair (Array (Pair Integer String))
  //                       (Array (Pair Integer String))))
  var sliceMatches = S.curry4 (function(
    actualTokens,
    searchTokens,
    offset,
    typeVarMap
  ) {
    var i = offset;
    var j = offset + searchTokens.length;

    return S.chain (function(slice) {
      return S.chain (function(pair) {
        return S.chain (function(depth) {
          var b = pair.fst;
          var y = pair.snd;
          var a_ = S.chain (S.last) (S.take (i) (actualTokens));
          var z_ = S.chain (S.head) (S.drop (j) (actualTokens));
          var delta = b.fst - depth;

          return (
            delta < 0 ||

            S.isJust (S.filter (normalTokenNotShallowerThan (b)) (a_)) ||
            S.isJust (S.filter (normalTokenNotShallowerThan (y)) (z_)) ||

            depth > 0 && S.maybe (false) (S.on (S.equals) (S.fst) (b)) (a_) ||
            depth > 0 && S.maybe (false) (S.on (S.equals) (S.fst) (y)) (z_)
          ) ?
            S.Nothing :
            S.reduce (S.flip (reducer))
                     (S.Just (S.Pair (typeVarMap)
                                     (S.Pair (searchTokens)
                                             (slice))))
                     (S.zip (searchTokens) (slice));

          function reducer(pair) {
            return S.chain (function(state) {
              var typeVarMap = state.fst;
              return (
                pair.fst.fst === pair.snd.fst - delta ?
                  /^[a-z]$/.test (pair.fst.snd) ?
                    /^[a-z]$/.test (pair.snd.snd) ?
                      pair.fst.snd in typeVarMap ?
                        typeVarMap[pair.fst.snd] === pair.snd.snd ?
                          S.Just (state) :
                          S.Nothing :
                        S.elem (pair.snd.snd) (typeVarMap) ?
                          S.Nothing :
                          S.Just (S.mapLeft (S.insert (pair.fst.snd)
                                                      (pair.snd.snd))
                                            (state)) :
                      S.Nothing :
                    pair.fst.snd === pair.snd.snd ?
                      S.Just (state) :
                      S.Nothing :
                  S.Nothing
              );
            });
          }
        }) (S.map (S.fst) (S.head (searchTokens)));
      }) (S.lift2 (S.Pair) (S.head (slice)) (S.last (slice)));
    }) (S.chain (S.take (searchTokens.length))
                (S.drop (offset) (actualTokens)));
  });

  //  highlightSubstring :: (String -> String) -> String -> String -> String
  var highlightSubstring = S.curry3 (function(em, s, t) {
    return S.map (function(i) {
                    var j = i + t.length;
                    return s.slice (0, i) + em (s.slice (i, j)) + s.slice (j);
                  })
                 (S.filter (S.gte (0))
                           (S.Just ((S.toLower (s)).indexOf (S.toLower (t)))));
  });

  //  matchTokens
  //  :: (String -> String)
  //  -> Array (Pair Integer String)
  //  -> Array (Pair Integer String)
  //  -> Either String String
  var matchTokens = S.curry3 (function(em, searchTokens, actualTokens) {
    function loop(typeVarMap, offset, matches) {
      return offset === actualTokens.length ?
             matches :
             S.maybe_ (unmatched)
                      (matched)
                      (sliceMatches (actualTokens)
                                    (searchTokens)
                                    (offset)
                                    (typeVarMap));
      function unmatched() {
        return loop (typeVarMap,
                     offset + 1,
                     S.join (S.bimap)
                            (S.append (actualTokens[offset]))
                            (matches));
      }
      function matched(pair) {
        var searchTokens = pair.snd.fst;
        var slice = pair.snd.snd;
        var depth = slice[0].fst - searchTokens[0].fst;
        var match = S.Pair (depth)
                           (em (format (S.map (S.mapLeft (S.sub (depth)))
                                              (slice))));
        return loop (pair.fst,
                     offset + searchTokens.length,
                     S.Right (S.append (match)
                                       (S.join (S.either) (S.I) (matches))));
      }
    }

    var matches =
    S.maybe ([])
            (S.compose (S.of (Array)) (S.Pair (0)))
            (S.join (S.lift2 (S.on (highlightSubstring (em)) (S.snd))
                             (S.head (actualTokens))
                             (S.chain (S.head)
                                      (S.filter (S.compose (S.equals (1))
                                                           (S.size))
                                                (S.Just (searchTokens))))));

    return S.join (S.bimap)
                  (format)
                  (loop (Object.create (null),
                         matches.length,
                         S.tagBy (S.complement (S.equals ([]))) (matches)));
  });

  //# search :: (String -> String) -> String -> String -> Either String String
  //.
  //. Takes a “highlighting” function, a search string, and a signature string.
  //. Returns the canonically formatted signature with matches highlighted,
  //. wrapped in a Right (if there is at least one match) or a Left (if there
  //. are no matches).
  //.
  //. This “highlighting” function, `em`, will be used in subsequent snippets:
  //.
  //. ```javascript
  //. > const em = s => '@[' + s + ']@'
  //. ```
  //.
  //. The search string may match multiple tokens:
  //.
  //. ```javascript
  //. > search (em) ('String -> String') ('trim :: String -> String')
  //. S.Right ('trim :: @[String -> String]@')
  //. ```
  //.
  //. The search string may match multiple slices of the signature:
  //.
  //. ```javascript
  //. > search (em) ('String') ('trim :: String -> String')
  //. S.Right ('trim :: @[String]@ -> @[String]@')
  //. ```
  //.
  //. Type variable substitution permits different type variables to be used:
  //.
  //. ```javascript
  //. > search (em) ('x -> x') ('I :: a -> a')
  //. S.Right ('I :: @[a -> a]@')
  //. ```
  //.
  //. Only one-to-one type variable substitutions are permissible:
  //.
  //. ```javascript
  //. > search (em) ('x -> y') ('I :: a -> a')
  //. S.Left ('I :: a -> a')
  //. ```
  var search = S.curry3 (function(em, searchString, signatureString) {
    return S.fromMaybe (S.Left (signatureString))
                       (S.lift2 (matchTokens (em))
                                (parseSignature (searchString))
                                (parseSignature (signatureString)));
  });

  return search;

}));

//. [type signatures]:          https://sanctuary.js.org/#types
