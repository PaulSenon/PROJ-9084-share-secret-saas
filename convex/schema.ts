import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  secrets: defineTable({
    payload: v.optional(v.string()),
    createdAt: v.number(),
  }),
});
