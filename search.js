(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){(function(){function id(x){return x[0]}var pp=require("./post-process.js");var grammar={ParserRules:[{name:"_$ebnf$1",symbols:[]},{name:"_$ebnf$1",symbols:["_$ebnf$1","wschar"],postprocess:function arrpush(d){return d[0].concat([d[1]])}},{name:"_",symbols:["_$ebnf$1"],postprocess:function(d){return null}},{name:"__$ebnf$1",symbols:["wschar"]},{name:"__$ebnf$1",symbols:["__$ebnf$1","wschar"],postprocess:function arrpush(d){return d[0].concat([d[1]])}},{name:"__",symbols:["__$ebnf$1"],postprocess:function(d){return null}},{name:"wschar",symbols:[/[ \t\n\v\f]/],postprocess:id},{name:"lower",symbols:[/[a-z]/],postprocess:pp.lower},{name:"upper",symbols:[/[A-Z]/],postprocess:pp.upper},{name:"alpha$subexpression$1",symbols:["lower"]},{name:"alpha$subexpression$1",symbols:["upper"]},{name:"alpha",symbols:["alpha$subexpression$1"],postprocess:pp.alpha},{name:"lword$ebnf$1",symbols:["lower"]},{name:"lword$ebnf$1",symbols:["lword$ebnf$1","lower"],postprocess:function arrpush(d){return d[0].concat([d[1]])}},{name:"lword",symbols:["lword$ebnf$1"],postprocess:pp.word},{name:"ufirst$ebnf$1",symbols:[]},{name:"ufirst$ebnf$1",symbols:["ufirst$ebnf$1","alpha"],postprocess:function arrpush(d){return d[0].concat([d[1]])}},{name:"ufirst",symbols:["upper","ufirst$ebnf$1"],postprocess:pp.ufirst},{name:"word$ebnf$1",symbols:["alpha"]},{name:"word$ebnf$1",symbols:["word$ebnf$1","alpha"],postprocess:function arrpush(d){return d[0].concat([d[1]])}},{name:"word",symbols:["word$ebnf$1"],postprocess:pp.word},{name:"_between$macrocall$2",symbols:[{literal:"("}]},{name:"_between$macrocall$3",symbols:[{literal:")"}]},{name:"_between$macrocall$4",symbols:["word"]},{name:"_between$macrocall$1",symbols:["_between$macrocall$2","_between$macrocall$4","_between$macrocall$3"],postprocess:pp.between},{name:"_between",symbols:["_between$macrocall$1"],postprocess:pp.head},{name:"_parens$macrocall$2",symbols:["word"]},{name:"_parens$macrocall$1$macrocall$2",symbols:[{literal:"("}]},{name:"_parens$macrocall$1$macrocall$3",symbols:[{literal:")"}]},{name:"_parens$macrocall$1$macrocall$4",symbols:["_parens$macrocall$2"]},{name:"_parens$macrocall$1$macrocall$1",symbols:["_parens$macrocall$1$macrocall$2","_parens$macrocall$1$macrocall$4","_parens$macrocall$1$macrocall$3"],postprocess:pp.between},{name:"_parens$macrocall$1",symbols:["_parens$macrocall$1$macrocall$1"],postprocess:pp.head2},{name:"_parens",symbols:["_parens$macrocall$1"],postprocess:pp.head},{name:"_delim1$macrocall$2",symbols:[{literal:","}]},{name:"_delim1$macrocall$3",symbols:["word"]},{name:"_delim1$macrocall$1$ebnf$1$subexpression$1",symbols:["_delim1$macrocall$2","_delim1$macrocall$3"]},{name:"_delim1$macrocall$1$ebnf$1",symbols:["_delim1$macrocall$1$ebnf$1$subexpression$1"]},{name:"_delim1$macrocall$1$ebnf$1$subexpression$2",symbols:["_delim1$macrocall$2","_delim1$macrocall$3"]},{name:"_delim1$macrocall$1$ebnf$1",symbols:["_delim1$macrocall$1$ebnf$1","_delim1$macrocall$1$ebnf$1$subexpression$2"],postprocess:function arrpush(d){return d[0].concat([d[1]])}},{name:"_delim1$macrocall$1",symbols:["_delim1$macrocall$3","_delim1$macrocall$1$ebnf$1"],postprocess:pp.delim},{name:"_delim1",symbols:["_delim1$macrocall$1"],postprocess:pp.head},{name:"type$subexpression$1",symbols:["fn"]},{name:"type$subexpression$1",symbols:["uncurriedFn"]},{name:"type$subexpression$1",symbols:["thunk"]},{name:"type$subexpression$1",symbols:["method"]},{name:"type$subexpression$1",symbols:["manyTypeConstructor"]},{name:"type$subexpression$1",symbols:["constrainedType"]},{name:"type$subexpression$1",symbols:["list"]},{name:"type$subexpression$1",symbols:["record"]},{name:"type$subexpression$1",symbols:["nullTypeConstructor"]},{name:"type$subexpression$1",symbols:["typevar"]},{name:"type",symbols:["type$subexpression$1"],postprocess:pp.head2},{name:"typeWrapFns$subexpression$1$macrocall$2",symbols:["fn"]},{name:"typeWrapFns$subexpression$1$macrocall$1$macrocall$2",symbols:[{literal:"("}]},{name:"typeWrapFns$subexpression$1$macrocall$1$macrocall$3",symbols:[{literal:")"}]},{name:"typeWrapFns$subexpression$1$macrocall$1$macrocall$4",symbols:["typeWrapFns$subexpression$1$macrocall$2"]},{name:"typeWrapFns$subexpression$1$macrocall$1$macrocall$1",symbols:["typeWrapFns$subexpression$1$macrocall$1$macrocall$2","typeWrapFns$subexpression$1$macrocall$1$macrocall$4","typeWrapFns$subexpression$1$macrocall$1$macrocall$3"],postprocess:pp.between},{name:"typeWrapFns$subexpression$1$macrocall$1",symbols:["typeWrapFns$subexpression$1$macrocall$1$macrocall$1"],postprocess:pp.head2},{name:"typeWrapFns$subexpression$1",symbols:["typeWrapFns$subexpression$1$macrocall$1"]},{name:"typeWrapFns$subexpression$1$macrocall$4",symbols:["uncurriedFn"]},{name:"typeWrapFns$subexpression$1$macrocall$3$macrocall$2",symbols:[{literal:"("}]},{name:"typeWrapFns$subexpression$1$macrocall$3$macrocall$3",symbols:[{literal:")"}]},{name:"typeWrapFns$subexpression$1$macrocall$3$macrocall$4",symbols:["typeWrapFns$subexpression$1$macrocall$4"]},{name:"typeWrapFns$subexpression$1$macrocall$3$macrocall$1",symbols:["typeWrapFns$subexpression$1$macrocall$3$macrocall$2","typeWrapFns$subexpression$1$macrocall$3$macrocall$4","typeWrapFns$subexpression$1$macrocall$3$macrocall$3"],postprocess:pp.between},{name:"typeWrapFns$subexpression$1$macrocall$3",symbols:["typeWrapFns$subexpression$1$macrocall$3$macrocall$1"],postprocess:pp.head2},{name:"typeWrapFns$subexpression$1",symbols:["typeWrapFns$subexpression$1$macrocall$3"]},{name:"typeWrapFns$subexpression$1$macrocall$6",symbols:["thunk"]},{name:"typeWrapFns$subexpression$1$macrocall$5$macrocall$2",symbols:[{literal:"("}]},{name:"typeWrapFns$subexpression$1$macrocall$5$macrocall$3",symbols:[{literal:")"}]},{name:"typeWrapFns$subexpression$1$macrocall$5$macrocall$4",symbols:["typeWrapFns$subexpression$1$macrocall$6"]},{name:"typeWrapFns$subexpression$1$macrocall$5$macrocall$1",symbols:["typeWrapFns$subexpression$1$macrocall$5$macrocall$2","typeWrapFns$subexpression$1$macrocall$5$macrocall$4","typeWrapFns$subexpression$1$macrocall$5$macrocall$3"],postprocess:pp.between},{name:"typeWrapFns$subexpression$1$macrocall$5",symbols:["typeWrapFns$subexpression$1$macrocall$5$macrocall$1"],postprocess:pp.head2},{name:"typeWrapFns$subexpression$1",symbols:["typeWrapFns$subexpression$1$macrocall$5"]},{name:"typeWrapFns$subexpression$1",symbols:["manyTypeConstructor"]},{name:"typeWrapFns$subexpression$1",symbols:["constrainedType"]},{name:"typeWrapFns$subexpression$1",symbols:["list"]},{name:"typeWrapFns$subexpression$1",symbols:["record"]},{name:"typeWrapFns$subexpression$1",symbols:["nullTypeConstructor"]},{name:"typeWrapFns$subexpression$1",symbols:["typevar"]},{name:"typeWrapFns",symbols:["typeWrapFns$subexpression$1"],postprocess:pp.head2},{name:"typeWrapAll$subexpression$1$macrocall$2",symbols:["fn"]},{name:"typeWrapAll$subexpression$1$macrocall$1$macrocall$2",symbols:[{literal:"("}]},{name:"typeWrapAll$subexpression$1$macrocall$1$macrocall$3",symbols:[{literal:")"}]},{name:"typeWrapAll$subexpression$1$macrocall$1$macrocall$4",symbols:["typeWrapAll$subexpression$1$macrocall$2"]},{name:"typeWrapAll$subexpression$1$macrocall$1$macrocall$1",symbols:["typeWrapAll$subexpression$1$macrocall$1$macrocall$2","typeWrapAll$subexpression$1$macrocall$1$macrocall$4","typeWrapAll$subexpression$1$macrocall$1$macrocall$3"],postprocess:pp.between},{name:"typeWrapAll$subexpression$1$macrocall$1",symbols:["typeWrapAll$subexpression$1$macrocall$1$macrocall$1"],postprocess:pp.head2},{name:"typeWrapAll$subexpression$1",symbols:["typeWrapAll$subexpression$1$macrocall$1"]},{name:"typeWrapAll$subexpression$1$macrocall$4",symbols:["uncurriedFn"]},{name:"typeWrapAll$subexpression$1$macrocall$3$macrocall$2",symbols:[{literal:"("}]},{name:"typeWrapAll$subexpression$1$macrocall$3$macrocall$3",symbols:[{literal:")"}]},{name:"typeWrapAll$subexpression$1$macrocall$3$macrocall$4",symbols:["typeWrapAll$subexpression$1$macrocall$4"]},{name:"typeWrapAll$subexpression$1$macrocall$3$macrocall$1",symbols:["typeWrapAll$subexpression$1$macrocall$3$macrocall$2","typeWrapAll$subexpression$1$macrocall$3$macrocall$4","typeWrapAll$subexpression$1$macrocall$3$macrocall$3"],postprocess:pp.between},{name:"typeWrapAll$subexpression$1$macrocall$3",symbols:["typeWrapAll$subexpression$1$macrocall$3$macrocall$1"],postprocess:pp.head2},{name:"typeWrapAll$subexpression$1",symbols:["typeWrapAll$subexpression$1$macrocall$3"]},{name:"typeWrapAll$subexpression$1$macrocall$6",symbols:["thunk"]},{name:"typeWrapAll$subexpression$1$macrocall$5$macrocall$2",symbols:[{literal:"("}]},{name:"typeWrapAll$subexpression$1$macrocall$5$macrocall$3",symbols:[{literal:")"}]},{name:"typeWrapAll$subexpression$1$macrocall$5$macrocall$4",symbols:["typeWrapAll$subexpression$1$macrocall$6"]},{name:"typeWrapAll$subexpression$1$macrocall$5$macrocall$1",symbols:["typeWrapAll$subexpression$1$macrocall$5$macrocall$2","typeWrapAll$subexpression$1$macrocall$5$macrocall$4","typeWrapAll$subexpression$1$macrocall$5$macrocall$3"],postprocess:pp.between},{name:"typeWrapAll$subexpression$1$macrocall$5",symbols:["typeWrapAll$subexpression$1$macrocall$5$macrocall$1"],postprocess:pp.head2},{name:"typeWrapAll$subexpression$1",symbols:["typeWrapAll$subexpression$1$macrocall$5"]},{name:"typeWrapAll$subexpression$1$macrocall$8",symbols:["manyTypeConstructor"]},{name:"typeWrapAll$subexpression$1$macrocall$7$macrocall$2",symbols:[{literal:"("}]},{name:"typeWrapAll$subexpression$1$macrocall$7$macrocall$3",symbols:[{literal:")"}]},{name:"typeWrapAll$subexpression$1$macrocall$7$macrocall$4",symbols:["typeWrapAll$subexpression$1$macrocall$8"]},{name:"typeWrapAll$subexpression$1$macrocall$7$macrocall$1",symbols:["typeWrapAll$subexpression$1$macrocall$7$macrocall$2","typeWrapAll$subexpression$1$macrocall$7$macrocall$4","typeWrapAll$subexpression$1$macrocall$7$macrocall$3"],postprocess:pp.between},{name:"typeWrapAll$subexpression$1$macrocall$7",symbols:["typeWrapAll$subexpression$1$macrocall$7$macrocall$1"],postprocess:pp.head2},{name:"typeWrapAll$subexpression$1",symbols:["typeWrapAll$subexpression$1$macrocall$7"]},{name:"typeWrapAll$subexpression$1$macrocall$10",symbols:["constrainedType"]},{name:"typeWrapAll$subexpression$1$macrocall$9$macrocall$2",symbols:[{literal:"("}]},{name:"typeWrapAll$subexpression$1$macrocall$9$macrocall$3",symbols:[{literal:")"}]},{name:"typeWrapAll$subexpression$1$macrocall$9$macrocall$4",symbols:["typeWrapAll$subexpression$1$macrocall$10"]},{name:"typeWrapAll$subexpression$1$macrocall$9$macrocall$1",symbols:["typeWrapAll$subexpression$1$macrocall$9$macrocall$2","typeWrapAll$subexpression$1$macrocall$9$macrocall$4","typeWrapAll$subexpression$1$macrocall$9$macrocall$3"],postprocess:pp.between},{name:"typeWrapAll$subexpression$1$macrocall$9",symbols:["typeWrapAll$subexpression$1$macrocall$9$macrocall$1"],postprocess:pp.head2},{name:"typeWrapAll$subexpression$1",symbols:["typeWrapAll$subexpression$1$macrocall$9"]},{name:"typeWrapAll$subexpression$1",symbols:["list"]},{name:"typeWrapAll$subexpression$1",symbols:["record"]},{name:"typeWrapAll$subexpression$1",symbols:["nullTypeConstructor"]},{name:"typeWrapAll$subexpression$1",symbols:["typevar"]},{name:"typeWrapAll",symbols:["typeWrapAll$subexpression$1"],postprocess:pp.head2},{name:"fn$macrocall$2$string$1",symbols:[{literal:"-"},{literal:">"}],postprocess:function joiner(d){return d.join("")}},{name:"fn$macrocall$2",symbols:["__","fn$macrocall$2$string$1","__"]},{name:"fn$macrocall$3",symbols:["typeWrapFns"]},{name:"fn$macrocall$1$ebnf$1$subexpression$1",symbols:["fn$macrocall$2","fn$macrocall$3"]},{name:"fn$macrocall$1$ebnf$1",symbols:["fn$macrocall$1$ebnf$1$subexpression$1"]},{name:"fn$macrocall$1$ebnf$1$subexpression$2",symbols:["fn$macrocall$2","fn$macrocall$3"]},{name:"fn$macrocall$1$ebnf$1",symbols:["fn$macrocall$1$ebnf$1","fn$macrocall$1$ebnf$1$subexpression$2"],postprocess:function arrpush(d){return d[0].concat([d[1]])}},{name:"fn$macrocall$1",symbols:["fn$macrocall$3","fn$macrocall$1$ebnf$1"],postprocess:pp.delim},{name:"fn",symbols:["fn$macrocall$1"],postprocess:pp.fn},{name:"uncurriedFn$macrocall$2$macrocall$2",symbols:[{literal:","},"__"]},{name:"uncurriedFn$macrocall$2$macrocall$3",symbols:["type"]},{name:"uncurriedFn$macrocall$2$macrocall$1$ebnf$1$subexpression$1",symbols:["uncurriedFn$macrocall$2$macrocall$2","uncurriedFn$macrocall$2$macrocall$3"]},{name:"uncurriedFn$macrocall$2$macrocall$1$ebnf$1",symbols:["uncurriedFn$macrocall$2$macrocall$1$ebnf$1$subexpression$1"]},{name:"uncurriedFn$macrocall$2$macrocall$1$ebnf$1$subexpression$2",symbols:["uncurriedFn$macrocall$2$macrocall$2","uncurriedFn$macrocall$2$macrocall$3"]},{name:"uncurriedFn$macrocall$2$macrocall$1$ebnf$1",symbols:["uncurriedFn$macrocall$2$macrocall$1$ebnf$1","uncurriedFn$macrocall$2$macrocall$1$ebnf$1$subexpression$2"],postprocess:function arrpush(d){return d[0].concat([d[1]])}},{name:"uncurriedFn$macrocall$2$macrocall$1",symbols:["uncurriedFn$macrocall$2$macrocall$3","uncurriedFn$macrocall$2$macrocall$1$ebnf$1"],postprocess:pp.delim},{name:"uncurriedFn$macrocall$2",symbols:["uncurriedFn$macrocall$2$macrocall$1"]},{name:"uncurriedFn$macrocall$1$macrocall$2",symbols:[{literal:"("}]},{name:"uncurriedFn$macrocall$1$macrocall$3",symbols:[{literal:")"}]},{name:"uncurriedFn$macrocall$1$macrocall$4",symbols:["uncurriedFn$macrocall$2"]},{name:"uncurriedFn$macrocall$1$macrocall$1",symbols:["uncurriedFn$macrocall$1$macrocall$2","uncurriedFn$macrocall$1$macrocall$4","uncurriedFn$macrocall$1$macrocall$3"],postprocess:pp.between},{name:"uncurriedFn$macrocall$1",symbols:["uncurriedFn$macrocall$1$macrocall$1"],postprocess:pp.head2},{name:"uncurriedFn$string$1",symbols:[{literal:"-"},{literal:">"}],postprocess:function joiner(d){return d.join("")}},{name:"uncurriedFn",symbols:["uncurriedFn$macrocall$1","__","uncurriedFn$string$1","__","type"],postprocess:pp.uncurriedFn},{name:"thunk$macrocall$2$string$1",symbols:[{literal:"("},{literal:")"}],postprocess:function joiner(d){return d.join("")}},{name:"thunk$macrocall$2$string$2",symbols:[{literal:"-"},{literal:">"}],postprocess:function joiner(d){return d.join("")}},{name:"thunk$macrocall$2",symbols:["thunk$macrocall$2$string$1","__","thunk$macrocall$2$string$2","__"]},{name:"thunk$macrocall$3",symbols:["typeWrapFns"]},{name:"thunk$macrocall$1",symbols:["thunk$macrocall$2","thunk$macrocall$3"],postprocess:pp.nth(1)},{name:"thunk",symbols:["thunk$macrocall$1"],postprocess:pp.thunk},{name:"method$macrocall$2$string$1",symbols:[{literal:"~"},{literal:">"}],postprocess:function joiner(d){return d.join("")}},{name:"method$macrocall$2",symbols:["__","method$macrocall$2$string$1","__"]},{name:"method$macrocall$3",symbols:["typeConstructor"]},{name:"method$macrocall$4$macrocall$2$string$1",symbols:[{literal:"-"},{literal:">"}],postprocess:function joiner(d){return d.join("")}},{name:"method$macrocall$4$macrocall$2",symbols:["__","method$macrocall$4$macrocall$2$string$1","__"]},{name:"method$macrocall$4$macrocall$3",symbols:["typeWrapFns"]},{name:"method$macrocall$4$macrocall$1$ebnf$1",symbols:[]},{name:"method$macrocall$4$macrocall$1$ebnf$1$subexpression$1",symbols:["method$macrocall$4$macrocall$2","method$macrocall$4$macrocall$3"]},{name:"method$macrocall$4$macrocall$1$ebnf$1",symbols:["method$macrocall$4$macrocall$1$ebnf$1","method$macrocall$4$macrocall$1$ebnf$1$subexpression$1"],postprocess:function arrpush(d){return d[0].concat([d[1]])}},{name:"method$macrocall$4$macrocall$1",symbols:["method$macrocall$4$macrocall$3","method$macrocall$4$macrocall$1$ebnf$1"],postprocess:pp.delim},{name:"method$macrocall$4",symbols:["method$macrocall$4$macrocall$1"]},{name:"method$macrocall$1",symbols:["method$macrocall$3","method$macrocall$2","method$macrocall$4"],postprocess:pp.around},{name:"method",symbols:["method$macrocall$1"],postprocess:pp.method},{name:"constrainedType$ebnf$1$macrocall$2",symbols:["__"]},{name:"constrainedType$ebnf$1$macrocall$3",symbols:["typeWrapAll"]},{name:"constrainedType$ebnf$1$macrocall$1",symbols:["constrainedType$ebnf$1$macrocall$2","constrainedType$ebnf$1$macrocall$3"],postprocess:pp.nth(1)},{name:"constrainedType$ebnf$1",symbols:["constrainedType$ebnf$1$macrocall$1"]},{name:"constrainedType$ebnf$1$macrocall$5",symbols:["__"]},{name:"constrainedType$ebnf$1$macrocall$6",symbols:["typeWrapAll"]},{name:"constrainedType$ebnf$1$macrocall$4",symbols:["constrainedType$ebnf$1$macrocall$5","constrainedType$ebnf$1$macrocall$6"],postprocess:pp.nth(1)},{name:"constrainedType$ebnf$1",symbols:["constrainedType$ebnf$1","constrainedType$ebnf$1$macrocall$4"],postprocess:function arrpush(d){return d[0].concat([d[1]])}},{name:"constrainedType",symbols:["lword","constrainedType$ebnf$1"],postprocess:pp.constrainedType},{name:"nullTypeConstructor",symbols:["ufirst"],postprocess:pp.nullTypeConstructor},{name:"manyTypeConstructor$ebnf$1$macrocall$2",symbols:["__"]},{name:"manyTypeConstructor$ebnf$1$macrocall$3",symbols:["typeWrapAll"]},{name:"manyTypeConstructor$ebnf$1$macrocall$1",symbols:["manyTypeConstructor$ebnf$1$macrocall$2","manyTypeConstructor$ebnf$1$macrocall$3"],postprocess:pp.nth(1)},{name:"manyTypeConstructor$ebnf$1",symbols:["manyTypeConstructor$ebnf$1$macrocall$1"]},{name:"manyTypeConstructor$ebnf$1$macrocall$5",symbols:["__"]},{name:"manyTypeConstructor$ebnf$1$macrocall$6",symbols:["typeWrapAll"]},{name:"manyTypeConstructor$ebnf$1$macrocall$4",symbols:["manyTypeConstructor$ebnf$1$macrocall$5","manyTypeConstructor$ebnf$1$macrocall$6"],postprocess:pp.nth(1)},{name:"manyTypeConstructor$ebnf$1",symbols:["manyTypeConstructor$ebnf$1","manyTypeConstructor$ebnf$1$macrocall$4"],postprocess:function arrpush(d){return d[0].concat([d[1]])}},{name:"manyTypeConstructor",symbols:["ufirst","manyTypeConstructor$ebnf$1"],postprocess:pp.manyTypeConstructor},{name:"typeConstructor$subexpression$1",symbols:["nullTypeConstructor"]},{name:"typeConstructor$subexpression$1",symbols:["manyTypeConstructor"]},{name:"typeConstructor",symbols:["typeConstructor$subexpression$1"],postprocess:pp.head2},{name:"typevar",symbols:["lword"],postprocess:pp.typevar},{name:"list$macrocall$2",symbols:["type"]},{name:"list$macrocall$1$macrocall$2",symbols:[{literal:"["}]},{name:"list$macrocall$1$macrocall$3",symbols:[{literal:"]"}]},{name:"list$macrocall$1$macrocall$4",symbols:["list$macrocall$2"]},{name:"list$macrocall$1$macrocall$1",symbols:["list$macrocall$1$macrocall$2","list$macrocall$1$macrocall$4","list$macrocall$1$macrocall$3"],postprocess:pp.between},{name:"list$macrocall$1",symbols:["list$macrocall$1$macrocall$1"],postprocess:pp.head2},{name:"list",symbols:["list$macrocall$1"],postprocess:pp.list},{name:"keyVal$string$1",symbols:[{literal:":"},{literal:":"}],postprocess:function joiner(d){return d.join("")}},{name:"keyVal",symbols:["word","__","keyVal$string$1","__","type"],postprocess:pp.keyVal},{name:"record$macrocall$2",symbols:[{literal:"{"},"__"]},{name:"record$macrocall$3",symbols:["__",{literal:"}"}]},{name:"record$macrocall$4$macrocall$2",symbols:[{literal:","},"__"]},{name:"record$macrocall$4$macrocall$3",symbols:["keyVal"]},{name:"record$macrocall$4$macrocall$1$ebnf$1",symbols:[]},{name:"record$macrocall$4$macrocall$1$ebnf$1$subexpression$1",symbols:["record$macrocall$4$macrocall$2","record$macrocall$4$macrocall$3"]},{name:"record$macrocall$4$macrocall$1$ebnf$1",symbols:["record$macrocall$4$macrocall$1$ebnf$1","record$macrocall$4$macrocall$1$ebnf$1$subexpression$1"],postprocess:function arrpush(d){return d[0].concat([d[1]])}},{name:"record$macrocall$4$macrocall$1",symbols:["record$macrocall$4$macrocall$3","record$macrocall$4$macrocall$1$ebnf$1"],postprocess:pp.delim},{name:"record$macrocall$4",symbols:["record$macrocall$4$macrocall$1"]},{name:"record$macrocall$1",symbols:["record$macrocall$2","record$macrocall$4","record$macrocall$3"],postprocess:pp.between},{name:"record",symbols:["record$macrocall$1"],postprocess:pp.record},{name:"name$ebnf$1",symbols:[/[^ \t\r\n\v\f]/]},{name:"name$ebnf$1",symbols:["name$ebnf$1",/[^ \t\r\n\v\f]/],postprocess:function arrpush(d){return d[0].concat([d[1]])}},{name:"name",symbols:["name$ebnf$1"],postprocess:pp.name},{name:"classConstraint$macrocall$2",symbols:["__"]},{name:"classConstraint$macrocall$3",symbols:["ufirst"]},{name:"classConstraint$macrocall$4",symbols:["lword"]},{name:"classConstraint$macrocall$1",symbols:["classConstraint$macrocall$3","classConstraint$macrocall$2","classConstraint$macrocall$4"],postprocess:pp.around},{name:"classConstraint",symbols:["classConstraint$macrocall$1"],postprocess:pp.classConstraint},{name:"classConstraints",symbols:["classConstraint"],postprocess:pp.classConstraintsOne},{name:"classConstraints$macrocall$2$macrocall$2",symbols:[{literal:","},"__"]},{name:"classConstraints$macrocall$2$macrocall$3",symbols:["classConstraint"]},{name:"classConstraints$macrocall$2$macrocall$1$ebnf$1$subexpression$1",symbols:["classConstraints$macrocall$2$macrocall$2","classConstraints$macrocall$2$macrocall$3"]},{name:"classConstraints$macrocall$2$macrocall$1$ebnf$1",symbols:["classConstraints$macrocall$2$macrocall$1$ebnf$1$subexpression$1"]},{name:"classConstraints$macrocall$2$macrocall$1$ebnf$1$subexpression$2",symbols:["classConstraints$macrocall$2$macrocall$2","classConstraints$macrocall$2$macrocall$3"]},{name:"classConstraints$macrocall$2$macrocall$1$ebnf$1",symbols:["classConstraints$macrocall$2$macrocall$1$ebnf$1","classConstraints$macrocall$2$macrocall$1$ebnf$1$subexpression$2"],postprocess:function arrpush(d){return d[0].concat([d[1]])}},{name:"classConstraints$macrocall$2$macrocall$1",symbols:["classConstraints$macrocall$2$macrocall$3","classConstraints$macrocall$2$macrocall$1$ebnf$1"],postprocess:pp.delim},{name:"classConstraints$macrocall$2",symbols:["classConstraints$macrocall$2$macrocall$1"]},{name:"classConstraints$macrocall$1$macrocall$2",symbols:[{literal:"("}]},{name:"classConstraints$macrocall$1$macrocall$3",symbols:[{literal:")"}]},{name:"classConstraints$macrocall$1$macrocall$4",symbols:["classConstraints$macrocall$2"]},{name:"classConstraints$macrocall$1$macrocall$1",symbols:["classConstraints$macrocall$1$macrocall$2","classConstraints$macrocall$1$macrocall$4","classConstraints$macrocall$1$macrocall$3"],postprocess:pp.between},{name:"classConstraints$macrocall$1",symbols:["classConstraints$macrocall$1$macrocall$1"],postprocess:pp.head2},{name:"classConstraints",symbols:["classConstraints$macrocall$1"],postprocess:pp.classConstraintsMany},{name:"parse$subexpression$1$string$1",symbols:[{literal:":"},{literal:":"}],postprocess:function joiner(d){return d.join("")}},{name:"parse$subexpression$1",symbols:["__","parse$subexpression$1$string$1","__"]},{name:"parse$ebnf$1$macrocall$2$string$1",symbols:[{literal:"="},{literal:">"}],postprocess:function joiner(d){return d.join("")}},{name:"parse$ebnf$1$macrocall$2",symbols:["__","parse$ebnf$1$macrocall$2$string$1","__"]},{name:"parse$ebnf$1$macrocall$3",symbols:["classConstraints"]},{name:"parse$ebnf$1$macrocall$1",symbols:["parse$ebnf$1$macrocall$3","parse$ebnf$1$macrocall$2"],postprocess:pp.head},{name:"parse$ebnf$1",symbols:["parse$ebnf$1$macrocall$1"],postprocess:id},{name:"parse$ebnf$1",symbols:[],postprocess:function(d){return null}},{name:"parse",symbols:["name","parse$subexpression$1","parse$ebnf$1","type"],postprocess:pp.parse}],ParserStart:"type"};if(typeof module!=="undefined"&&typeof module.exports!=="undefined"){module.exports=grammar}else{window.grammar=grammar}})()},{"./post-process.js":3}],2:[function(require,module,exports){"use strict";var nearley=require("nearley");var grammar=require("./grammar.js");function parse(which,input){var p=new nearley.Parser(grammar.ParserRules,which);p.feed(input);var result=p.results[0];if(result==null){throw new Error('Hindley Milner Parser: could not parse "'+input+'" as "'+which+'"')}else{return result}}var parseNames=["parse","name","classConstraints","type","fn","uncurriedFn","thunk","method","typeConstructor","constrainedType","list","record","typevar"];var parsers={};var _loop=function _loop(i){var name=parseNames[i];parsers[name]=function(input){return parse(name,input)}};for(var i=0;i<parseNames.length;++i){_loop(i)}module.exports=parsers},{"./grammar.js":1,nearley:5}],3:[function(require,module,exports){"use strict";var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"])_i["return"]()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i)}else{throw new TypeError("Invalid attempt to destructure non-iterable instance")}}}();function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}var node=function node(type,text,children){return{type:type,text:text,children:children}};var snode=function snode(type,children){return node(type,"",children)};var id=function id(x){return x};var nth=function nth(n){return function(d){return d[n]}};var head=function head(d){return d[0]};var head2=function head2(d){return d[0][0]};var last=function last(d){return d[d.length-1]};var pipe=function pipe(fns){return function(d){var x=d;for(var i=0;i<fns.length;++i){x=fns[i](x)}return x}};var pick=function pick(keys){return function(d){var e=[];for(var i=0;i<keys.length;++i){e.push(d[keys[i]])}return e}};var join=function join(x){return function(d){return d.join(x)}};module.exports={head:head,head2:head2,nth:nth,pick:pick,lower:head,upper:head,alpha:head2,word:function word(_ref){var _ref2=_slicedToArray(_ref,1),d=_ref2[0];return d.map(head).join("")},ufirst:function ufirst(_ref3){var _ref4=_slicedToArray(_ref3,2),x=_ref4[0],y=_ref4[1];return x+y.join("")},around:pick([0,2]),between:pipe([nth(1),head]),delim:function delim(_ref5){var _ref6=_slicedToArray(_ref5,2),x=_ref6[0],y=_ref6[1];return[head(x)].concat(_toConsumableArray(y.map(pipe([nth(1),head]))))},fn:function fn(d){return snode("function",head(d))},uncurriedFn:function uncurriedFn(d){return snode("uncurriedFunction",[snode("parameters",head(d)),last(d)])},thunk:function thunk(d){return snode("function",[snode("thunk",[]),head2(d)])},method:pipe([head,function(_ref7){var _ref8=_slicedToArray(_ref7,2),x=_ref8[0],y=_ref8[1];return snode("method",[head(x)].concat(_toConsumableArray(head(y))))}]),nullTypeConstructor:function nullTypeConstructor(_ref9){var _ref10=_slicedToArray(_ref9,1),x=_ref10[0];return node("typeConstructor",x,[])},manyTypeConstructor:function manyTypeConstructor(_ref11){var _ref12=_slicedToArray(_ref11,2),x=_ref12[0],y=_ref12[1];return node("typeConstructor",x,y.map(head))},constrainedType:function constrainedType(_ref13){var _ref14=_slicedToArray(_ref13,2),x=_ref14[0],y=_ref14[1];return node("constrainedType",x,y.map(head))},list:function list(d){return snode("list",d)},record:function record(d){return snode("record",head(d))},typevar:function typevar(d){return node("typevar",head(d),[])},keyVal:function keyVal(d){return node("field",head(d),[last(d)])},parse:function parse(_ref15){var _ref16=_slicedToArray(_ref15,4),name=_ref16[0],_=_ref16[1],_ref16$=_ref16[2],constraints=_ref16$===undefined?[]:_ref16$,type=_ref16[3];return{name:name,constraints:constraints?head(constraints):[],type:type}},name:pipe([head,join("")]),classConstraint:pipe([head,function(_ref17){var _ref18=_slicedToArray(_ref17,2),_ref18$=_slicedToArray(_ref18[0],1),typeclass=_ref18$[0],_ref18$2=_slicedToArray(_ref18[1],1),typevar=_ref18$2[0];return{typeclass:typeclass,typevar:typevar}}]),classConstraintsOne:id,classConstraintsMany:head}},{}],4:[function(require,module,exports){var HMP=require("hindley-milner-parser-js");function pluck(key,xs){var ys=[];for(var i=0;i<xs.length;++i){ys.push(xs[i][key])}return ys}function pipe(x,fs){for(var i=0;i<fs.length;++i){x=fs[i](x)}return x}function when(pred,f){return function(x){return pred(x)?f(x):x}}function isMethod(x){return x.type.type==="method"}function methodToFunction(x){var type=x.type;type.type="function";var a=type.children[0];var i;for(i=1;i<type.children.length-1;++i){type.children[i-1]=type.children[i]}type.children[i]=a;return x}function TypeClone(type){return{type:type.type,text:type.text,children:[]}}function _compileTypeVariables(type,state){var compiled=TypeClone(type);if(type.type==="typevar"){if(!(type.text in state.vars)){state.vars[type.text]="t"+state.counter;state.counter++}compiled.text=state.vars[type.text]}for(var i=0;i<type.children.length;++i){compiled.children.push(_compileTypeVariables(type.children[i],state))}return compiled}function compileTypeVariables(type){var state={counter:0,vars:{}};return _compileTypeVariables(type,state)}function indexParse(sig,i){var indexed=databaseParse(sig);indexed.signature=sig;indexed.pointer=i;return indexed}function databaseParse(sig){var x;try{x=HMP.parse(sig)}catch(e){x=nameParser(sig);x.type={type:"??",text:"",children:[]}}return x}var MATCH_ALL_TYPES={type:"*",text:"",children:[]};var MATCH_ALL={name:"*",constraints:[],type:MATCH_ALL_TYPES};function nameParser(x){x=x.trim();var spaceIdx=x.indexOf(" ");var name=spaceIdx>0?x.substr(0,spaceIdx):x;return{name:name,constraints:[],type:MATCH_ALL_TYPES}}var searchParsers=[HMP.parse,HMP.fn,HMP.method,HMP.typeConstructor,nameParser];function runParsers(x){var i;for(i=0;i<searchParsers.length;++i){try{return searchParsers[i](x)}catch(e){}}throw new Error("Could not parse search input ("+x+")")}function searchParse(x){if(x===""){return MATCH_ALL}else{var parsed=runParsers(x);if(!parsed.name){parsed={name:"*",constraints:[],type:parsed}}if(parsed.type.type!=="*"){parsed.type=compileTypeVariables(parsed.type)}return parsed}}function fuzzyScore(item,input){item=item.toLowerCase();var i=0;var j=0;var score=0;var run=1;for(;i<input.length;++i,++j){for(;j<item.length;++j){if(input[i]===item[j]){score+=run;run*=2;break}else{run=1}}if(j===item.length){return-1}}return score/item.length}function scoreCmp(a,b){if(a.score!==b.score){return b.score-a.score}else{return b.item.name>a.item.name?1:-1}}function scoreSort(x){return x.sort(scoreCmp)}function nameSearch(opts,input){return function(db){if(input==="*"){return db}else{if(opts.fuzzy){return nameSearchFuzzy(db,input)}else{return nameSearchSubstring(db,input)}}}}function nameSearchSubstring(db,input){input=input.toLowerCase();return db.filter(function(x){return x.name.toLowerCase().indexOf(input)>-1})}function nameSearchFuzzy(db,input){var i,item,score;var r=[];input=input.toLowerCase();for(i=0;i<db.length;++i){item=db[i];score=fuzzyScore(item.name,input);if(score>0){r.push({item:item,score:score})}}return pluck("item",scoreSort(r))}function typeSearch_(dbType,queryType){var isMatch=true;if(dbType.type!==queryType.type){isMatch=false}if(queryType.text.length>0&&dbType.text.indexOf(queryType.text)<0){isMatch=false}if(isMatch){if(queryType.children.length===0){return true}var j=0;for(var i=0;i<queryType.children.length;++i){var queryChild=queryType.children[i];for(;j<dbType.children.length;++j){if(typeSearch_(dbType.children[j],queryChild)){if(i===queryType.children.length-1){return true}++j;break}}if(j===dbType.children.length){return false}}throw new Error("??")}else{for(var i=0;i<dbType.children.length;++i){if(typeSearch_(dbType.children[i],queryType)){return true}}return false}}function typeSearch(type){return function(db){if(type.type==="*"){return db;
}var after=[];var i,entry;for(i=0;i<db.length;++i){entry=db[i];if(typeSearch_(entry.type,type)){after.push(entry)}}return after}}function compileIndexTypeVariables(item){item.type=compileTypeVariables(item.type);return item}function buildDb(sigs){return sigs.map(indexParse).map(when(isMethod,methodToFunction)).map(compileIndexTypeVariables)}function init(data,opts){if(opts==null){opts={fuzzy:true}}var db=buildDb(data);return{search:function search(input){var parsed=searchParse(input);return pipe(db,[nameSearch(opts,parsed.name),typeSearch(parsed.type)])}}}module.exports={init:init}},{"hindley-milner-parser-js":2}],5:[function(require,module,exports){(function(root,factory){if(typeof module==="object"&&module.exports){module.exports=factory()}else{root.nearley=factory()}})(this,function(){function Rule(name,symbols,postprocess){this.id=++Rule.highestId;this.name=name;this.symbols=symbols;this.postprocess=postprocess;return this}Rule.highestId=0;Rule.prototype.toString=function(withCursorAt){function stringifySymbolSequence(e){return e.literal?JSON.stringify(e.literal):e.toString()}var symbolSequence=typeof withCursorAt==="undefined"?this.symbols.map(stringifySymbolSequence).join(" "):this.symbols.slice(0,withCursorAt).map(stringifySymbolSequence).join(" ")+" ● "+this.symbols.slice(withCursorAt).map(stringifySymbolSequence).join(" ");return this.name+" → "+symbolSequence};function State(rule,dot,reference,wantedBy){this.rule=rule;this.dot=dot;this.reference=reference;this.data=[];this.wantedBy=wantedBy;this.isComplete=this.dot===rule.symbols.length}State.prototype.toString=function(){return"{"+this.rule.toString(this.dot)+"}, from: "+(this.reference||0)};State.prototype.nextState=function(data){var state=new State(this.rule,this.dot+1,this.reference,this.wantedBy);state.left=this;state.right=data;if(state.isComplete){state.data=state.build()}return state};State.prototype.build=function(){var children=[];var node=this;do{children.push(node.right);node=node.left}while(node.left);children.reverse();return children};State.prototype.finish=function(){if(this.rule.postprocess){this.data=this.rule.postprocess(this.data,this.reference,Parser.fail)}};function Column(grammar,index){this.grammar=grammar;this.index=index;this.states=[];this.wants={};this.scannable=[];this.completed={}}Column.prototype.process=function(nextColumn){var states=this.states;var wants=this.wants;var completed=this.completed;for(var w=0;w<states.length;w++){var state=states[w];if(state.isComplete){state.finish();if(state.data!==Parser.fail){var wantedBy=state.wantedBy;for(var i=wantedBy.length;i--;){var left=wantedBy[i];this.complete(left,state)}if(state.reference===this.index){var exp=state.rule.name;(this.completed[exp]=this.completed[exp]||[]).push(state)}}}else{var exp=state.rule.symbols[state.dot];if(typeof exp!=="string"){this.scannable.push(state);continue}if(wants[exp]){wants[exp].push(state);if(completed.hasOwnProperty(exp)){var nulls=completed[exp];for(var i=0;i<nulls.length;i++){var right=nulls[i];this.complete(state,right)}}}else{wants[exp]=[state];this.predict(exp)}}}};Column.prototype.predict=function(exp){var rules=this.grammar.byName[exp]||[];for(var i=0;i<rules.length;i++){var r=rules[i];var wantedBy=this.wants[exp];var s=new State(r,0,this.index,wantedBy);this.states.push(s)}};Column.prototype.complete=function(left,right){var inp=right.rule.name;if(left.rule.symbols[left.dot]===inp){var copy=left.nextState(right.data);this.states.push(copy)}};function Grammar(rules,start){this.rules=rules;this.start=start||this.rules[0].name;var byName=this.byName={};this.rules.forEach(function(rule){if(!byName.hasOwnProperty(rule.name)){byName[rule.name]=[]}byName[rule.name].push(rule)})}Grammar.fromCompiled=function(rules,start){if(rules.ParserStart){start=rules.ParserStart;rules=rules.ParserRules}var rules=rules.map(function(r){return new Rule(r.name,r.symbols,r.postprocess)});return new Grammar(rules,start)};function Parser(rules,start,options){if(rules instanceof Grammar){var grammar=rules;var options=start}else{var grammar=Grammar.fromCompiled(rules,start)}this.grammar=grammar;this.options={keepHistory:false};for(var key in options||{}){this.options[key]=options[key]}var column=new Column(grammar,0);var table=this.table=[column];column.wants[grammar.start]=[];column.predict(grammar.start);column.process();this.current=0}Parser.fail={};Parser.prototype.feed=function(chunk){for(var chunkPos=0;chunkPos<chunk.length;chunkPos++){var column=this.table[this.current+chunkPos];if(!this.options.keepHistory){delete this.table[this.current+chunkPos-1]}var n=this.current+chunkPos+1;var nextColumn=new Column(this.grammar,n);this.table.push(nextColumn);var token=chunk[chunkPos];var scannable=column.scannable;for(var w=scannable.length;w--;){var state=scannable[w];var expect=state.rule.symbols[state.dot];if(expect.test?expect.test(token):expect.literal===token){var next=state.nextState(token);nextColumn.states.push(next)}}nextColumn.process();if(nextColumn.states.length===0){var err=new Error("nearley: No possible parsings (@"+(this.current+chunkPos)+": '"+chunk[chunkPos]+"').");err.offset=this.current+chunkPos;throw err}}this.current+=chunkPos;this.results=this.finish();return this};Parser.prototype.rewind=function(index){if(!this.options.keepHistory){throw new Error("set option `keepHistory` to enable rewinding")}if(this.current<this.index){throw new Error("cannot rewind forward!")}this.table.splice(index+1);this.current=index;this.results=this.finish()};Parser.prototype.finish=function(){var considerations=[];var start=this.grammar.start;var column=this.table[this.table.length-1];column.states.forEach(function(t){if(t.rule.name===start&&t.dot===t.rule.symbols.length&&t.reference===0&&t.data!==Parser.fail){considerations.push(t)}});return considerations.map(function(c){return c.data})};return{Parser:Parser,Grammar:Grammar,Rule:Rule}})},{}],6:[function(require,module,exports){(function(){"use strict";var HMS=require("hindley-milner-search");function initSigNodes(resultsContainer){return Array.prototype.reduce.call(document.getElementById("toc").querySelectorAll("li a code"),function(r,_el){var el=document.createElement("div");el.appendChild(_el.parentNode.cloneNode(true));el.className="search-result";var k=el.childNodes[0].getAttribute("href");if(!Object.prototype.hasOwnProperty.call(r.set,k)){r.set[k]=true;r.uniqs.push(el)}return r},{set:{},uniqs:[]}).uniqs}window.addEventListener("DOMContentLoaded",function(){var $container=document.getElementById("yes-matches");var $containerNo=document.getElementById("no-matches");var $els=initSigNodes(document.getElementById("search-results"));var search=HMS.init(Array.prototype.map.call($els,function(el){return el.innerText.trim().split(/\s+/).join(" ")}),{fuzzy:false}).search;var $prevSearch="";var searchInput=document.getElementById("search-input");searchInput.focus();searchInput.addEventListener("keyup",function(event){var q=event.target.value;if(q!==$prevSearch){$prevSearch=q;var matches=search(q);$containerNo.style.display=matches.length===0&&q!==""?"block":"none";while($container.childNodes.length>0){$container.removeChild($container.childNodes[0])}matches.forEach(function(match){$container.appendChild($els[match.pointer])})}})})})()},{"hindley-milner-search":4}]},{},[6]);
