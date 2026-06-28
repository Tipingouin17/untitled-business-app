import { pgEnum, pgTable, serial, text, timestamp, varchar, boolean, decimal, integer, numeric } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 * DO NOT modify this table — it is managed by the auth system.
 */
export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Business-specific tables ─────────────────────────────────────────────────

export const subscriptions = pgTable("subscriptions", {
  subscriptionId: serial("subscription_id").primaryKey(),
  userId: integer("user_id").notNull(),
  planId: integer("plan_id").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  status: varchar("status", 50).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;

export const plans = pgTable("plans", {
  planId: serial("plan_id").primaryKey(),
  name: varchar("name", 255).notNull(),
  description: text("description"),
  price: numeric("price", 10, 2).notNull(),
  features: text("features").notNull(), // JSON stored as text
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Plan = typeof plans.$inferSelect;
