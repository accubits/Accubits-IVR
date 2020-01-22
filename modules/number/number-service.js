const number = require("../../models/number");


const isValidNumber = async (phoneNo) => {
    const data = await number.findOne({
        attributes: ['id'],
        where: {
            phoneNo: phoneNo
        },
        raw: true
    })

    return data
}

const addPhoneNumber = async params => {
    const data = await number.create(params)
    return data
}

module.exports = {
    isValidNumber,
    addPhoneNumber
}