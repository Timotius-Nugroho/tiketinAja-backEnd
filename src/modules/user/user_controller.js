const helper = require('../../helpers')
const userModel = require('./user_model')

module.exports = {
  getUserById: async (req, res) => {
    try {
      const userId = req.decodeToken.user_id
      const result = await userModel.getDataById(userId)
      delete result[0].user_password
      return helper.response(res, 200, 'Succes get data user !', result[0])
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateUserProfile: async (req, res) => {
    try {
      const userId = req.decodeToken.user_id
      const checkUser = await userModel.getDataById(userId)

      const { firstName, lastName, userPhoneNumber } = req.body
      const setData = {
        user_name: firstName + ' ' + lastName,
        user_phone_number: userPhoneNumber,
        user_profile_image: req.file
          ? req.file.filename
          : checkUser[0].user_profile_image
      }
      // console.log('Data', setData)

      if (req.file) {
        const imgLoc = `src/uploads/${checkUser[0].user_profile_image}`
        helper.deleteImage(imgLoc)
      }

      const result = await userModel.updateProfile(setData, userId)
      return helper.response(res, 200, 'Succes Update Profile !', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
