# sfcc-inventory-feed

## Install

Using npm:

```console
$ npm install
```

## Usage
To use the module, Download the product details from BM in CSV format , mention the absolute path of CSV 
in config.js e.g. CSV_INPUT_FILE : "{PATH_OF_CSV/XXX}.csv"

```console
$ node index.js
or 
$ npm run generate:inventoryfeed
```

Below  command will generate , zip and upload the inventory file to instance mentioned in config file

```console
$ npm run generate:inventoryfeed:upload
```