import * as dotenv from "dotenv";

dotenv.config({ path: `./.env` });
export default {
  env: process.env.NODE_ENV,
  host: process.env.HOST,
  port: process.env.PORT,
  mongooseSecretKey: process.env.MONGOOSE_SECRET_KEY ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "",
  EMAIL: process.env.EMAIL as string,
  EMAILPASSWORD: process.env.EMAILPASSWORD as string,
  PREFIX_API_URL: (process.env.PREFIX_API_URL as string) ?? "/api/v1",
};
