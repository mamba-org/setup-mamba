# setup-mamba

![build-test](https://github.com/TheSnakePit/setup-mamba/workflows/build-test/badge.svg)

A GitHub Action to setup [mamba](https://github.com/QuantStack/mamba).

## Usage

```yaml
steps:
  - uses: actions/checkout@v2
  - uses: TheSnakePit/setup-mamba@v1
  - run: mamba info
  - run: mamba install -c conda-forge python
  - run: mamba list
```
