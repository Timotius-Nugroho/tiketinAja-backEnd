const express = require('express')
const Route = express.Router()
const authMiddleware = require('../../middleware/auth')
const {
  register,
  login,
  requestChange,
  changeData,
  refresh
} = require('./auth_controller')

Route.get('/change-data/:token', changeData)

Route.post('/login', login)
Route.post('/register', register)
Route.post('/refresh', refresh)
Route.post('/request-change', authMiddleware.authentication, requestChange)

module.exports = Route
