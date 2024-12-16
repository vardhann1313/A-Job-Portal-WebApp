const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

// Important --------------------------------------
app.use(cors())
app.use(bodyParser.json())

// Routers ----------------------------------------
const {companyRouter, userRouter, hrRouter} = require('./Route')

// dotenv file ------------------------------------
require('dotenv').config()
const PORT = process.env.PORT

// Basic endpoint ---------------------------------
app.get('/', (req, res) => {
    res.send("Server is running ...")
})

// company authentication endpoint ----------------
app.use('/api/company', companyRouter)

// user authentication endpoint -------------------
app.use('/api/user', userRouter)

// HR authentication endpoint -------------------
app.use('/api/hr', hrRouter)


// Server -----------------------------------------
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})