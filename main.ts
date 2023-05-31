import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

async function main() {
  const collectionPageResponse = await fetch(
    "https://www.gov.uk/government/collections/ministers-transparency-publications",
  );
  const collectionPageHtml = await collectionPageResponse.text();
  const parser = new DOMParser();
  const collectionPageDocument = parser.parseFromString(
    collectionPageHtml,
    "text/html",
  );
  console.log(collectionPageDocument);
}

main();
