(() => {

  'use strict';

  const S = window.S.create ({checkTypes: false, env: window.env});

  //  replace :: RegExp -> String -> String -> Either String String
  const replace = pattern => replacement => s => (
    S.test (pattern) (s) ?
    S.Left (s.replace (pattern, replacement)) :
    S.Right (s)
  );

  //  evaluate :: String -> Either String Any
  const evaluate = S.pipe ([
    S.Right,
    S.chain (replace (/^const ([^ ]*) = (.*)/) ('window.$1 = $2')),
    S.chain (replace (/^function ([^(]*).*/) ('window.$1 = $&')),
    S.either (S.I) (S.concat ('return ')),
    S.encase (body => new Function (body) ()),
    S.mapLeft (S.prop ('message')),
  ]);

  //  firstInput :: Element -> Element
  const firstInput = el => (
    (el.getElementsByTagName ('input'))[0]
  );

  //  firstOutput :: Element -> Element
  const firstOutput = el => (
    (el.getElementsByClassName ('output'))[0]
  );

  //  hasClass :: String -> Element -> Boolean
  const hasClass = className => el => (
    el.nodeType === 1 && S.elem (className) (S.words (el.className))
  );

  //  evaluateForm :: Element -> Undefined
  const evaluateForm = el => {
    const input = firstInput (el);
    const output = firstOutput (el);

    S.either (s => {
                output.setAttribute ('data-error', 'true');
                output.textContent = '! ' + s;
              })
             (x => {
                output.setAttribute ('data-error', 'false');
                output.textContent = S.show (x);
              })
             (evaluate (input.value));
  };

  //  typeText :: (Element, String, () -> Undefined) -> Undefined
  const typeText = (input, text, callback) => {
    const shifted = '!"#$%&()*+:<>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ^_{|}~';
    input.value = '';
    function recur(index) {
      if (input.value === text) {
        callback ();
      } else {
        const requiresShift = shifted.indexOf (text.charAt (index)) >= 0;
        const delay = (requiresShift ? 160 : 60) * Math.random () + 20;
        setTimeout (() => {
          input.value = text.slice (0, index + 1);
          recur (index + 1);
        }, delay);
      }
    }
    recur (0);
  };

  //  demonstrateEditing :: Element -> Undefined
  const demonstrateEditing = input => {
    const evaluateForm_ = () => evaluateForm (input.parentNode);
    const value = input.value;
    input.focus ();
    typeText (input, "'These examples are editable!'", () => {
      evaluateForm_ ();
      input.select ();
      setTimeout (() => { typeText (input, value, evaluateForm_); }, 1000);
    });
  };

  const examples = document.body.getElementsByClassName ('examples');
  let locateVisibleExampleTimeoutId = setTimeout (() => {});
  window.addEventListener ('scroll', function locateVisibleExample(event) {
    clearTimeout (locateVisibleExampleTimeoutId);
    locateVisibleExampleTimeoutId = setTimeout (() => {
      let min = 0;
      let max = examples.length - 1;
      while (min <= max) {
        let idx = Math.floor ((min + max) / 2);
        let input = firstInput (examples[idx]);
        const rect = input.getBoundingClientRect ();
        if (rect.top < 0) {
          min = idx + 1;
        } else if (rect.bottom > window.innerHeight) {
          max = idx - 1;
        } else {
          while ((idx -= 1) >= min) {
            const prev = firstInput (examples[idx]);
            if ((prev.getBoundingClientRect ()).top < 0) break;
            input = prev;
          }
          window.removeEventListener ('scroll', locateVisibleExample, false);
          demonstrateEditing (input);
          break;
        }
      }
    }, 100);
  });

  document.body.addEventListener ('click', event => {
    //  Dragging a selection triggers a "click" event. Selecting the
    //  output text (for copying) should not focus the input element.
    if ((window.getSelection ()).isCollapsed) {
      let el = event.target;
      while (el.tagName !== 'INPUT' && el !== document.body) {
        if (hasClass ('examples') (el)) {
          const input = firstInput (el);
          input.focus ();
          //  Move the caret to the end of the text.
          input.value = input.value;  // eslint-disable-line no-self-assign
          break;
        }
        el = el.parentNode;
      }
    }
  }, false);

  document.body.addEventListener ('submit', event => {
    if (event.target.tagName === 'FORM') {
      event.preventDefault ();
      Array.prototype.forEach.call (
        event.target.parentNode.getElementsByTagName ('form'),
        evaluateForm
      );
    }
  }, false);

}) ();
