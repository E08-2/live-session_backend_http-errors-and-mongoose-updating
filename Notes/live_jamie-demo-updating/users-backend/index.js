import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Low, JSONFile } from "lowdb";

import usersRouter from "./routes/users.js";
import basicLogger from "./middleware/basicLogger.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";

// * LC Part 1 - Connect to MongoDB!
// Connect to a MongoDB database called "users-db"
mongoose.connect("mongodb://localhost:27017/jamie-treat-db");

// Callbacks for mongoose - one for if the db connection opens successfully, another for if there's an error
mongoose.connection.on("open", () => console.log("Database connection established"));
mongoose.connection.on("error", () => console.error);

// ! LowDB - no longer used
const adapter = new JSONFile("./data-folder/db.json");
export const db = new Low(adapter);

const app = express();

app.use(express.json());

app.use(cors());

// "Logging" middleware
app.use(basicLogger);

// If we receive ANY request to the "/users" endpoint, forward that request to the "users" router
app.use("/users", usersRouter);

// * Error handling middleware
// The last registered middleware should ALWAYS be the global error handler
app.use(globalErrorHandler);

app.listen(3001, () => {
    console.log("Server listening for requests on port 3001...")
})