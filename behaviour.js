(function() {

  'use strict';

  var S = window.S.create({checkTypes: false, env: window.S.env});

  //  replace :: RegExp -> String -> String -> Either String String
  var replace = S.curry3(function(pattern, replacement, s) {
    return S.test(pattern, s) ? S.Left(s.replace(pattern, replacement))
                              : S.Right(s);
  });

  //  evaluate :: String -> Either String Any
  var evaluate = S.encaseEither(
    S.prop('message'),
    S.pipe([S.Right,
            S.chain(replace(/^const ([^ ]*) = (.*)/, 'window.$1 = $2')),
            S.chain(replace(/^function ([^(]*).*/, 'window.$1 = $&')),
            S.either(S.I, S.concat('return ')),
            function(body) { return new Function(body)(); }])
  );

  //  hasClass :: String -> Element -> Boolean
  var hasClass = S.curry2(function(className, el) {
    return el.nodeType === 1 && S.elem(className, S.words(el.className));
  });

  //  evaluateForm :: Element -> Undefined
  function evaluateForm(el) {
    var input = el.getElementsByTagName('input')[0];
    var output = el.getElementsByClassName('output')[0];

    S.either(
      function(s) {
        output.setAttribute('data-error', 'true');
        output.innerHTML = '! ' + R.replace(/\n/g, '<br>', s);
      },
      function(x) {
        output.setAttribute('data-error', 'false');
        output.textContent = S.toString(x);
      },
      evaluate(input.value)
    );
  }

  //  evaluateForms :: Element -> Undefined
  function evaluateForms(el) {
    var forms = el.getElementsByTagName('form');
    Array.prototype.forEach.call(forms, evaluateForm);
  }

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
        if (hasClass('examples', el)) {
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
