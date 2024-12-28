const express = require('express')
const router = express.Router()

// Authorizer --------------------
const {authenticateToken, authorizeRole} = require('../Middleware/roleAuthorization')

// Validation - Insert Update ----
const {insertJob} = require('../Middleware/jobValidation')

// Job controllers ---------------
const {addJob, updateJob, deleteJob, getJobs} = require('../Controller/jobController')

// Routing -----------------------
router.post('/addJob', authenticateToken, authorizeRole('HR'), insertJob, addJob)

router.put('/updateJob:id', authenticateToken, authorizeRole(['HR', 'COMPANY']), insertJob, updateJob)

router.delete('/deleteJob:id', authenticateToken, authorizeRole(['HR', 'COMPANY']), deleteJob)

router.get('/getJobs', authenticateToken, authorizeRole(['HR', 'COMPANY']), getJobs)

// Exporting -------------------- 
module.exports = router
