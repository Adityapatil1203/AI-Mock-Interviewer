/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://AI-Interviewer_owner:FxWehbId2lq8@ep-rough-pond-a5kt1fy2.us-east-2.aws.neon.tech/AI-Interviewer?sslmode=require"
    }
  };