const express = require('express')
const router = express.Router()

const {signup, login, getAllHr, deleteHr} = require('../Controller/companyController')
const {signupValidation, loginValidation} = require('../Middleware/companyValidation')
const { authenticateToken, authorizeRole } = require('../Middleware/roleAuthorization')

router.post('/signup', signupValidation, signup)
router.post('/login', loginValidation, login)

// HR APIs -----------------------------
router.get('/getallhr', authenticateToken, authorizeRole('company'), getAllHr)
router.delete('/deletehr:id', authenticateToken, authorizeRole('company'), deleteHr)

module.exports = router