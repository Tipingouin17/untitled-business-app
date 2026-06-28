import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../drizzle/schema";
import { eq } from "drizzle-orm";

let db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!db) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle(pool, { schema });
  }
  return db;
}

// Keep these exactly:
export async function upsertUser(userId: number, email: string) {
  const db = await getDb();
  await db!.insert(schema.users).values({ userId, email }).onConflict('userId').doUpdate().set({ email });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  return db!.select().from(schema.users).where(eq(schema.users.openId, openId)).first();
}

// Add your business-specific helpers:
export async function getSubscriptionsByUserId(userId: number): Promise<schema.Subscription[]> {
  const db = await getDb();
  return db!.select().from(schema.subscriptions).where(eq(schema.subscriptions.userId, userId));
}

export async function createSubscription(data: Omit<schema.Subscription, 'subscriptionId' | 'createdAt'>): Promise<number> {
  const db = await getDb();
  const result = await db!.insert(schema.subscriptions).values(data).returning(schema.subscriptions.subscriptionId);
  return result[0].subscriptionId;
}

export async function getPlans(): Promise<schema.Plan[]> {
  const db = await getDb();
  return db!.select().from(schema.plans);
}

export async function createPlan(data: Omit<schema.Plan, 'planId' | 'createdAt'>): Promise<number> {
  const db = await getDb();
  const result = await db!.insert(schema.plans).values(data).returning(schema.plans.planId);
  return result[0].planId;
}