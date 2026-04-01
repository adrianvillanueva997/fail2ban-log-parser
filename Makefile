.PHONY: all fmt fmt-check clippy lint test check test-core
.PHONY: test-wasm test-js test-python build-js build-wasm build-python bench-js

CARGO := cargo
MAKE := make

all: lint check test

fmt:
	$(CARGO) fmt --all

fmt-check:
	$(CARGO) fmt --all -- --check

clippy:
	$(CARGO) clippy --workspace --all-features -- -D warnings

lint: fmt-check clippy

check:
	$(CARGO) check --workspace --all-features

test: test-core

test-core:
	$(CARGO) test -p fail2ban-log-parser-core --all-features

test-wasm:
	$(MAKE) -C bindings/wasm-fail2ban-log-parser test

test-js:
	$(MAKE) -C bindings/js-fail2ban-log-parser test

test-python:
	$(MAKE) -C bindings/py-fail2ban-log-parser test

build-js:
	$(MAKE) -C bindings/js-fail2ban-log-parser build

build-wasm:
	$(MAKE) -C bindings/wasm-fail2ban-log-parser build

bench-js:
	$(MAKE) -C bindings/js-fail2ban-log-parser bench

build-python:
	$(MAKE) -C bindings/py-fail2ban-log-parser build
