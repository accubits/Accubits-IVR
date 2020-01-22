const { validationResult } = require('express-validator')

function checkInputs(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const data = {
            status: false,
            errors: errors.array()
        }
        res.status(422);
        res.json(data);
        return;
    }
    next();
}
module.exports = checkInputs;