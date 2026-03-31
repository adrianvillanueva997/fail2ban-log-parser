.PHONY: build test

UV := uv

build:
	$(UV) run maturin develop --release

test:
	$(UV) run pytest tests/ -v
