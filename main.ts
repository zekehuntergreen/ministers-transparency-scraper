async function main() {
  const collectionPageResponse = await fetch(
    "https://www.gov.uk/government/collections/ministers-transparency-publications",
  );
  const collectionPageHtml = await collectionPageResponse.text();
  console.log(collectionPageHtml);
}

main();
