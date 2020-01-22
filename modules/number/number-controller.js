const {
    validationResult
  } = require('express-validator');
const {
    isValidNumber,
    addPhoneNumber
} = require("./number-service")

const addNumber = async (req, res, next) => {

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


        const phoneNo = req.body.phoneNo;
        const valid = await isValidNumber(phoneNo)
        if (!valid) {

            const result = await addPhoneNumber(req.body);
            if (result) {
                const data = {
                    status: true,
                    data: "Added the new phone number"
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
                data: "Already the phone number exsists"
            }
            res.status(400)
            res.json(data)
        }
    } catch (e) {
        next(e)
    }
}

module.exports = {
    addNumber
}