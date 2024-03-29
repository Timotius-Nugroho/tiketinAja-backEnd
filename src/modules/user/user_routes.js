const express = require('express')
const Route = express.Router()
const userController = require('./user_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')

Route.get('/', authMiddleware.authentication, userController.getUserById)
Route.post(
  '/',
  authMiddleware.authentication,
  uploadFile,
  userController.updateUserProfile
)

module.exports = Route
