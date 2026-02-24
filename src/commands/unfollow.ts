import { getFeedByURL } from '../lib/db/queries/feeds.js';
import { deleteFeedFollow } from '../lib/db/queries/feedFollows.js';
import { User } from '../lib/db/schema.js';

export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]) {
    const url=args[0];
    if(!url){
        console.log("URL is required");
    }
    const feed= await getFeedByURL(url);

    if (!feed) {
    console.error("Feed not found");
    }

    await deleteFeedFollow(user.id, feed.id);
    console.log(`${user.name} is now unfollowing ${feed.name}`);
}