ESLINT = node_modules/.bin/eslint --report-unused-disable-directives
NPM = npm

ADT = $(shell find adt -name '*.js' | sort)
CUSTOM = $(shell find custom -name '*.md' | sort)
VENDOR = ramda sanctuary sanctuary-def sanctuary-descending sanctuary-either sanctuary-identity sanctuary-maybe sanctuary-pair sanctuary-show sanctuary-type-classes sanctuary-type-identifiers
VENDOR_CHECKS = $(patsubst %,check-%-version,$(VENDOR))
FILES = favicon.png index.html mask-icon.svg $(patsubst %,vendor/%.js,$(VENDOR))


.PHONY: all
all: $(FILES)

favicon.png: node_modules/sanctuary-logo/sanctuary-favicon.png
	cp '$<' '$@'

index.html: scripts/generate node_modules/sanctuary/README.md env.js $(ADT) $(CUSTOM)
	'$<' node_modules/sanctuary

mask-icon.svg: node_modules/sanctuary-logo/sanctuary-mask-icon.svg
	cp '$<' '$@'

vendor/ramda.js: node_modules/ramda/dist/ramda.js
	cp '$<' '$@'

vendor/%.js: node_modules/%/index.js
	cp '$<' '$@'


.PHONY: $(VENDOR_CHECKS)
$(VENDOR_CHECKS): check-%-version:
	node -e 'require("assert").strictEqual(require("$*/package.json").version, require("./package.json").dependencies["$*"])'


.PHONY: clean
clean:
	rm -f -- $(FILES)


.PHONY: lint
lint:
	$(ESLINT) --config node_modules/sanctuary-style/eslint-es6.json -- scripts/generate
	$(ESLINT) -- behaviour.js adt/List.js adt/Sum.js env.js
	make clean
	make
	git diff --exit-code


.PHONY: setup
setup:
	$(NPM) install


.PHONY: test
test: $(VENDOR_CHECKS)
