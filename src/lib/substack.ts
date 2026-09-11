import { XMLParser } from 'fast-xml-parser';

export async function getSubstackPosts() {
const rssUrl = 'https://nasiyapervez22.substack.com/feed';
  
  const res = await fetch(rssUrl);
  const text = await res.text();
  
  const parser = new XMLParser();
  const data = parser.parse(text);
  
  return data.rss.channel.item.map((item: any) => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    description: item.description,
  }));
}