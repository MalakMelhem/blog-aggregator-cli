import { db } from "../index.js";
import { posts, feedFollows } from "../schema.js";
import { eq, desc } from "drizzle-orm";

export async function createPost(postData: {
  title: string;
  url: string;
  description?: string;
  publishedAt?: Date;
  feedId: string;
}) {
  return await db.insert(posts).values(
    {title: postData.title,url: postData.url,
    description: postData.description ?? null,
    publishedAt: postData.publishedAt ?? null,
    feedId: postData.feedId,
  }).onConflictDoNothing();
}
export async function getPostsForUser(userId: string, limit = 10) {
  return await db
    .select({id: posts.id,title: posts.title,url: posts.url,description: posts.description,publishedAt: posts.publishedAt,feedId: posts.feedId,})
    .from(posts)
    .innerJoin(feedFollows, eq(feedFollows.feedId, posts.feedId))
    .where(eq(feedFollows.userId, userId))
    .orderBy(desc(posts.publishedAt))
}