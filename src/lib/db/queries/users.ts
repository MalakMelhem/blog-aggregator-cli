import { db } from "../index";
import { eq} from "drizzle-orm";
import {users, User, feedFollows,posts,feeds} from '../schema.js';


export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name }).returning();
  return result;
}

export async function getUserByName(name: string):  Promise<User | undefined> {
  const [user] = await db.select().from(users).where(eq(users.name, name)); 
  return user;
}

export async function reset() {
  await db.delete(feedFollows);
  await db.delete(posts);
  await db.delete(feeds);
  await db.delete(users);
}

export async function getUsers(){
  return await db.select().from(users);
}

