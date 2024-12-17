const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../database')

// Functions related to user Auth ----------------

const signup = async (req, res) => {
    let conn ;
    try {
        conn = await db.getConnection()

        const {seeker_name, location, qualification, DOB, email, password} = req.body
        const hashPassword = await bcrypt.hash(password, 11)
        const query = 'INSERT INTO Seeker (seeker_name, location, qualification, email, dob, password_hash) VALUES (?, ?, ?, ?, ?, ?)'
        const [result] = await conn.execute(query, [seeker_name, location, qualification, email, DOB, hashPassword])

        return res.status(201).json({
            message: 'User registered succesfully !',
            Id: result.insertId,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Registration failed ', error,
            success: false
        })
    }finally{
        conn.release()
    }
}

const login = async (req, res) => {
    let conn ;
    try {
        conn = await db.getConnection()

        const {email, password} = req.body

        const query = `SELECT * FROM Seeker WHERE email = '${email}'`
        const [seeker] = await conn.execute(query)

        if(seeker.length == 0){
            return res.status(403).json({
                message: 'Authentication failed | User not found !',
                success: false
            })
        }

        console.log(seeker)
        const dbPass = seeker[0].password_hash
        const isPassEqual = await bcrypt.compare(password, dbPass)
        if(!isPassEqual){
            return res.status(400).json({
                message: "Incorrect password !",
                success: false
            })
        }

        const jwtToken = jwt.sign(
            {username: seeker[0].seeker_name, _id: seeker[0].seeker_id, role: "Seeker"},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        return res.status(200).json({
            message: 'Login succesfully !', 
            seeker,
            jwtToken,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong !', error,
            success: false
        })
    }finally{
        conn.release()
    }
}

module.exports = {
    signup,
    login
}