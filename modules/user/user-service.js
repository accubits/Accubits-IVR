const user = require('../../models/user')

const isValidUser = async (email) => {
  const data = await user.findOne({
    attributes: ['id'],
    where: {
      emailId: email
    },
    raw: true
  })

  return data
}

const addNewUser = async params => {
  const data = await user.create(params)
  return data
}

const updateUser = async params => {
  console.log(params)
  const updateData = params.details
  const data = user.update(updateData, {
    where: {
      id: params.id
    }
  })
  return data
}


const updatePassword = params => {
  console.log(params)
  const data = user.update({
    password: params.hash
  }, {
    where: {
      id: params.userId
    }
  })
  console.log(data)
  return data
}
const resetPassword = params => {
  const data = user.update({
    password: params.hash
  }, {
    where: {
      emailId: params.datas
    }
  })
  console.log(data)
  return data
}

const userDetails = async params => {
  const data = await user.findOne({})
  return data
}

const singleUserDetails = async params => {
  const data = await user.findOne({
    attributes: ['id', 'guid', 'emailId', 'firstName', 'lastName', 'phoneNo', 'zip', 'country', 'state', 'city', 'dob', 'streetAddress'],
    where: {
      id: params
    }
  })
  return data
}





module.exports = {
  isValidUser,
  addNewUser,
  updateUser,
  updatePassword,
  resetPassword,
  userDetails,
  singleUserDetails
}