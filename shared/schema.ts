import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  color: text("color").notNull(),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  categoryId: integer("category_id").references(() => categories.id),
  author: text("author").notNull(),
  readTime: integer("read_time").notNull(), // in minutes
  isBreaking: boolean("is_breaking").default(false),
  isFeatured: boolean("is_featured").default(false),
  publishedAt: timestamp("published_at").defaultNow(),
  views: integer("views").default(0),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  publishedAt: true,
  views: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export type Category = typeof categories.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
