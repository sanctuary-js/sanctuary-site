/* jshint browser: true */

(function() {

  'use strict';

  var R = window.R;
  var S = window.S = window.sanctuary;

  //  evaluate :: String -> Either String Any
  var evaluate =
  S.encaseEither(R.prop('message'),
                 S.pipe([R.replace(/^const ([^ ]*) = (.*)/,
                                   '(window.$1 = $2), undefined'),
                         R.concat('return '),
                         R.construct(Function),
                         R.call]));

  //  hasClass :: String -> Element -> Boolean
  var hasClass = function(className) {
    return function(el) {
      return el.nodeType === 1 &&
             S.words(el.className).indexOf(className) >= 0;
    };
  };

  //  evaluateForm :: Element -> Undefined
  var evaluateForm = function(el) {
    var input = el.getElementsByTagName('input')[0];
    var output = el.getElementsByClassName('output')[0];

    S.either(function(s) {
               output.setAttribute('data-error', 'true');
               output.textContent = '! ' + s;
             },
             function(x) {
               output.setAttribute('data-error', 'false');
               output.textContent = R.toString(x);
             },
             evaluate(input.value));
  };

  //  evaluateForms :: Element -> Undefined
  var evaluateForms = function(el) {
    R.forEach(evaluateForm, el.getElementsByTagName('form'));
  };

  evaluateForms(document.body);

  //  The first time the user moves her mouse over the first example, select
  //  the "words" to suggest that the text is editable. Note that "mouseover"
  //  is unsuitable as the cursor may already be over the first example.
  var firstExample = document.body.getElementsByClassName('examples')[0];
  document.body.addEventListener('mousemove', function selectWords(event) {
    var el = event.target;
    while (el !== document.body) {
      if (el === firstExample) {
        var input = firstExample.getElementsByTagName('input')[0];
        input.focus();
        input.setSelectionRange(input.value.indexOf('[') + 1,
                                input.value.indexOf(']'),
                                'forward');
        document.body.removeEventListener('mousemove', selectWords, false);
      }
      el = el.parentNode;
    }
  }, false);

  document.body.addEventListener('click', function(event) {
    //  Dragging a selection triggers a "click" event. Selecting the
    //  output text (for copying) should not focus the input element.
    if (window.getSelection().isCollapsed) {
      var el = event.target;
      while (el.tagName !== 'INPUT' && el !== document.body) {
        if (hasClass('examples')(el)) {
          var input = el.getElementsByTagName('input')[0];
          input.focus();
          //  Move the caret to the end of the text.
          input.value = input.value;
          break;
        }
        el = el.parentNode;
      }
    }
  }, false);

  document.body.addEventListener('submit', function(event) {
    if (event.target.tagName === 'FORM') {
      event.preventDefault();
      evaluateForms(event.target.parentNode);
    }
  }, false);

}());
