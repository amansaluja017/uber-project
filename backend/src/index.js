import { app } from "./app.js";
import dotenv from "dotenv";
import connectToDB from "./db/db.js";

dotenv.config({
  path: "./env",
});
const port = process.env.PORT || 3000;

connectToDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
    process.exit(1); // Exit with an error code of 1 to indicate failure.
  });
