import { getNextFeedToFetch, markFeedFetched } from '../lib/db/queries/feeds.js';
import { fetchFeed,RSSFeed } from '../rss/fetchFeed.js';
import { createPost } from '../lib/db/queries/posts.js';

export async function scrapeFeeds() {
  const feed = await getNextFeedToFetch();

  if (!feed) {
    console.log("No feeds found.");
    return;
  }

  console.log(`Fetching: ${feed.name}`);
  await markFeedFetched(feed.id);
try {
  const rss:RSSFeed = await fetchFeed(feed.url);

  for (const item of rss.channel.item) {
    console.log(`- ${item.title}`);

    const publishedAt = item.pubDate ? new Date(item.pubDate) : new Date();
      await createPost({
        title: item.title,
        url: item.link,
        description: item.description,
        publishedAt,
        feedId: feed.id,
      });
  }

  } catch (err) {
    console.error("Failed to fetch RSS feed:", err);
  }
 
}