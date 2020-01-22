const {
    validationResult
} = require('express-validator');

const {
    isValidOrderNo,
    addOption
} = require('./ivr-service');

const addIVROption = async (req, res, next) => {

    try {

        let errorArr = [];

        let errors = validationResult(req);
        errorArr = errors.array();

        if (errorArr.length) {
            const data = {
                status: false,
                errors: errorArr
            }
            res.status(422);
            res.json(data);
            return
        }

        const orderNo = req.body.orderNo;
        const valid = await isValidOrderNo(orderNo);

        if (!valid) {
            const result = await addOption(req.body);
            if (result) {
                const data = {
                    status: true,
                    data: "Added the IVR option"
                }
                res.status(200)
                res.json(data)
            } else {
                const data = {
                    status: false,
                    data: responseMessages.internalError
                }
                res.status(500)
                res.json(data)
            }
        } else {
            const data = {
                status: false,
                data: "Already an option with same order number"
            }
            res.status(400)
            res.json(data)
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addIVROption
}