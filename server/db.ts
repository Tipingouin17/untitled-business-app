import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../drizzle/schema";
import { eq, and, desc, asc } from "drizzle-orm";

let db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!db) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle(pool, { schema });
  }
  return db;
}

// Keep these exactly:
export async function upsertUser(user: { id: string; email: string }) {
  const db = await getDb();
  await db!.insert(schema.users).values({
    id: user.id,
    email: user.email,
  }).onConflictDoUpdate({
    target: schema.users.id,
    set: { email: user.email },
  });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  return db!.select().from(schema.users).where(eq(schema.users.id, openId)).first();
}

// Add your business-specific helpers:

export async function getProjectsByUserId(userId: number) {
  const db = await getDb();
  return db!.select().from(schema.projects).where(eq(schema.projects.userId, userId));
}

export async function createProject(data: { userId: number; name: string; description?: string }) {
  const db = await getDb();
  await db!.insert(schema.projects).values({
    userId: data.userId,
    name: data.name,
    description: data.description,
  });
  return { success: true };
}

export async function getTasksByProjectId(projectId: number) {
  const db = await getDb();
  return db!.select().from(schema.tasks).where(eq(schema.tasks.projectId, projectId));
}

export async function createTask(data: { projectId: number; userId: number; title: string; description?: string; status: string; priority: number; dueDate?: Date }) {
  const db = await getDb();
  await db!.insert(schema.tasks).values({
    projectId: data.projectId,
    userId: data.userId,
    title: data.title,
    description: data.description,
    status: data.status,
    priority: data.priority,
    dueDate: data.dueDate,
  });
  return { success: true };
}

export async function getCommentsByTaskId(taskId: number) {
  const db = await getDb();
  return db!.select().from(schema.comments).where(eq(schema.comments.taskId, taskId));
}

export async function createComment(data: { taskId: number; userId: number; content: string }) {
  const db = await getDb();
  await db!.insert(schema.comments).values({
    taskId: data.taskId,
    userId: data.userId,
    content: data.content,
  });
  return { success: true };
}