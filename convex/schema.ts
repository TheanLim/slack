import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  workspaces: defineTable({
    name: v.string(),
    userId: v.id("users"),
    joinCode: v.string(),
  }),
  // Associate users to workspaces, and their role in the workspaces
  members: defineTable({
    userId: v.id("users"),
    workspaceId: v.id("workspaces"),
    // Only two types of roles
    role: v.union(v.literal("admin"), v.literal("member"))
  })
    // Indexing for faster queries
    .index("by_user_id", ["userId"])
    .index("by_workspace_id", ["workspaceId"])
    .index("by_workspace_id_user_id", ["workspaceId", "userId"]),
  channels: defineTable({
    name: v.string(),
    workspaceId: v.id("workspaces")
  })
    .index("by_workspace_id", ["workspaceId"]),
  // Your other tables...
});

export default schema;