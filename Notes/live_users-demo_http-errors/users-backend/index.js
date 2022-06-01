// * Live Coding - Mongoose Intro
// * LC 0 & 1 (connecting to MongoDB) = "index.js"
// * LC 2 & 3 (creating a User model) = "/models/user.js"
// * LC 4 & 5 (using the Model to query a collection) = "/controllers/usersController.js"

// ============================================

// * Live Coding (LC) Part 0
// The server receives a request from the client to create a new user document on the route POST /users

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Low, JSONFile } from "lowdb";

import usersRouter from "./routes/users.js";
import basicLogger from "./middleware/basicLogger.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";

// * LC Part 1 - Connect to MongoDB!
// Connect to a MongoDB database called "users-db"
mongoose.connect("mongodb://localhost:27017/users-db");

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