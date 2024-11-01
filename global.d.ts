declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_NAME: string;
    USER_NAME: string;
    PASSWORD: string;
    HOST: string;
    DB_PORT: string;
  }
}
