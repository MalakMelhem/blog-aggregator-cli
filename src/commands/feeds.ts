import { getFeedsWithUsers} from '../lib/db/queries/feeds.js';

export async function handlerFeeds(cmdName: string, ...args: string[]) {
    const feeds= await getFeedsWithUsers();

    if (feeds.length === 0) {
    console.log("No feeds found.");
    process.exit(0);
    }

    for(const feed of feeds){
        console.log(feed.feedName);
        console.log(feed.feedUrl);
        console.log(`added by: ${feed.userName}\n`);

    }

    process.exit(0);
}