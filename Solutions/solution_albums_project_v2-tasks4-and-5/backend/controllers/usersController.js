import { db } from "../index.js";
import { v4 as uuid } from "uuid";
import createError from "http-errors";
import User from "../models/user.js";

// ==============================================
// GET the logged in user's data
// ==============================================

export const getUserData = async (req, res, next) => {
    // Take the :id parameter from the request path ("/users/:id/albums")
    const userId = req.params.id;

    // Try to find a user in the "users" collection with the same id
    // If you find a user object with the correct id, make a copy and put it in the "foundUser" variable
    // If you do not find the user, "foundUser" = undefined
    let foundUser; 
    
    try {
       foundUser = await User.findById(userId);
    } catch {
        return next(createError(500, "Couldn't query database. Please try again"));
    }

    // If a user was found with the same id as the :id parameter...
    if (foundUser) {
        // Send in the response back to the frontend:
        //  - firstName
        //  - list of albums
        const userData = {
            firstName: foundUser.firstName,
            albums: foundUser.albums
        }

        res.json(userData);
    
    // If no user was found with the same id as the :id parameter...
    // Create an error object with a relevant message and statusCode, and pass it to the error handling middleware
    } else {
        next(createError(404, "User could not be found"));
    }
}

// =======================================================
// POST a new album to the logged in user's "albums" list
// =======================================================

export const postAlbum = async (req, res, next) => {
    // Take the user's id from the "id" parameter of their request URL
    const userId = req.params.id;
    // Take the new album object from the body of the request
    const newAlbum = req.body;

    // * Task 5, Step 1: Find the document representing the logged-in user
    const foundUser = await User.findById(userId);

    // * Task 5, Step 2: Check to see if the user already has the new album in their "albums" array
    const foundAlbum = foundUser.albums.find(album => {
        return album.band.toLowerCase() === newAlbum.band.toLowerCase() 
            && album.albumTitle.toLowerCase() === newAlbum.albumTitle.toLowerCase() 
            && album.albumYear == newAlbum.albumYear
    });

    // * Task 5, Step 3: If the user does not already have the new album in their "albums" array...
    // * ... use findByIdAndUpdate to try to update the user's "albums" array with the new album.
    // * If this is successful, return the updated array of albums in the response
    if (!foundAlbum) {
        let updatedUser;
        
        try {
            //                                        (1) id   (2) update                      (3) options
            updatedUser = await User.findByIdAndUpdate(userId, { $push: { albums: newAlbum }}, { new: true, runValidators: true})
        } catch {
            return next(createError(500, "User could not be updated. Please try again"));
        }

        res.status(201).json(updatedUser.albums);
    
    // If the new album is already in the user's "albums" array...
    // Create an error object with a relevant message and statusCode, and pass it to the error handling middleware    
    } else {
        next(createError(409, "The album already exists in your collection!"));
    }
}

// ==========================================================
// DELETE all albums from the logged in user's "albums" list
// ==========================================================

export const deleteAlbums = async (req, res, next) => {
    const userId = req.params.id;

    const indexOfUser = db.data.users.findIndex(user => user.id === userId);

    // If the user exists in the db...
    if (indexOfUser > -1) {
        db.data.users[indexOfUser].albums = [];

        await db.write();
    
        res.json(db.data.users[indexOfUser].albums);
    
    // If the user does not exist in the db...
    // Create an error object with a relevant message and statusCode, and pass it to the error handling middleware
    } else {
        const err = new Error("User could not be found");
        err.statusCode = 404;
        next(err);
    }
}