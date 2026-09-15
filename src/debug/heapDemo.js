import { buildCustomerCache } from "./customerCache.js";
import { buildSearchIndex } from "./searchIndex.js";
import { buildProductCatalog } from "./productCatalog.js";
import { createTemporaryReport } from "./reportCache.js";

const retainedBatches = [];

function buildRetainedCatalog(amount) {
  return {
    customers: buildCustomerCache(Math.floor(amount * 0.5)),
    products: buildProductCatalog(Math.floor(amount * 0.75)),
    searchIndex: buildSearchIndex(Math.floor(amount * 0.35))
  };
}

function runHeapDemo() {
  const retainedData = buildRetainedCatalog(12000);
  retainedBatches.push(retainedData);
  createTemporaryReport();
  console.log(
    `Retained entries: ${retainedData.customers.length} customers, ` +
      `${retainedData.products.length} products, ` +
      `${retainedData.searchIndex.length} search records`
  );
  console.log("Start CodeSkyline: Record Allocations now.");

  setInterval(() => {
    const nextBatch = buildRetainedCatalog(1500);
    retainedBatches.push(nextBatch);
    createTemporaryReport();
    console.log(
      `Allocated batch: ${nextBatch.customers.length} customers, ` +
        `${nextBatch.products.length} products, ` +
        `${nextBatch.searchIndex.length} search records`
    );
  }, 5000);
}

runHeapDemo();
