(function() {

  'use strict';

  var Html = window.Html;
  var S = window.S.create ({checkTypes: false, env: window.env});
  var search = window.sanctuarySearch;

  //  debounce :: (Number, x -> Undefined) -> x -> Undefined
  function debounce(ms, f) {
    var id = null;
    return function(x) {
      if (id != null) clearTimeout (id);
      id = setTimeout (f, ms, x);
    };
  }

  //  replace :: RegExp -> String -> String -> Either String String
  function replace(pattern) {
    return function(replacement) {
      return function(s) {
        return S.test (pattern) (s) ? S.Left (s.replace (pattern, replacement))
                                    : S.Right (s);
      };
    };
  }

  //  evaluate :: String -> Either String Any
  var evaluate = S.pipe ([
    S.Right,
    S.chain (replace (/^const ([^ ]*) = (.*)/) ('window.$1 = $2')),
    S.chain (replace (/^function ([^(]*).*/) ('window.$1 = $&')),
    S.either (S.I) (S.concat ('return ')),
    S.encase (function(body) { return new Function (body) (); }),
    S.mapLeft (S.prop ('message'))
  ]);

  //  createElement :: (String, Object, Array Element) -> Element
  function createElement(tagName, attrs, childNodes) {
    var el = document.createElement (tagName);
    for (var attr in attrs) el[attr] = attrs[attr];
    for (var idx = 0; idx < childNodes.length; idx += 1) {
      el.appendChild (childNodes[idx]);
    }
    return el;
  }

  //  firstInput :: Element -> Element
  function firstInput(el) {
    return (el.getElementsByTagName ('input'))[0];
  }

  //  firstOutput :: Element -> Element
  function firstOutput(el) {
    return (el.getElementsByClassName ('output'))[0];
  }

  //  hasClass :: String -> Element -> Boolean
  function hasClass(className) {
    return function(el) {
      return el.nodeType === 1 && S.elem (className) (S.words (el.className));
    };
  }

  //  evaluateForm :: Element -> Undefined
  function evaluateForm(el) {
    var input = firstInput (el);
    var output = firstOutput (el);

    S.either (function(s) {
                output.setAttribute ('data-error', 'true');
                output.textContent = '! ' + s;
              })
             (function(x) {
                output.setAttribute ('data-error', 'false');
                output.textContent = S.show (x);
              })
             (evaluate (input.value));
  }

  //  typeText :: (Element, String, () -> Undefined) -> Undefined
  function typeText(input, text, callback) {
    var shifted = '!"#$%&()*+:<>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ^_{|}~';
    input.value = '';
    function recur(index) {
      if (input.value === text) {
        callback ();
      } else {
        var requiresShift = shifted.indexOf (text.charAt (index)) >= 0;
        var delay = (requiresShift ? 160 : 60) * Math.random () + 20;
        setTimeout (function() {
          input.value = text.slice (0, index + 1);
          recur (index + 1);
        }, delay);
      }
    }
    recur (0);
  }

  //  demonstrateEditing :: Element -> Undefined
  function demonstrateEditing(input) {
    function evaluateForm_() { evaluateForm (input.parentNode); }
    var value = input.value;
    input.focus ();
    typeText (input, "'These examples are editable!'", function() {
      evaluateForm_ ();
      input.select ();
      setTimeout (function() {
        typeText (input, value, evaluateForm_);
      }, 1000);
    });
  }

  var examples = document.body.getElementsByClassName ('examples');
  var locateVisibleExample = debounce (100, function(event) {
    var min = 0;
    var max = examples.length - 1;
    while (min <= max) {
      var idx = Math.floor ((min + max) / 2);
      var input = firstInput (examples[idx]);
      var rect = input.getBoundingClientRect ();
      if (rect.top < 0) {
        min = idx + 1;
      } else if (rect.bottom > window.innerHeight) {
        max = idx - 1;
      } else {
        while ((idx -= 1) >= min) {
          var prev = firstInput (examples[idx]);
          if ((prev.getBoundingClientRect ()).top < 0) break;
          input = prev;
        }
        window.removeEventListener ('scroll', locateVisibleExample, false);
        demonstrateEditing (input);
        break;
      }
    }
  });
  window.addEventListener ('scroll', locateVisibleExample);

  document.body.addEventListener ('click', function(event) {
    //  Dragging a selection triggers a "click" event. Selecting the
    //  output text (for copying) should not focus the input element.
    if ((window.getSelection ()).isCollapsed) {
      var el = event.target;
      while (el.tagName !== 'INPUT' && el !== document.body) {
        if (hasClass ('examples') (el)) {
          var input = firstInput (el);
          input.focus ();
          //  Move the caret to the end of the text.
          input.value = input.value;  // eslint-disable-line no-self-assign
          break;
        }
        el = el.parentNode;
      }
    }
  }, false);

  document.body.addEventListener ('submit', function(event) {
    if (event.target.tagName === 'FORM') {
      event.preventDefault ();
      Array.prototype.forEach.call (
        event.target.parentNode.getElementsByTagName ('form'),
        evaluateForm
      );
    }
  }, false);

  //  signatures :: Array (Pair String String)
  var signatures = S.map (function(name) {
    return S.Pair (name)
                  (document.getElementById (name)
                   .textContent
                   .replace (/\s/g, ' '));
  }) (Object.keys (S));

  var searchInput = document.getElementById ('search-input');
  var searchResults = createElement ('ul',
                                     {id: 'search-results', className: 'list'},
                                     []);
  searchInput.parentNode.appendChild (searchResults);

  searchInput.addEventListener ('input', debounce (100, function(event) {
    searchResults.innerHTML = '';

    //  matches :: Array (Pair String String)
    var matches =
    S.rights (S.map (S.pair (S.compose (S.map) (S.Pair)))
                    (S.map (S.map (search (function(s) {
                                             return '≤' + s + '≥';
                                           })
                                          (event.target.value)))
                           (signatures)));

    var fragment = document.createDocumentFragment ();
    for (var idx = 0; idx < matches.length; idx += 1) {
      var html = Html.unwrap (Html.encode (matches[idx].snd))
                 .replace (/≤/g, '<b>')
                 .replace (/≥/g, '</b>');
      fragment.appendChild (
        createElement ('li', {}, [
          createElement ('a', {href: '#' + matches[idx].fst}, [
            createElement ('code', {innerHTML: html}, [])
          ])
        ])
      );
    }
    searchResults.appendChild (fragment);
  }), false);

} ());
