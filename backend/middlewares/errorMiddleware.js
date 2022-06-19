export const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(statusCode).json({
        success: false,
        message: errorMessage,
        stack: err.stack
    });
};