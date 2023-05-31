import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { download } from "https://deno.land/x/download/mod.ts";

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

  await Deno.mkdir("./output");

  for (const linkElement of transparencyDataLinkElements || []) {
    const url = linkElement.getAttribute("href");

    const transparencyDataPageResponse = await fetch(
      `https://www.gov.uk${url}`,
    );
    const transparencyDataPageHtml = await transparencyDataPageResponse
      .text();
    const transparencyDataPageDocument = parser.parseFromString(
      transparencyDataPageHtml,
      "text/html",
    );
    const csvDownloadUrlElements = transparencyDataPageDocument
      ?.querySelectorAll(
        'a[href$=".csv"]',
      ) as Element[] | undefined;

    console.log(
      transparencyDataPageDocument?.querySelector(".gem-c-title__text")
        ?.textContent,
    );

    for (const csvDownloadUrlElement of csvDownloadUrlElements || []) {
      const csvDownloadUrl = csvDownloadUrlElement.getAttribute("href");
      if (csvDownloadUrl === null) {
        continue;
      }
      await download(csvDownloadUrl, {
        dir: "./output",
      });
    }
  }
}

main();
