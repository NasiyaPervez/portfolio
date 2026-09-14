export async function getSubstackPosts() {
  const rssUrl = 'https://nasiyapervez22.substack.com/feed';

  try {
    const res = await fetch(rssUrl, { signal: AbortSignal.timeout(10000) });

    if (!res.ok) {
      console.error('Substack fetch failed', res.status, res.statusText);
      return [];
    }
    const xml = await res.text();

    // Parse the XML (simple + robust)
    const posts = [];
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

    for (const item of items) {
      const title = (item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/) || [])[1]?.trim();
      const link = (item.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/) || [])[1]?.trim();
      const pubDate = (item.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1]?.trim();
      const description = (item.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/) || [])[1]?.trim();

      if (title && link) {
        posts.push({
          title,
          link,
          pubDate,
          description,
        });
      }
    }

    console.log(`Substack RSS: fetched ${posts.length} posts`);
    return posts;
  } catch (err) {
    console.error('Substack RSS fetch error:', err);
    return [];
  }
}