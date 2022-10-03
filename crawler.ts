const nFetch = require("node-fetch");

const INTERVAL = parseInt(process.env.interval) || 3600000;
const SEARCHED_STRING = process.env.searchedString || "dalton-homes";
setInterval(crawlPage, INTERVAL);

async function crawlPage() {
  const res = await nFetch("https://www.smithdouglas.com/sitemap.xml", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
    },
  });
  const resInText = await res.text();
  if (resInText.toLowerCase().includes(SEARCHED_STRING)) {
    await nFetch(
      "https://hooks.slack.com/services/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",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: `@here 🦝searched string detected:🦝\n ${SEARCHED_STRING}`,
        }),
      }
    );
  }
}
crawlPage();
