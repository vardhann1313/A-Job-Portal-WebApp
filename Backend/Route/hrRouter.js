const express = require('express')
const router = express.Router()

const {login} = require('../Controller/hrController')

router.post('/login', login)

module.exports = router