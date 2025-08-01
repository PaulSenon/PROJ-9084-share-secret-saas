import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Set a secret and return its ID
export const setSecret = mutation({
  args: {
    payload: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("secrets", {
      payload: args.payload,
      createdAt: Date.now(),
    });

    return { id };
  },
});

// Get a secret by ID and delete it (one-time access)
export const getSecret = mutation({
  args: {
    id: v.id("secrets"),
  },
  handler: async (ctx, args) => {
    // First, get the secret
    const secret = await ctx.db.get(args.id);

    if (!secret) {
      throw new Error("Secret not found or already accessed");
    }

    // Delete the secret immediately after reading (ephemeral)
    await ctx.db.delete(args.id);

    return {
      payload: secret.payload,
      createdAt: secret.createdAt,
    };
  },
});
