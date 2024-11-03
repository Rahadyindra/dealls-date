import path from "path";

export default {
  config: path.resolve("config", "config.js"),
  "models-path": path.resolve("models"),
  "seeders-path": path.resolve("seeders"),
  "migrations-path": path.resolve("migrations"),
  extensions: ["ts", "js"],
  logging: false,
};
