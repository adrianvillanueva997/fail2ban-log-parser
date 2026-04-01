.PHONY: build test bench

UV := uv

build:
	$(UV) run maturin develop --release

test:
	$(UV) run pytest tests/ -v

bench:
	$(UV) run python benchmark/bench.py
