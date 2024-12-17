const express = require('express')
const router = express.Router()

const {signup, login} = require('../Controller/companyController')
const {signupValidation, loginValidation} = require('../Middleware/companyValidation')

router.post('/signup', signupValidation, signup)
router.post('/login', loginValidation, login)

module.exports = router