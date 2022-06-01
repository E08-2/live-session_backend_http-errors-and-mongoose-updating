// * EXPRESS ROUTER

// We create routers in the backend to handle all requests to related endpoints:

// In an imaginary project...
// We could create a router to handle ALL requests to the "users" endpoint in "users.js"...
//  - GET "/users"
//  - POST "/users"
//  - DELETE "/users"
// ? ... could all live in the same file, handled by a router, and any request to "users" would be directed to that router

// In the same project, we could also have a "posts.js" file, with a router handling ALL requests to "/posts"
//  GET /posts
//  POST /posts... etc...

// * Request journey for DELETE /users...

// 1. Frontend makes a HTTP DELETE request to /users.
// 2. The request goes to index.js.
// 3. index.js finds that the request is to the "/users" endpoint.
// 4. index.js forwards/passes on the request to the correct router.
// 5. The router receives the request, and discovers if its a POST or DELETE request to the "/users" endpoint.
// 6. It calls the correct handler function, and a response is sent back to the frontend.



import express from "express";
import { db } from "../index.js"
import { usersPost, usersDelete } from "../controllers/usersController.js";

// * "This router is in charge of handling ANY request to the "/users" endpoint!

// Use express to create a router
// This router will handle all requests to "/users", no matter their method!
const router = express.Router()

// POST /users
router.post("/", usersPost);

// DELETE /users
router.delete("/", usersDelete);

export default router;