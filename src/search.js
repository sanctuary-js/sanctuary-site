(function() {

  'use strict';

  /* global require */

  var HMS = require('hindley-milner-search');

  var S = window.S.create({checkTypes: false, env: window.S.env});

  var state = {
    // [Node], the dom elements we will be showing/hiding when user searches
    els: null,
    // Node, container for results
    container: null,
    // Node, container for notification if there are no matches
    containerNo: null,
    // [Signature], the signatures as compiled by HMS
    index: [],
    // [Signature], most recent matches
    matches: [],
    // String, most recent user input
    prevSearch: 'placeholder'
  };

  //  map :: (a -> b) -> [a] -> [b]
  var map = S.curry2(function map(f, xs) {
    return Array.prototype.map.call(xs, function(x) { return f(x); });
  });

  //  getParent :: Node -> Node
  function getParent(el) {
    return el.parentNode;
  }

  //  initSigResult :: Node -> Node
  function initSigResult(apiLink) {
    var el = document.createElement('div');
    var clone = apiLink.cloneNode(true);
    el.appendChild(clone);
    el.className = 'search-result';
    return el;
  }

  //  firstChild :: Node -> Node
  function firstChild(el) {
    return el.childNodes[0];
  }

  //  getAttribute :: String -> Node -> String
  var getAttribute = S.curry2(function getAttribute(key, el) {
    return el.getAttribute(key);
  });

  //  uniqWith :: (a -> String) -> [a] -> [a]
  var uniqWith = S.curry2(function uniqWith(f, xs) {
    var lookup = {};
    var ys = [];
    for (var i = 0; i < xs.length; i += 1) {
      var x = xs[i];
      var val = f(x);
      if (!(val in lookup)) {
        lookup[val] = 1;
        ys.push(x);
      }
    }
    return ys;
  });

  //  initSigNodes :: Node -> [Node]
  function initSigNodes(resultsContainer) {
    var codes = document.getElementById('toc').querySelectorAll('li a code');
    return S.pipe([
      map(S.compose(initSigResult, getParent)),
      uniqWith(S.compose(getAttribute('href'), firstChild))
    ], codes);
  }

  //  extractSignatureText :: Node -> String
  var extractSignatureText = S.pipe([
    S.prop('innerText'),
    S.words,
    S.unwords
  ]);

  //  initState :: Node -> IO ()
  function initState(resultsContainer) {
    state.container = document.getElementById('yes-matches');
    state.containerNo = document.getElementById('no-matches');
    state.els = initSigNodes(resultsContainer);
    state.index = HMS.index(map(extractSignatureText, state.els));
  }

  //  clearChildren :: Node -> IO ()
  function clearChildren(container) {
    while (container.childNodes.length > 0) {
      container.removeChild(container.childNodes[0]);
    }
  }

  //  setNoMatchesVisibility :: (String, [Match], Node) -> IO ()
  function setNoMatchesVisibility(q, matches, el) {
    el.style.display = matches.length === 0 && q.length > 0 ? 'block' : 'none';
  }

  //  showMatches :: (String, [Node], [Match]) -> IO ()
  function showMatches(q, els, matches) {
    setNoMatchesVisibility(q, matches, state.containerNo);
    clearChildren(state.container);
    // if there is no query, do not show any matches
    if (q.length > 0) {
      matches.forEach(function(match) {
        var el = state.els[match.pointer];
        state.container.appendChild(el);
      });
    }
  }

  //  handleSearchKeyUp :: Event -> IO ()
  function handleSearchKeyUp(e) {
    var q = e.target.value;
    if (q === state.prevSearch) {
      return;
    } else {
      state.prevSearch = q;
      state.matches = HMS.search(state.index, q);
      showMatches(q, state.els, state.matches);
    }
  }

  window.addEventListener('DOMContentLoaded', function() {
    initState(document.getElementById('search-results'));
    var searchInput = document.getElementById('search-input');
    searchInput.focus();
    searchInput.addEventListener('keyup', handleSearchKeyUp);
  });

}());
