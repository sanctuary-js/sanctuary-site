```javascript
S.inc('XXX');
// ! TypeError: Invalid value
//
//   inc :: FiniteNumber -> FiniteNumber
//          ^^^^^^^^^^^^
//               1
//
//   1)  "XXX" :: String
//
//   The value at position 1 is not a member of ‘FiniteNumber’.
```

===============================================================================

```javascript
> S.inc('XXX')
! Invalid value

inc :: FiniteNumber -> FiniteNumber
       ^^^^^^^^^^^^
            1

1)  "XXX" :: String

The value at position 1 is not a member of ‘FiniteNumber’.
```
