const express = require('express')
const router = express.Router()

const {signup, login, update, getAllJobs} = require('../Controller/userController')
const {loginValidation, signupValidation, updateValidation} = require('../Middleware/userValidation')

// For role based access ----------------
const {authenticateToken, authorizeRole} = require('../Middleware/roleAuthorization')

router.post('/signup', signupValidation, signup)
router.post('/login', loginValidation, login)
router.put('/update', authenticateToken, authorizeRole('Seeker'), updateValidation, update)

router.get('/getAllJobs', authenticateToken, authorizeRole('Seeker'), getAllJobs)

module.exports = router