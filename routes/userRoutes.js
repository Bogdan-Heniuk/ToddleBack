const app = module.exports = require('express')()
const userController = require('../controllers/userController')
const jwtValidation = require('../middlwares/jwtValidation')

app.post('/users/verify',  jwtValidation, userController.verify)

app.post('/users/login', userController.verify)

app.post('/users', userController.registration)