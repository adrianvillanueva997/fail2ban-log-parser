.PHONY: fmt fmt-check clippy lint test test-core test-wasm test-js test-python build-js bench-js build-python check all

fmt:
	cargo fmt --all

fmt-check:
	cargo fmt --all -- --check

clippy:
	cargo clippy --workspace --all-features -- -D warnings

lint: fmt-check clippy

test:
	cargo test --workspace --all-features

test-core:
	cargo test -p fail2ban-log-parser-core --all-features

test-wasm:
	cd bindings/wasm-fail2ban-log-parser && wasm-pack test --node

build-js:
	cd bindings/js-fail2ban-log-parser && pnpm install && pnpm build

bench-js:
	cd bindings/js-fail2ban-log-parser && pnpm bench

test-js:
	cd bindings/js-fail2ban-log-parser && pnpm test

build-python:
	cd bindings/py-fail2ban-log-parser && uv run maturin develop --release

test-python:
	cd bindings/py-fail2ban-log-parser && uv run pytest tests/ -v

check:
	cargo check --workspace --all-features

all: lint check test
