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
