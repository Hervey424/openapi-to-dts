# openapi2dts

---

[![npm version](https://badge.fury.io/js/openapi2dts.svg)](https://badge.fury.io/js/openapi2dts)

Generates TypeScript definition file(d.ts) from OpenApi3

## Install

```
$ npm install -g openapi2dts
```

## Usage

```
  Usage: openapi2dts -i [input] -o [output] -ns [namespace]

  Options:

    -i, --input                     Input file path or Url.
    -o, --output                    Output filt path.
    -ns, --namespace                Namespace.
```

### Example

```
$ openapi2dts -i swagger.json -o swagger.d.ts --ns API
```
