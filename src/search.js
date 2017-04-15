(function() {

  'use strict';

  /* global require */

  var HMS = require('hindley-milner-search');

  //  initSigNodes :: Node -> [Node]
  function initSigNodes(resultsContainer) {
    return Array.prototype.reduce.call(
      document.getElementById('toc').querySelectorAll('li a code'),
      function(r, _el) {
        var el = document.createElement('div');
        el.appendChild(_el.parentNode.cloneNode(true));
        el.className = 'search-result';
        var k = el.childNodes[0].getAttribute('href');
        if (!Object.prototype.hasOwnProperty.call(r.set, k)) {
          r.set[k] = true;
          r.uniqs.push(el);
        }
        return r;
      },
      {set: {}, uniqs: []}
    ).uniqs;
  }

  window.addEventListener('DOMContentLoaded', function() {
    var $container = document.getElementById('yes-matches');
    var $containerNo = document.getElementById('no-matches');
    var $els = initSigNodes(document.getElementById('search-results'));
    var $index = HMS.index(Array.prototype.map.call($els, function(el) {
      return el.innerText.trim().split(/\s+/).join(' ');
    }));
    var $prevSearch = '';
    var searchInput = document.getElementById('search-input');
    searchInput.focus();
    searchInput.addEventListener('keyup', function(event) {
      var q = event.target.value;
      if (q !== $prevSearch) {
        $prevSearch = q;
        var matches = HMS.search($index, q);
        $containerNo.style.display =
          matches.length === 0 && q !== '' ? 'block' : 'none';
        while ($container.childNodes.length > 0) {
          $container.removeChild($container.childNodes[0]);
        }
        // if there is no query, do not show any matches
        if (q !== '') {
          matches.forEach(function(match) {
            $container.appendChild($els[match.pointer]);
          });
        }
      }
    });
  });

}());
