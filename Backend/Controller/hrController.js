const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../database')

// Functions related to HR Auth ----------------

const signup = async (req, res) => {
    let conn ;
    try {
        conn = await db.getConnection()

        const {hr_name, email, password} = req.body
        const company_id = req.user._id

        const hashPassword = await bcrypt.hash(password, 11)
        const query = 'INSERT INTO HR (hr_name, email, password_hash, company_id) VALUES (?, ?, ?, ?)'
        const [result] = await conn.execute(query, [hr_name, email, hashPassword, company_id])

        return res.status(201).json({
            message: 'HR registered succesfully !',
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

        const query = `SELECT * FROM HR WHERE email = '${email}'`
        const [hr] = await conn.execute(query)

        if(hr.length == 0){
            return res.status(403).json({
                message: 'Authentication failed | User not found !',
                success: false
            })
        }

        const dbPass = hr[0].password_hash
        const isPassEqual = await bcrypt.compare(password, dbPass)
        if(!isPassEqual){
            return res.status(400).json({
                message: "Incorrect password !",
                success: false
            })
        }

        const jwtToken = jwt.sign(
            {username: hr[0].hr_name, _id: hr[0].hr_id, role: "HR", companyId: hr[0].company_id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        return res.status(200).json({
            message: 'Login succesfully !', 
            hr,
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