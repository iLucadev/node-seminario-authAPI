import app from "./app.js";
import "./database.js";
import { PORT } from "./config.js";
import "./utils/initialSetup.js";

app.listen(PORT);
console.log("Server on port", PORT);
