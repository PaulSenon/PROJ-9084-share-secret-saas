import { z } from "zod";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const secretsRouter = createTRPCRouter({
  setSecret: publicProcedure
    .input(z.object({ payload: z.string() }))
    .mutation(async ({ input }) => {
      const result = await fetchMutation(api.myFunctions.setSecret, {
        payload: input.payload,
      });
      return result;
    }),

  getSecret: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const result = await fetchMutation(api.myFunctions.getSecret, {
          id: input.id as Id<"secrets">,
        });
        return result.payload;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Secret not found",
        });
      }
    }),
});
