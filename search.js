(function() {

  /* eslint-disable comma-dangle, max-len */

  'use strict';

  var patch = window.snabbdom.patch;
  var h = window.snabbdom.h;

  var Perf = {
    startName: function(name) { return 's' + name; },
    endName: function(name) { return 'e' + name; },

    start: function(name) {
      performance.mark(Perf.startName(name));
    },

    end: function(name) {
      performance.mark(Perf.endName(name));
      performance.measure(name, Perf.startName(name), Perf.endName(name));
    },

    log: function() {
      var entries = performance.getEntriesByType('measure');
      for (var i = 0; i < entries.length; i += 1) {
        var e = entries[i];
        console.log('Perf[' + e.name + '] = ' + e.duration);
      }
    },

    clear: function() {
      performance.clearMarks();
      performance.clearMeasures();
    },

    endLogClear: function(name) {
      Perf.end(name);
      Perf.log();
      Perf.clear();
    }
  };

  var fuzzySearch = function fuzzySearch(q, str) {
    var qLower = q.toLowerCase();
    var strLower = str.toLowerCase();
    var strIdx = 0;
    var qIdx, ch, isMatch;

    for (qIdx = 0; qIdx < q.length; qIdx += 1) {
      ch = qLower[qIdx];
      isMatch = false;
      for (; strIdx < strLower.length; strIdx += 1) {
        if (ch === strLower[strIdx]) {
          isMatch = true;
          strIdx += 1;
          break;
        }
      }
      if (!isMatch) {
        return false;
      }
    }
    return true;
  };

  var searchName = function searchName(q, str) {
    return fuzzySearch(q, str) === true ? {type: 'name', path: '*'} : false;
  };

  var searchTypes = function searchTypes(q, matchPaths, matchPath, types) {
    var i, t, r, path;
    if (q === '') {
      return false;
    }
    for (i = 0; i < types.length; i += 1) {
      t = types[i];
      path = matchPath + '.' + i;
      if (!(path in matchPaths.types) && fuzzySearch(q, t.text)) {
        return {type: 'types', path: path};
      }
      r = searchTypes(q, matchPaths, path, t.children);
      if (r !== false) {
        return r;
      }
    }
    return false;
  };

  var searchPart = function searchPart(part, matchPaths, data) {
    if (/^\|/.test(part)) return searchTypes(part.substr(1), matchPaths, '', data.types);
    else if (/^</.test(part)) return searchTypes(part.substr(1), matchPaths, '', data.types.slice(0, -1));
    else if (/^>/.test(part)) return searchTypes(part.substr(1), matchPaths, '', data.types.slice(-1));
    else return searchName(part, data.name);
  };

  var searchParts = function searchParts(qparts, space) {
    var filtered = [];
    var i, j, item, qpart, qresult, matchPaths;
    for (i = 0; i < space.length; i += 1) {
      item = space[i];
      matchPaths = {
        name: {},
        types: {},
        constraints: {}
      };
      for (j = 0; j < qparts.length; j += 1) {
        qpart = qparts[j];
        // we've matched at least 1 part (j > 0)
        // if current input is only non-word characters it would cancel all matches
        // which is not what we want, so just skip it
        if (j > 0 && /^\W+$/.test(qpart)) {
          continue;
        }
        qresult = searchPart(qpart, matchPaths, item.data);
        if (qresult === false) {
          break;
        } else {
          matchPaths[qresult.type][qresult.path] = 1;
        }
      }
      if (j === qparts.length) {
        filtered.push(item);
      }
    }
    return filtered;
  };

  var search = function search(q, space) {
    if (q === '') {
      return [];
    } else {
      return searchParts(nonEmptyWords(q), space);
    }
  };

  var nonEmptyWords = function nonEmptyWords(s) {
    return /^\s*$/.test(s) ? [] : s.trim().replace(/\s+/g, ' ').split(' ');
  };

  var handleSearchKeyUp = function handleSearchKeyUp(e) {
    var q = e.target.value;
    if (q === state.prevSearch) {
      return;
    } else {
      // if current search is substring of previous search and previous search has at least 1 word
      // character, use previous matches as search space
      var space = q.indexOf(state.prevSearch) === 0 && /(^| ).*\w/.test(state.prevSearch) ? state.matches : window.sigData;
      state.prevSearch = q;
      state.matches = search(q.trim(), space);
      update(state);
    }
  };

  var update = function update(state) {
    var newVnode = view(state);
    patch(vnode, newVnode);
    vnode = newVnode;
  };

  var init = function init() {
    return {
      prevSearch: '',
      matches: []
    };
  };

  var showResult = function showResult(d, i) {
    return h('tr', {key: d.data.name}, [
      h('td', i + 1),
      h('td', [
        h('a', {props: {href: '#' + d.a}}, d.sig),
      ]),
    ]);
  };

  var view = function view(state) {
    return h('div',
      state.prevSearch === ''    ? showNothing() :
      state.matches.length === 0 ? showNoMatches() :
                                   showMatches(state));
  };

  var showNothing = function showNothing() {
    return [];
  };

  var showNoMatches = function showNoMatches() {
    return [
      h('span', 'No Matches'),
    ];
  };

  var showMatches = function showMatches(state) {
    return [
      h('table', [
        h('thead', [
          h('tr', [
            h('th'),
            h('th'),
          ]),
        ]),
        h('tbody', state.matches.map(showResult)),
      ]),
    ];
  };

  var state = init();
  var vnode = view(state);

  window.addEventListener('DOMContentLoaded', function() {
    var header = document.getElementById('sanctuary');
    var searchResults = document.createElement('div');
    var searchInput = document.getElementById('search-input');
    searchInput.focus();
    searchInput.addEventListener('keyup', handleSearchKeyUp);
    header.parentNode.insertBefore(searchResults, header.nextSibling);
    patch(searchResults, vnode);
  });

}());
