dev:
	yarn run dev

build:
	yarn run build

lint:
	yarn run lint

format:
	yarn run format

clean:
	rm -rf .next/ dist/ public/sw.js public/sw.js.map public/workbox-*.js public/workbox-*.js.map yarn-error.log
