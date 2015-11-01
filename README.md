# White Glove

![White Glove](http://newimages.bwwstatic.com/upload10/658369/molesley-wears-white-gloves.jpg)

## Data so clean, even Mr. Carson would approve

This tool can scan records from databases or other data sources, analyze the data, and find anomalies that may be worthy of developer attention.

You may find it value as both or either of:

1. A data quality/consistency checker
2. A schema discovery tool
  - Run on an unfamiliar data set to understand the implicit schema including all property names/paths and all data types

## Installation

```
npm install
export PATH="${PWD}/node_modules/.bin":$PATH
```

Installing with `npm -g` is not necessary nor recommended. Just adjust your `PATH` properly.

## Scanning MongoDB

`white-glove --url mongodb://somehost/somedb --collection somecollection`

## Scanning CouchDB

`white-glove --host somehost --database somedb --view some/view`

## Full Command Line Options

- `--host=somehost`
- `--port=5984`
- `--username=alice`
- `--password=s3cr3t`
- `--secure=true`

## Scanning Object Streams

If you want to scan any arbitrary stream of objects from a node.js application, load this module and use the `scanStream(error, stream)` API:

```js
var scanStream = require('white-glove/scan/stream')

// scanStream takes (error, stream) so it can be directly passed as callback
// to the function that gets your stream
getYourStream(scanStream)
```

## Rule Interpretation

- **inconsistent types**: A given property is represented by several different types in the data set. This means all code that uses this property must handle all possible types correctly. Thus this is a likely source of bugs and inconsistent processing.
  - **Recommendation**: Use a single type to consistently model this property
- **inconsistent patterns**: A string property contains values that look like several different types of data. For example, mostly URLs but a few email addresses. This indicates perhaps data has evolved inconsistently over time or bugs have contaminated this field with erroneous data.
  - **Recommendation**: Examine data and normalize to a standard format if appropriate. Make input validation stricter.
- **inconsistent use of arrays**: there is a mix of arrays and other types at a given key path. This makes coding difficult and can cause exceptions as well as incorrect conditional logic because empty arrays are truthy in JavaScript.
  - **Recommendation**: change the data to use arrays consistently, including empty arrays instead of null/undefined.
- **String Pattern Analysis: integer**: If a property is stored as a string but those strings are purely numeric, consider it as a number.
