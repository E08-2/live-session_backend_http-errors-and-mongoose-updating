# Task 5

Now you should try to use your `User` model, and Mongoose's `findByIdAndUpdate` method, to make the `postAlbum` controller function work with your MongoDB database instead of `db.json`:

- You can find the controller function in `/controllers/usersController.js`.
- When you are done, you should be able to create new albums for the logged in user by clicking the "Submit Album" button in your browser.
- Remember that the new albums should be created in the `users` collection of the MongoDB database `albums-project`. There should be no more lowdb code in your controller function!
- Don't forget to also use `http-errors` for your error handling.
- When you are done, make sure to also test to make sure your error handling is working correctly!

---

# Task 4

Let's update our error handling to use the new `http-errors` module. 

**Remember**: so far we have updated:

- The `registerPost()` controller function in `/controllers/registerController.js` (handle a HTTP request sent by a user who is trying to register)
- The `loginPost()` controller function in `/controllers/loginController.js` (handle a HTTP request sent by a user who is trying to log in)
- The `getUserData()` controller function in `/controllers/usersController.js` (handle a HTTP request sent when Albums.js first renders to GET the current user's first name and list of albums)

1. Use npm to install the `http-errors` module.
2. Change your error handling in all your updated controller functions to use the `http-errors` module.
    - I showed you two ways you can do this - feel free to choose your favourite!
    - If you need to research anything (e.g. different "named" errors), you can check out the `http-errors` docs at https://www.npmjs.com/package/http-errors 
    - When you are done, you can test your new error handling by:
        - Trying to register but leaving one or more inputs blank
        - Trying to log in as an unregistered user
    - If you have some time at the end, you can comment out your new error handling and practice the other way of using `http-errors` that I showed you. When you are done, feel free to go back to the way you prefer. :-)

---

# Task 3

Now you can register a new user successfully, you should now refactor your code to make sure an existing user can **log in** successfully.

- You can start in `/views/Login.js` (**frontend**) to follow the process for logging in.
- When refactoring your **backend** controller function to handle logging in, remember that we are now using MongoDB and Mongoose to handle your data, not `/data/db.json` and lowdb.
    - In your controller function, also remember to add error handling whenever you use Mongoose to query your MongoDB collection.
- When you are done, use your browser to log in (1) as an existing user and (2) a user who doesn't exist. Make sure you get the expected outcome in both cases.

---

# Task 2

Now your User model is working when you send requests using Postman, make sure you can also register using your **React frontend**.

Remember, to register using your frontend, you need to complete the React form and click "Register an account". Once the button has been clicked, there are **2 stages**:

- **Stage 1**: in `/views/Register.js` (**frontend**), send a HTTP POST request to your server's "/register" path. The `registerPost` controller function for this endpoint (**backend**) should create a new user document in your database and send back a 201 response containing a copy of the new document. **If you completed yesterday's task, this should already work!**
    - You can check this by registering a new user in your browser. Even though you will get an error message, if you check you MongoDB shell / Compass, you will see the user was created. :-)
    - Note that in the `registerPost` controller function (**backend**), when the 201 response is sent you include a copy of the **whole** new document (username, password etc...). 
    - But also note that in `/views/Register.js` (**frontend**), you **only** use the user's unique id from the response. The rest of the data is not needed!
        - Change `/controllers/registerController.js` (**backend**) to send back **only** a unique "id" for the user.
        - Be careful with what you are sending back here! Check out your new document in the MongoDB Shell / Compass if you are unsure...
        - Also make sure in `/views/Register.js` (**frontend**) that you are using **exactly** what you receive in the server response to set the `currentUserId` state variable in `App.js`!

- **Stage 2**: Next, the `Albums` view will be rendered in the browser. As soon as the view is rendered, a `useEffect` will be called to your server's GET /user endpoint to retrieve the necessary details about the user who just registered.
    - You do not need to change the `useEffect` in `/views/Albums.js` (**frontend**). Instead, refactor ("rewrite") your **backend** code to make sure the `fetch` request in the `useEffect` is successful.
    - Remember: your data now lives in MongoDB, not `db.json`!
    - In the controller function (**backend**) for the GET /user route, try to research and implement the new Mongoose method **Model.findById()** to find the correct user document using its id.
    - You can tell if your changes have worked because you will see "Welcome [user's firstname]!" in the top-left corner of the `Albums` view.
    - Make sure you are still also sending back the user's `albums` array from the backend, even though a newly registered user will not have any albums at the moment.
    - Finally, make sure to add error handling (like yesterday) whenever you use Mongoose to query your MongoDB collection.

---

# Task 1

Create and implement a "User" model in the `backend` directory of your new "Albums Project v2" repo!

For now, we will only implement the model when we want to **register** a new user.

## Instructions

1. Install `mongoose` into the `backend` directory of your "albums project v2" repo using npm.
2. Use mongoose in `index.js` to connect to a db called "albums-project" in MongoDB.
3. Inside the `backend` directory, create a `models` directory and add a file called `User.js`.
4. In `User,js`, import `mongoose` and use it to create a **schema** to define how a "User" document should look in your database.
    - What keys do you need to create a "User" document? Also, make sure all the keys are required!
5. Create a **model**, based on the schema, to provide an interface to a collection called `users`.
6. Import your model into `/controllers/registerController.js`.
7. Rewrite the `registerPost` controller function to use your model!
    - New "user" documents should now be saved in the `users` collection of your MongoDB database, instead of the `/data/db.json` file. To do this, you will need to use your **model** to replace all parts of the function currently using LowDB.
    - Remove all parts of the code which are no longer relevant (e.g. imports which are no longer needed, anything we do not need to handle ourselves as MongoDB will automatically handle it...)  
    - Make sure to also add extra **error handling**, in case something goes wrong when using your model to:
        - find your user, or 
        - save your user.
8. Test your changes using **Postman**.
    - Make sure that when you create a user correctly, you receive back a response containing that user's details, **plus**, `albums`, `_id` and `_v` fields.
    - Also try to create a user document without some of the correct fields, and make sure your error handling is working as expected.
    - You can look in the "exercises" Slack channel for examples of how successful and unsuccessful responses should look in Postman. :-)

---

Please copy all tasks into this file! This will create a record of the work you did to complete the project.

Each new task should go to the top of the file. :-)