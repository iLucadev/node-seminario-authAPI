/* export default {
  SECRET: "secret-pokemon",
};
 */
import { config } from "dotenv";
config();

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/seminarioDB";
export const PORT = process.env.PORT || 3000;
export const SECRET = "secret-key";

export const ADMIN_NAME = process.env.ADMIN_NAME || "admin";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@pokedex.gg";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "pokeadmin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "superpassword";
