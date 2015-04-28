DEFAULT:
	make test

test:
	./node_modules/.bin/mocha $(ARGS) test/api

.PHONY: \
	DEFAULT \
	test \
