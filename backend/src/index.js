import { app } from "./app.js";
import dotenv from "dotenv";
import {initializeSocket} from './socket.js';
import {createServer} from 'node:http'
import connectToDB from "./db/db.js";

dotenv.config({
  path: "./env",
});
const port = process.env.PORT || 3000;

const server = createServer(app);

initializeSocket(server);

connectToDB()
  .then(() => {
    console.log("Database connected successfully");
    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
    process.exit(1); 
  });
