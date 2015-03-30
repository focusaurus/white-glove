# White Glove

## Data so clean, even Mr. Carson would approve

This tool can scan records from databases or other data sources, analyze the data, and find anomalies that may be worthy of developer attention.

### Scanning MongoDB

`./scanMongodb.js --url mongodb://somehost/somedb --collection somecollection`

### Scanning CouchDB

`./scanCouchdb.js --host somehost --database somedb --view some/view`

Full options:

- `--host=somehost`
- `--port=5984`
- `--username=alice`
- `--password=s3cr3t`
- `--secure=true`

# Rule Interpretation

- "inconsistent use of arrays": there is a mix of arrays and other types at a given key path. This makes coding difficult and can cause exceptions as well as incorrect conditional logic because empty arrays are truthy in JavaScript.
  - **Recommendation**: change the data to use arrays consistently, including empty arrays instead of null/undefined.
