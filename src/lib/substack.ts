import posts from '../data/blog-posts.json';

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

export function getSubstackPosts(): SubstackPost[] {
  // Posts are cached in a committed JSON file (see scripts/update-posts.mjs)
  // instead of being fetched over the network at build time — cloud build
  // runners (Netlify/GitHub Actions) intermittently fail the RSS fetch.
  return posts as SubstackPost[];
}