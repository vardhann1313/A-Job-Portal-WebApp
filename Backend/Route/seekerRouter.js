const express = require('express')
const router = express.Router()

const {signup, login} = require('../Controller/userController')
const {loginValidation, signupValidation } = require('../Middleware/userValidation')

router.post('/signup', signupValidation, signup)
router.post('/login', loginValidation, login)

module.exports = router