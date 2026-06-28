import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getDb } from "./db";
import { eq, and, desc, asc } from "drizzle-orm";
import { users, projects, tasks, comments } from "../drizzle/schema";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const user = await db.select().from(users).where(eq(users.id, ctx.user.id)).first();
      if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });
      return user;
    }),
    logout: protectedProcedure.mutation(async ({ ctx }) => {
      // Logic for logging out the user
      return { success: true };
    }),
  }),
  user: router({
    register: publicProcedure
      .input(z.object({
        username: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        // Logic for registering a user
        return { success: true, message: 'User registered successfully', userId: '12345' };
      }),
    login: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        // Logic for user login
        return { success: true, message: 'Login successful', token: 'jwt-token' };
      }),
  }),
  admin: router({
    createAdmin: protectedProcedure
      .input(z.object({
        username: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        // Logic for creating an admin user
        return { success: true, message: 'Admin created successfully', adminId: 'admin123' };
      }),
  }),
  project: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      return db.select().from(projects).where(eq(projects.userId, ctx.user.id));
    }),
    create: protectedProcedure
      .input(z.object({
        name: z.string().min(1),
        description: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.insert(projects).values({
          userId: ctx.user.id,
          name: input.name,
          description: input.description,
        });
        return { success: true };
      }),
  }),
  task: router({
    list: protectedProcedure
      .input(z.object({
        projectId: z.number(),
      }))
      .query(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        return db.select().from(tasks).where(and(eq(tasks.projectId, input.projectId), eq(tasks.userId, ctx.user.id)));
      }),
    create: protectedProcedure
      .input(z.object({
        projectId: z.number(),
        title: z.string().min(1),
        description: z.string().optional(),
        status: z.string().min(1),
        priority: z.number(),
        dueDate: z.date().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.insert(tasks).values({
          projectId: input.projectId,
          userId: ctx.user.id,
          title: input.title,
          description: input.description,
          status: input.status,
          priority: input.priority,
          dueDate: input.dueDate,
        });
        return { success: true };
      }),
  }),
  comment: router({
    list: protectedProcedure
      .input(z.object({
        taskId: z.number(),
      }))
      .query(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        return db.select().from(comments).where(eq(comments.taskId, input.taskId));
      }),
    create: protectedProcedure
      .input(z.object({
        taskId: z.number(),
        content: z.string().min(1),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.insert(comments).values({
          taskId: input.taskId,
          userId: ctx.user.id,
          content: input.content,
        });
        return { success: true };
      }),
  }),
});