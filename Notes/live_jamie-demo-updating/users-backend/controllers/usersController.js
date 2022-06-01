import createError from "http-errors";

import User from "../models/user.js";

export const userGet = async (req, res, next) => {

    let foundUser; 
    
    try {
       foundUser = await User.findById("629736a1faea68844a51a303");
    } catch {
        return next(createError(500, "Query did not succeed. Please try again"))
    }

    res.json(foundUser);
}

export const userUpdate = async (req, res, next) => {

    console.log("Jamie tried to change his name!")

    // Get the user's id from the :userId param
    const { userId } = req.params;

    // Get the treat object made in the frontend from the request body
    const treatFromFrontend = req.body; // e.g. { name: "beer" }

    // * New Mongoose method: findByIdAndUpdate

    // Step 1: Update only the user's name
    let foundUser;

    try {
        // * 1. First attempt - update the user's name:                                                                     
        //                                                                            (3) options:
        //                                                                            (a) new:true = send back the *updated* document (2) 
        //                                            (1) id   (2) update             (b) runValidators:true = run any validators 
        //                                               ^     ^                       ^
        // ? foundUser = await User.findByIdAndUpdate(userId, { name: newName.name }, { new: true, runValidators: true })

        // * 2. Second attempt: add a new treat to the user's "treats" array
        // Note that we are pushing a new "treat" object into the array - we don't want to overwrite all the old treats!
        foundUser = await User.findByIdAndUpdate(userId, { $push: { treats: treatFromFrontend } }, { new: true, runValidators: true })
    } catch {
        return next(createError(500, "Could not update user. Please try again"))
    }

    res.json(foundUser);

    // Find the user
    // let foundUser; 
    
    // try {
    //    foundUser = await User.findById("629736a1faea68844a51a303");
    // } catch {
    //     return next(createError(500, "Query did not succeed. Please try again"))
    // }

    // Add the treat to their array of treats
    // foundUser.treats.push(newTreat);

    // Save the updated object in the "users" collection
    // try {
    //     foundUser.save();
    // } catch {
    //     return next(createError(500, "User could not be updated. Please try again"))
    // }
}