BROWSERIFY = node_modules/.bin/browserify
ESLINT = node_modules/.bin/eslint
NPM = npm

CUSTOM = $(shell find custom -name '*.md' | sort)
VENDOR = ramda sanctuary sanctuary-def sanctuary-type-classes sanctuary-type-identifiers
VENDOR_CHECKS = $(patsubst %,check-%-version,$(VENDOR))
FILES = favicon.png index.html js/hm-search.js js/signatures.sanctuary.js $(patsubst %,vendor/%.js,$(VENDOR))


.PHONY: all
all: $(FILES)

favicon.png: node_modules/sanctuary-logo/sanctuary-favicon.png
	cp '$<' '$@'

index.html: scripts/generate node_modules/sanctuary/README.md $(CUSTOM)
	'$<' node_modules/sanctuary

vendor/ramda.js: node_modules/ramda/dist/ramda.js
	cp '$<' '$@'

vendor/%.js: node_modules/%/index.js
	cp '$<' '$@'

js/hm-search.js: node_modules/hindley-milner-search/hm-search.js Makefile
	$(BROWSERIFY) --standalone HMS -- '$<' >'$@'

js/signatures.%.js: node_modules/%/index.js Makefile
	( echo "window['signatures/$*'] = [" && sed -n "s!^ *//# \(.*\)!  '\1',!p" '$<' && echo "];" ) >'$@'


.PHONY: $(VENDOR_CHECKS)
$(VENDOR_CHECKS): check-%-version:
	node -e 'require("assert").strictEqual(require("$*/package.json").version, require("./package.json").dependencies["$*"])'


.PHONY: clean
clean:
	rm -f -- $(FILES)


.PHONY: lint
lint:
	$(ESLINT) \
	  --config node_modules/sanctuary-style/eslint-es6.json \
	  --env es6 \
	  --env node \
	  --rule 'indent: [off]' \
	  --rule 'max-len: [off]' \
	  --rule 'prefer-template: [off]' \
	  -- scripts/generate
	$(ESLINT) \
	  --config node_modules/sanctuary-style/eslint-es3.json \
	  --env es3 \
	  --env browser \
	  -- behaviour.js
	make clean
	make
	git diff --exit-code


.PHONY: setup
setup:
	$(NPM) install


.PHONY: test
test: $(VENDOR_CHECKS)
