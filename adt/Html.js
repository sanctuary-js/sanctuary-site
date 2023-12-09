(f => {

  'use strict';

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f (require ('sanctuary-def'),
                        require ('sanctuary-show'),
                        require ('sanctuary-type-identifiers'));
  } else {
    self.Html = f (self.sanctuaryDef,
                   self.sanctuaryShow,
                   self.sanctuaryTypeIdentifiers);
  }

}) (($, show, type) => {

  'use strict';

  const def = $.create ({checkTypes: true, env: []});

  //  htmlTypeIdent :: String
  const htmlTypeIdent = 'sanctuary-site/Html';

  const HtmlType = $.NullaryType
    ('Html')
    ('https://github.com/sanctuary-js/sanctuary-site/blob/gh-pages/adt/Html.js')
    ([])
    (x => type (x) === htmlTypeIdent);

  //  Html :: String -> Html
  const Html =
  def ('Html')
      ({})
      ([$.String, HtmlType])
      (value => Object.assign (Object.create (Html$prototype), {value}));

  const Html$prototype = {
    '@@type': htmlTypeIdent,
    'fantasy-land/concat': function(other) {
      return Html (this.value + other.value);
    },
    '@@show': function() {
      return 'Html (' + show (this.value) + ')';
    },
  };

  Html['fantasy-land/empty'] = () => Html ('');

  //  Html.unwrap :: Html -> String
  Html.unwrap =
  def ('Html.unwrap')
      ({})
      ([HtmlType, $.String])
      (html => html.value);

  //  Html.encode :: String -> Html
  Html.encode =
  def ('Html.encode')
      ({})
      ([$.String, HtmlType])
      (text => Html (text.replace (/&/g, '&amp;')
                         .replace (/</g, '&lt;')
                         .replace (/"/g, '&quot;')));

  //  Html.decode :: Html -> String
  Html.decode =
  def ('Html.decode')
      ({})
      ([HtmlType, $.String])
      (html => html.value
                   .replace (/&quot;/g, '"')
                   .replace (/&lt;/g,   '<')
                   .replace (/&amp;/g,  '&'));

  //  Html.indent :: NonNegativeInteger -> Html -> Html
  Html.indent =
  def ('Html.indent')
      ({})
      ([$.NonNegativeInteger, HtmlType, HtmlType])
      (indent => html =>
         Html (html.value.replace (/^(?!$)/gm, ' '.repeat (indent))));

  //  Html.Type :: Type
  Html.Type = HtmlType;

  return Html;

});
