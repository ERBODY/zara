import { defineSchema } from "database/server";
import { authTables } from "@database-dev/auth/server";

const applicationTables = {};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
