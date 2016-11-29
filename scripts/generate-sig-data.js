#!/usr/bin/env node

'use strict';

const fs                = require('fs');
const path              = require('path');

const R                 = require('ramda');
const S                 = require('sanctuary');
const $                 = require('sanctuary-def');
const HMP               = require('hindley-milner-parser-js');

const Either            = S.EitherType;
const I                 = S.I;
const K                 = S.K;
const Left              = S.Left;
const Right             = S.Right;
const _                 = R.__;
const all               = R.all;
const ap                = R.ap;
const apply             = R.apply;
const assoc             = R.assoc;
const at                = S.at;
const binary            = R.binary;
const chain             = R.chain;
const compose           = S.compose;
const compose_          = R.compose;
const concat            = R.concat;
const cond              = R.cond;
const contains          = R.contains;
const curry             = R.curry;
const drop_             = R.drop;
const either            = S.either;
const encaseEither      = S.encaseEither;
const encaseEither2     = S.encaseEither2;
const equals            = R.equals;
const flip              = S.flip;
const get               = S.get;
const head_             = R.head;
const ifElse            = S.ifElse;
const isRight           = S.isRight;
const join              = R.join;
const juxt              = R.juxt;
const lefts             = S.lefts;
const lensIndex         = R.lensIndex;
const lift2             = S.lift2;
const lines             = S.lines;
const lt                = R.lt;
const map               = R.map;
const match_            = R.match;
const maybeToEither     = S.maybeToEither;
const over              = R.over;
const pair              = R.pair;
const pipe              = S.pipe;
const prepend           = R.prepend;
const prop              = R.prop;
const propEq            = R.propEq;
const replace           = R.replace;
const rights            = S.rights;
const slice_            = R.slice;
const split             = R.split;
const tail              = R.tail;
const toString          = R.toString;
const trim              = R.trim;
const unapply           = R.unapply;
const unlines           = S.unlines;
const unnest            = R.unnest;

const reset             = '\u001B[0m';
const red               = '\u001B[31m';
const green             = '\u001B[32m';

const env               = concat($.env, [Either]);
const def               = $.create({checkTypes: true, env: env});

//    readFile :: String -> Either String String
const readFile =
def('readFile',
    {},
    [$.String, Either($.String, $.String)],
    encaseEither(prop('message'), compose(String, fs.readFileSync)));

//    writeFile :: String -> String -> Either String String
const writeFile =
def('writeFile',
    {},
    [$.String, $.String, Either($.String, $.String)],
    encaseEither2(prop('message'), lift2(K, K, binary(fs.writeFileSync))));

const traverseProp = R.curry((key, f) => lift2(
  map,
  o => x => assoc(key, x, o),
  o => f(o[key]))
);

//    parseFns :: String -> String
const parseFns =
def('parseFns',
    {},
    [$.String, $.String],
    pipe([
      lines,
      S.mapMaybe(S.match(/^<h4 name="(.*?)"><code><a href=".*?">(.*?)<\/a>/)),
      map(pipe([
        R.tail,
        R.sequence(S.Maybe.of),
        map(([a, sig]) => ({
          a,
          sig,
          data: sig,
        })),
      ])),
      S.mapMaybe(chain(traverseProp('data', S.encase(HMP.parse)))),
      JSON.stringify,
      R.concat('window.sigData = '),
    ]));

//    readme :: String -> Either String String
const readme =
  def('readme',
    {},
    [$.String, Either($.String, $.String)],
    pipe([
      flip(path.join)('README.md'),
      readFile]));

//    failure :: String -> Undefined
const failure = s => {
  process.stderr.write(`${red}${s}${reset}\n`);
  process.exit(1);
};

//    success :: String -> Undefined
const success = s => {
  process.stdout.write(`${green}Successfully created ${s}${reset}\n`);
  process.exit(0);
};

pipe([at(2),
      maybeToEither('Missing command-line argument'),
      chain(readme),
      map(parseFns),
      chain(writeFile('sig-data.js')),
      either(failure, success)],
     process.argv);
