import { XMLParser } from "fast-xml-parser";

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
 try {
 const response = await fetch(feedURL, { headers: { "User-Agent": "gator" } });
 if (!response.ok) 
  throw new Error(`Failed to fetch feed: ${response.status}`);
 const xmlText = await response.text();

 const parser = new XMLParser({ ignoreAttributes: false });
 const parsed = parser.parse(xmlText);

 const channel = parsed?.rss?.channel;
 if (!channel)
     throw new Error("RSS feed missing channel field");

 const title = channel.title;
 const link = channel.link;
 const description = channel.description;

 let items = [];
if (channel.item) {
  const rawItems = Array.isArray(channel.item) ? channel.item : [channel.item];
  items = rawItems.map((i : any)=> ({
  title: i.title,
  link: i.link,
  description: i.description,
  pubDate: i.pubDate
}));
}
 
return { channel: { title, link, description, item: items } };

} catch (err) {
    console.error("Error fetching RSS feed:", err);
    throw err;
  }
}