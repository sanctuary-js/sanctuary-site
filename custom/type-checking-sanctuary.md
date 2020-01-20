```javascript
S.add (2) (true);
// ! TypeError: Invalid value
//
//   add :: FiniteNumber -> FiniteNumber -> FiniteNumber
//                          ^^^^^^^^^^^^
//                               1
//
//   1)  true :: Boolean
//
//   The value at position 1 is not a member of ‘FiniteNumber’.
//
//   See https://github.com/sanctuary-js/sanctuary-def/tree/v0.21.1#FiniteNumber for information about the FiniteNumber type.
```

===============================================================================

```javascript
> S.add (2) (true)
! Invalid value

add :: FiniteNumber -> FiniteNumber -> FiniteNumber
                       ^^^^^^^^^^^^
                            1

1)  true :: Boolean

The value at position 1 is not a member of ‘FiniteNumber’.

See https://github.com/sanctuary-js/sanctuary-def/tree/v0.21.1#FiniteNumber for information about the FiniteNumber type.
```
