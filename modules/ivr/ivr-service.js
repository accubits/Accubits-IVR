const ivr = require("../../models/ivr");
const number = require("../../models/number");
const user = require("../../models/user");


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

const getIVRs = async (phoneNo, digit) => {
    const data = await ivr.findOne({
        include: [{
                attributes:['name','ivrMessage'],
                model: number,
                as: 'numberInfo',
                where: {
                    phoneNo: phoneNo,
                    isActive: 1,
                    ivr: 1
                }
            },
            {
                attributes:['phoneNo'],
                model: user,
                as: 'userInfo',
            }
        ],
        where: {
            selectNo: digit
        },
        order: [
            ['orderNo', 'ASC']
        ]
    })
    return data
}
module.exports = {
    isValidOrderNo,
    addOption,
    getIVRs
}