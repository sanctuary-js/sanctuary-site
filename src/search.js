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
    var search = HMS.init(Array.prototype.map.call($els, function(el) {
      return el.innerText.trim().split(/\s+/).join(' ');
    }), {fuzzy: false}).search;
    var searchInput = document.getElementById('search-input');
    searchInput.focus();
    searchInput.addEventListener('keyup', function(event) {
      var matches = search(event.target.value);
      $containerNo.style.display = matches.length === 0 ? 'block' : 'none';
      while ($container.childNodes.length > 0) {
        $container.removeChild($container.childNodes[0]);
      }
      matches.forEach(function(match) {
        $container.appendChild($els[match.pointer]);
      });
    });
  });

}());
