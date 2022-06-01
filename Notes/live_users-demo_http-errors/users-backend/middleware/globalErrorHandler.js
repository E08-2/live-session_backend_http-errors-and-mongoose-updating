// The global error handler receives an error from a previous middleware
const globalErrorHandler = (err, req, res, next) => {
    console.log(err);

    // If the error object received has no status code and/or message, give default value(s)
    if (!err.statusCode) err.statusCode = 500;
    if (!err.message) err.message = "An unknown error occurred!";

    // Send a response back the frontend with the error status code, containing the error object
    res.status(err.statusCode).send({ message: err.message });
}

export default globalErrorHandler;