import { UserResponse } from "./src/middlewares/CheckUserAuth";

declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_NAME: string;
    USER_NAME: string;
    PASSWORD: string;
    HOST: string;
    DB_PORT: string;
    JWT_SECRET_KEY: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: UserResponse;
    }
  }
}
