(function(f) {

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

} (function($, show, type) {

  'use strict';

  var def = $.create ({checkTypes: true, env: []});

  var HtmlType = $.NullaryType
    ('sanctuary-site/Html')
    ('https://github.com/sanctuary-js/sanctuary-site/blob/gh-pages/adt/Html.js')
    (function(x) { return type (x) === Html['@@type']; });

  //  Html :: String -> Html
  var Html =
  def ('Html')
      ({})
      ([$.String, HtmlType])
      (function(s) {
         var html = Object.create (Html$prototype);
         html.value = s;
         return html;
       });

  var Html$prototype = {
    'constructor': Html,
    'fantasy-land/concat': function(other) {
      return Html (this.value + other.value);
    },
    '@@show': function() {
      return 'Html (' + show (this.value) + ')';
    }
  };

  Html['@@type'] = 'sanctuary-site/Html';

  Html['fantasy-land/empty'] = function() { return Html (''); };

  //  Html.unwrap :: Html -> String
  Html.unwrap =
  def ('Html.unwrap')
      ({})
      ([HtmlType, $.String])
      (function(html) { return html.value; });

  //  Html.encode :: String -> Html
  Html.encode =
  def ('Html.encode')
      ({})
      ([$.String, HtmlType])
      (function(text) {
         return Html (text.replace (/&/g, '&amp;')
                          .replace (/</g, '&lt;')
                          .replace (/"/g, '&quot;'));
       });

  //  Html.decode :: Html -> String
  Html.decode =
  def ('Html.decode')
      ({})
      ([HtmlType, $.String])
      (function(html) {
         return html.value
                    .replace (/&quot;/g, '"')
                    .replace (/&lt;/g,   '<')
                    .replace (/&amp;/g,  '&');
       });

  //  Html.indent :: NonNegativeInteger -> Html -> Html
  Html.indent =
  def ('Html.indent')
      ({})
      ([$.NonNegativeInteger, HtmlType, HtmlType])
      (function(indent) {
         return function(html) {
           return Html (html.value.replace (/^(?!$)/gm, ' '.repeat (indent)));
         };
       });

  //  Html.Type :: Type
  Html.Type = HtmlType;

  return Html;

}));
