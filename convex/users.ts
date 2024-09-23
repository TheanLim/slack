import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";


export const current = query({
    args: {},
    // handler is the db controller -- it has access to the database
    handler: async (ctx) => {
        // Convex attaches the authenticated user's ID to the request context.
        const userId = await getAuthUserId(ctx);
        if (userId == null) {
            return null;
        }
        // Don't need to specify the collection to get from.
        // It is inferred from the userId: Id<"users">
        return await ctx.db.get(userId);
    }
})