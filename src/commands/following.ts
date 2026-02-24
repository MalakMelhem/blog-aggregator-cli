import { getFeedFollowsForUser } from '../lib/db/queries/feedFollows.js';
import { User } from '../lib/db/schema.js';

export async function handlerFollowing(cmdName: string,user: User, ...args: string[]) {
        const follows = await getFeedFollowsForUser(user.id);

        if (follows.length === 0) {
        console.log("You are not following any feeds.");
        }

        for (const follow of follows) {
        console.log(follow.feedName);
        }
}