import { createFeed } from '../lib/db/queries/feeds.js';
import { createFeedFollow } from '../lib/db/queries/feedFollows.js';
import {User, Feed} from "../lib/db/schema";



export async function handlerAddFeed(cmdName: string, user: User, ...args: string[]) {
const [name, url] = args;
  if (!name || !url) {
    console.log("Usage: addfeed <name> <url>");
  }
 
const feed = await createFeed(name, url, user.id);
console.log("Feed added successfully!\n");

const feedFollow = await createFeedFollow(user.id, feed.id);
console.log(`${feedFollow.userName} is now following ${feedFollow.feedName}`);

printFeed(feed, user);
}


function printFeed(feed: Feed, user: User) {
  console.log("Feed ID:", feed.id);
  console.log("Created:", feed.createdAt);
  console.log("Updated:", feed.updatedAt);
  console.log("Name:", feed.name);
  console.log("URL:", feed.url);
  console.log("Added by:", user.name);
}