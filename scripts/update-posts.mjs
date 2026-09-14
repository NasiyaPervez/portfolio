// Fetch posts from the Substack RSS feed and write them to src/data/blog-posts.json.
// Run this after publishing a new Substack post, then commit the updated JSON.
//   node scripts/update-posts.mjs
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const rssUrl = 'https://nasiyapervez22.substack.com/feed';
const outFile = fileURLToPath(new URL('../src/data/blog-posts.json', import.meta.url));

async function main() {
  const res = await fetch(rssUrl, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) {
    console.error(`Substack fetch failed: ${res.status} ${res.statusText}`);
    process.exit(1);
  }
  const xml = await res.text();

  const posts = [];
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

  for (const item of items) {
    const title = (item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/) || [])[1]?.trim();
    const link = (item.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/) || [])[1]?.trim();
    const pubDate = (item.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1]?.trim();
    const description = (item.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/) || [])[1]?.trim();
    if (title && link) {
      posts.push({ title, link, pubDate, description });
    }
  }

  writeFileSync(outFile, JSON.stringify(posts, null, 2) + '\n');
  console.log(`Wrote ${posts.length} posts to src/data/blog-posts.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});