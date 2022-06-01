import mongoose from "mongoose";

// * LC Part 2 - Define a schema for a "User" document

// const Schema = mongoose.Schema;
const { Schema } = mongoose;

// Create our schema - what should a "user" document look like?
// The schema we will create is our "blueprint" / "plan" for each "user" document in the "users" collection
// We are creating a new instance of mongoose's "Schema" class
const userSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true }
})

// * LC Part 3 - Use the schema to create a model

// When creating the User model, we give two arguments
//                          Collection - this will automatically be changed to "users" by MongoDB
//                          (Uppercase first letter is conventional)
//                            ^     Schema - how documents saved to the "users" collection should look
//                            ^       ^
const User = mongoose.model("User", userSchema);

export default User;