import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL || "",
  tokenSecet: process.env.TOKEN_SECRET || "",
  tokenExpireTime: process.env.TOKEN_EXPIRATION_TIME || 18000,
};
