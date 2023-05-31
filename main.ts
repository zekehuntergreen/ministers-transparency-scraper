import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

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
  const transparencyDataLinkElements = collectionPageDocument?.querySelectorAll(
    "a.gem-c-document-list__item-title",
  ) as Element[] | undefined;

  for (const linkElement of transparencyDataLinkElements || []) {
    const url = linkElement.getAttribute("href");
    console.log(url);
  }
}

main();
