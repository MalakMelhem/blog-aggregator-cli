import { getFeedByURL } from '../lib/db/queries/feeds.js';
import { createFeedFollow } from '../lib/db/queries/feedFollows.js';
import { User } from '../lib/db/schema.js';
import { getFeedFollow } from '../lib/db/queries/feedFollows.js';

export async function handlerFollow(cmdName: string, user: User, ...args: string[]) {
    const url=args[0];
    if(!url){
        console.log("URL is required");
    }
    const feed= await getFeedByURL(url);

    if (!feed) {
    console.error("Feed not found");
    return;
    }
      // Check if user already follows this feed
    const existingFollow = await getFeedFollow(user.id, feed.id);
    if (existingFollow) {
        console.log(`${user.name} is already following ${feed.name}`);
        return;
    }
    const feedFollow = await createFeedFollow(user.id, feed.id);
    console.log(`${feedFollow.userName} is now following ${feedFollow.feedName}`);
}