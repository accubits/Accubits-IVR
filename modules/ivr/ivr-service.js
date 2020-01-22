const ivr = require("../../models/ivr");


const isValidOrderNo = async (orderNo) => {
    const data = await ivr.findOne({
        attributes: ['id'],
        where: {
            orderNo: orderNo
        },
        raw: true
    })

    return data
}

const addOption = async params => {
    const data = await ivr.create(params)
    return data
}

module.exports = {
    isValidOrderNo,
    addOption
}