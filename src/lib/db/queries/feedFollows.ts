import { eq,and } from "drizzle-orm";
import { db } from "../index";
import { users,feeds,feedFollows } from "../schema";


export async function createFeedFollow(userId: string, feedId: string) {
  const [newFeedFollow] = await db.insert(feedFollows).values({userId,feedId,}).returning();

  const result = await db.select({
      id: feedFollows.id,
      createdAt: feedFollows.createdAt,
      updatedAt: feedFollows.updatedAt,
      userName: users.name,
      feedName: feeds.name,
    })
    .from(feedFollows)
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(eq(feedFollows.id, newFeedFollow.id));

  return result[0];
}

export async function getFeedFollowsForUser(userId: string) {
  return await db.select({id: feedFollows.id, feedName: feeds.name, userName: users.name,})
    .from(feedFollows)
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(eq(feedFollows.userId, userId));
}

export async function deleteFeedFollow(userId: string, feedId: string) {

  const result = await db.delete(feedFollows)
  .where(and(eq(feedFollows.userId, userId),eq(feedFollows.feedId,feedId)))
  .returning();
}
export async function getFeedFollow(userId: string, feedId: string) {
  const result = await db.select({id: feedFollows.id,userName: users.name,feedName: feeds.name,createdAt: feedFollows.createdAt,})
    .from(feedFollows)
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(and(eq(feedFollows.userId, userId), eq(feedFollows.feedId, feedId)));
  return result[0] || null; 
}