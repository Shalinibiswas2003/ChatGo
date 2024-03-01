const errorHandler = (error, req, res, next) => {
    if (error) {
        console.error('Error handled by errorHandler:', error); // Log the error
        if (error.message) {
            res.status(400).json({
                status: false,
                error: error.message
            });
        } else {
            res.status(400).json({
                status: false,
                error: 'An unexpected error occurred'
            });
        }
    } else {
        next(); // Move the app further only when there is no error
    }
};

module.exports = { errorHandler };
