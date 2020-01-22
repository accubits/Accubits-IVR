module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ status: false, data: err });
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.status(400).json({ status: false, data: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ status: false, data: 'Invalid Token' });
    }

    // default to 500 server error
    console.log(err);
    return res.status(500).json({ status: false, data: 'Internal server error!' });
}