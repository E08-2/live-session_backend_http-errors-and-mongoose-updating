import createError from "http-errors";

import User from "../models/user.js";

export const usersPost = async (req, res, next) => {
    const { name, age } = req.body;
    
    // ? First, try to find the new user in the collection - do they already exist?
    // If "found" === undefined --> we didn't find an existing user with the same name and age
    // If "found" === an object --> we did find an existing user
    
    // ! LowDB version
    // const found = db.data.users.find(user => user.name === name && user.age === age);
    
    // * Mongoose version - with error handling!
    let found;
    
    try {
        // User.findOne = "Try to find a single document in the 'users' colection"
        //        "User" model
        //              ^ 
        found = await User.findOne({name: name, age: age});
    } catch {
        const error = new Error("Could not query database. Please try again");
        error.statusCode(500);
        return next(error);
    }
    
    // ? If there is no existing user with the same details...
    if (!found) {
        // * Use our User model to create a document for MongoDB
        const newUser = new User({
            name: name,
            age: age,
        });

        // Update the "currentData" array with the new user
        
        // ! LowDB version
        // db.data.users.push(newUser);
        // await db.write();

        // * Mongoose version
        // Create the new document in the "users" MongoDB collection
        try {
            await newUser.save();   // We could get a validation error here if the schema is not fulfilled
        } catch {
            // * Use http-errors to create error objects
            // ? First way:
            // return next(createError(500, "User could not be created (hello http-errors!). Please try again"));
            
            // ? Second way:
            return next(new createError.InternalServerError("User could not be created (500)"));
            // return next(new createError[500]("User could not be created (500)"));

            // const error = new Error("User could not be created. Please try again");
            // error.statusCode = 500;
            // return next(error);
        }

        let allUsers;

        // Try to use the "User" model to find ALL documents in the "users" collection, including the new one.
        try {
            allUsers = await User.find();
        // Handle any errors
        } catch {
            const error = new Error("Could not get all users from the collection. Please try again");
            error.statusCode = 500;
            return next(error);
        }

        // If there were no errors, send a response to the frontend containing all the documents in the "users" collection
        res.status(201).json(allUsers)
    // ? Else, if there is already a document in the "users" collection with the same details...
    } else {
        // If we do find an existing user, we can't successfully process the request!
        // Create an error object, and pass it on to our error handler
        const err = new Error("A user with these details already exists in the db!");
        err.statusCode = 409;   // 409 error = "Conflict"
        next(err);  // This will automatically take you to the global error handler middleware
    }
}

// DELETE "/users" controller function (still using LowDB!)
export const usersDelete = async (req, res) => {
    // Remove the last item in the db.data.users array
    db.data.users.pop();  

    // Write this change to our database file
    await db.write();

    // Send a response with the latest version of the users array (minus the user we deleted!)
    res.json(db.data.users);
}