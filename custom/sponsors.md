## <span id="section:folktale">❑ Folktale</span>

===============================================================================

## <span id="section:sponsors">❑ Sponsors</span>

Development of Sanctuary is funded by the following community-minded
__partners__:

  - <p>
      <a id="logo-fink" href="https://www.fink.no/">
        <svg viewBox="0 0 100 44" xmlns="http://www.w3.org/2000/svg">
          <shell>
            curl --silent https://www.fink.no/images/fink.svg \
            | sed -E -n 's,<path d="([^"]*)" fill="[^"]*"/>,\1,p' \
            | sed -E 's,([A-Z]), \1 ,g' \
            | xargs node --eval '
              let idx = 1;
              const next = () => process.argv[idx++];
              const vert = () => (next () * 1e6 + 44 * 1e6 - 43.5185 * 1e6) / 1e6;
              const tokens = [];
              while (idx < process.argv.length) {
                switch (process.argv[idx]) {
                  case "M":
                  case "L":
                    tokens.push (next (), next (), vert ());
                    break;
                  case "H":
                    tokens.push (next (), next ());
                    break;
                  case "V":
                    tokens.push (next (), vert ());
                    break;
                  case "C":
                    tokens.push (next (), next (), vert (), next (), vert (), next (), vert ());
                    break;
                  case "Z":
                    tokens.push (next ());
                    break;
                }
              }
              process.stdout.write (`<path d="${tokens.join (" ")}" />`);
            '
          </shell>
        </svg>
      </a>
      is a small, friendly, and passionate gang of IT consultants.
      We love what we do, which is mostly web and app development,
      including graphic design, interaction design, back-end and
      front-end coding, and ensuring the stuff we make works as intended.
      Our company is entirely employee-owned; we place great importance on
      the well-being of every employee, both professionally and personally.
    </p>

Development of Sanctuary is further encouraged by the following generous
__supporters__:

  - [@voxbono](https://github.com/voxbono)
  - [@syves](https://github.com/syves)
  - [@Avaq](https://github.com/Avaq)
  - [@kabo](https://gitlab.com/kabo)
  - [@o0th](https://github.com/o0th)
  - [@identinet](https://github.com/identinet)

[Become a sponsor](https://github.com/sponsors/davidchambers) if you would like
the Sanctuary ecosystem to grow even stronger.

## <span id="section:folktale">❑ Folktale</span>
