const { create } = require("xmlbuilder2");
const csv = require("csv-parser");
var fs = require("fs");
var results = [];

// TOBE Change as per the requirment

// NAME OF CSV input file
const CSV_INPUT_FILE = "ks-na-master-catalog.csv";
// NAME of XML output file 
const XML_OUTPUT_FILE = "KS-NA-FP-DC-All-Stores-Inventory.xml";
// ID of inventory ID 
const INVENTORY_LIST_ID = "KS-NA-FP-DC-All-Stores-Inventory";

fs.createReadStream(CSV_INPUT_FILE)
  .pipe(csv({skipLines: 1,headers:['ID']}))
  .on("data", (row) => {
    results.push(row.ID);
  })
  .on("end", () => {
    createXML(results);
  });

/**
 * @param {List} List of product ID
 * create xml based on product ids 
 */
function createXML(list) {
  const doc = create({ version: "1.0" })
    .ele("inventory")
    .att("xmlns", "http://www.demandware.com/xml/impex/inventory/2007-05-31");
  var inventoryList = doc.ele("inventory-list");
  var header = inventoryList.ele("header").att("list-id", INVENTORY_LIST_ID);
  header.ele("default-instock").txt("false");
  header.ele("description").txt("Product Sku US DC and US Stores");
  header.ele("use-bundle-inventory-only").txt("false");
  header.ele("on-order").txt("false");
  var records = inventoryList.ele("records");
  list.forEach(function (item) {
    var record = records.ele("record");
    record.att("product-id", item), record.ele("allocation").txt("999999");
    record.ele("allocation-timestamp").txt(new Date().toISOString());
    record.ele("perpetual").txt("false");
    record.ele("preorder-backorder-handling").txt("none");
    record.ele("preorder-backorder-allocation").txt("0");
    record.ele("ats").txt("999999");
    record.ele("on-order").txt("0");
  });

  const xml = doc.end({ prettyPrint: true });

  fs.writeFile(XML_OUTPUT_FILE, xml, function () {
    console.log("Xml generated");
  });
}