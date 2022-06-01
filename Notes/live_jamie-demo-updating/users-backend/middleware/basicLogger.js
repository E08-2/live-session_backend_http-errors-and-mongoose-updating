const basicLogger = (req, res, next) => {
    console.log("A new request was received!");

    next();
}

export default basicLogger;