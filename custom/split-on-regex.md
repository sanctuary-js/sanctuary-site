  - `forall s :: String, t :: String.
     S.joinWith (s)
                (S.splitOnRegex (S.regex ('g') (S.regexEscape (s))) (t))
     = t`

===============================================================================

  - `forall s :: String, t :: String.
     S.joinWith (s) (S.splitOnRegex (S.regex ('g') (S.regexEscape (s))) (t))
     = t`
