# check for eslint
HASESLINT := $(shell which eslint 2> /dev/null)
# check for prettier
HASPRETTIER := $(shell which prettier 2> /dev/null)
# check for stylelint
# HASSTYLELINT := $(shell which stylelint 2> /dev/null)

# check for eslint
ifdef HASESLINT
	ESLINT := eslint
else
	ESLINT := npx eslint
endif

# check for prettier
ifdef HASPRETTIER
	PRETTIER := prettier
else
	PRETTIER := npx prettier
endif

# ifeq ($(HASSTYLELINT),)
# $(error "No stylelint in PATH, please install stylelint")
# endif

.PHONY: dev
dev: # clean previous build files
	@make clean
	yarn run dev

.PHONY: build
build:
	yarn run build

.PHONY:lint
lint:
	yarn run lint

.PHONY: format
format:
	yarn run format

.PHONY: clean
clean:
	rm -rf .next/ dist/ public/sw.js public/sw.js.map public/workbox-*.js public/workbox-*.js.map yarn-error.log .swc/

.PHONY: verbose-clean
verbose-clean:
	rm -rf node_modules/ .next/ dist/ public/sw.js public/sw.js.map public/workbox-*.js public/workbox-*.js.map yarn-error.log .swc/
