(f => {

  'use strict';

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f (require ('sanctuary-def'),
                        require ('./adt/Html.js'),
                        require ('./adt/List.js'),
                        require ('./adt/Sum.js'));
  } else {
    self.env = f (self.sanctuaryDef, self.Html, self.List, self.Sum);
  }

}) (($, Html, List, Sum) => {

  'use strict';

  return $.env.concat ([Html.Type, List.Type ($.Unknown), Sum.Type]);

});
