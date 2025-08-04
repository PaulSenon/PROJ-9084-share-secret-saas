import { v } from "convex/values";
import { mutation, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import ms from "ms";

// Set a secret and return its ID
export const setSecret = mutation({
  args: {
    payload: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("secrets", {
      payload: args.payload,
    });

    // Schedule auto-deletion after 24 hours
    await ctx.scheduler.runAfter(ms("24h"), internal.myFunctions.unsetPayload, {
      secretId: id,
    });

    return { id };
  },
});

// Internal mutation to delete expired secrets
export const unsetPayload = internalMutation({
  args: {
    secretId: v.id("secrets"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.secretId, {
      payload: undefined,
    });
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
      throw new Error("Secret not found");
    }

    // Delete the payload immediately after reading (ephemeral)
    if (secret.payload !== undefined) {
      await ctx.db.patch(args.id, {
        payload: undefined,
      });
    }

    return {
      payload: secret.payload,
    };
  },
});
