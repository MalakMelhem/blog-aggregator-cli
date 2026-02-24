import { User } from "src/lib/db/schema.js";
import { getPostsForUser } from "../lib/db/queries/posts.js";
import { convert } from "html-to-text";

export async function handlerBrowse(cmdName: string,user:User, ...args: string[]) {
  const limitArg=args[0];
  const limit = limitArg ? parseInt(limitArg, 10) : 2;

  const posts = await getPostsForUser(user.id, limit);

  if (posts.length === 0) {
    console.log("No posts found. Follow some feeds first!");
    return;
  }

  for (const post of posts) {
    console.log(`\n${post.title}`);
    console.log(post.url);
    if (post.description) {
      const cleanDescription = convert(post.description, { wordwrap: 100 });
      console.log(cleanDescription);
    }
    if (post.publishedAt) console.log(`Published: ${post.publishedAt.toISOString()}`);
    console.log("-".repeat(40));
  }
}