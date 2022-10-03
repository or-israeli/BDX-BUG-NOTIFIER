const nFetch = require("node-fetch");

const INTERVAL = parseInt(process.env.INTERVAL) || 3600000;
const SEARCHED_STRING = process.env.SEARCHED_STRING || "dalton-homes";
const WEBHOOK_URL = process.env.WEBHOOK_URL;
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
    await nFetch(WEBHOOK_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: `@channel 🦝searched string detected:🦝\n ${SEARCHED_STRING}`,
      }),
    });
  }
}
crawlPage();
