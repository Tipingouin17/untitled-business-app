import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getDb } from "./db";
import { eq, and, desc, asc } from "drizzle-orm";
import { subscriptions, plans } from "../drizzle/schema";

// User Router
const userRouter = router({
  register: publicProcedure
    .input(
      z.object({
        username: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      // Logic for registering a user
      return { success: true, message: 'User registered successfully', userId: '12345' };
    }),
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      // Logic for user login
      return { success: true, message: 'Login successful', token: 'jwt-token' };
    }),
});

// Admin Router
const adminRouter = router({
  createAdmin: publicProcedure
    .input(
      z.object({
        username: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      // Logic for creating an admin user
      return { success: true, message: 'Admin created successfully', adminId: 'admin-12345' };
    }),
});

// Subscription Router
const subscriptionRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return db.select().from(subscriptions).where(eq(subscriptions.userId, ctx.user.id));
  }),
  create: protectedProcedure
    .input(
      z.object({
        planId: z.number(),
        startDate: z.date(),
        endDate: z.date().optional(),
        status: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.insert(subscriptions).values({
        userId: ctx.user.id,
        planId: input.planId,
        startDate: input.startDate,
        endDate: input.endDate,
        status: input.status,
      });
      return { success: true };
    }),
});

// Plan Router
const planRouter = router({
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return db.select().from(plans).orderBy(asc(plans.planId));
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        price: z.number().positive(),
        features: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.insert(plans).values({
        name: input.name,
        description: input.description,
        price: input.price,
        features: input.features,
      });
      return { success: true };
    }),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: protectedProcedure.query(({ ctx }) => {
      return { user: ctx.user };
    }),
    logout: protectedProcedure.mutation(({ ctx }) => {
      // Logic for logging out
      return { success: true, message: 'Logged out successfully' };
    }),
  }),
  user: userRouter,
  admin: adminRouter,
  subscription: subscriptionRouter,
  plan: planRouter,
});

export type AppRouter = typeof appRouter;