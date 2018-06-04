Sanctuary makes it possible to write safe code without null checks.
In JavaScript it's trivial to introduce a possible run-time type error:

    words[0].toUpperCase()

If `words` is `[]` we'll get a familiar error at run-time:

    TypeError: Cannot read property 'toUpperCase' of undefined

Sanctuary gives us a fighting chance of avoiding such errors. We might
write:

    S.map (S.toUpper) (S.head (words))

===============================================================================

Sanctuary makes it possible to write safe code without null checks.
In JavaScript it's trivial to introduce a possible run-time type error.

Try changing `words` to `[]` in the REPL below. Hit _return_ to re-evaluate.

```javascript
> words = ['foo', 'bar', 'baz']
undefined

> words[0].toUpperCase()
"FOO"

> S.map (S.toUpper) (S.head (words))
Nothing ("FOO")
```
