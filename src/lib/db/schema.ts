import { pgTable, timestamp, uuid, text, unique, serial, varchar } from "drizzle-orm/pg-core";


// the table object in schema.ts
export type User = typeof users.$inferSelect; 
export type Feed = typeof feeds.$inferSelect; 
export type FeedFollow = typeof feedFollows.$inferSelect;

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
    .$onUpdate(() => new Date()),
  name: text("name").notNull().unique(),
});

export const feeds = pgTable("feeds", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  name: text("name").notNull(),
  url: text("url").notNull().unique(),
  userId: uuid("user_id").notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  lastFetchedAt: timestamp("last_fetched_at"),
});

export const feedFollows = pgTable("feed_follows",{
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  feedId: uuid("feed_id").notNull().references(() => feeds.id, { onDelete: "cascade" }),
  },
  (table) => ({
    uniqueUserFeed: unique().on(table.userId, table.feedId),
  })
);

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  title: text("title").notNull(),
  url: varchar("url", { length: 500 }).notNull().unique(),
  description: text("description"),
  publishedAt: timestamp("published_at"),
  feedId: uuid("feed_id").notNull().references(() => feeds.id),
});