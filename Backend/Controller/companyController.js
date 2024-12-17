const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../database')

// Functions related to company Auth ----------------

const signup = async (req, res) => {
    let conn ;
    try {
        conn = await db.getConnection()

        const {company_name, location, description, username, password} = req.body
        const hashPassword = await bcrypt.hash(password, 11)
        const query = 'INSERT INTO Company (company_name, location, description, username, password_hash) VALUES (?, ?, ?, ?, ?)'
        const [result] = await conn.execute(query, [company_name, location, description, username, hashPassword])

        return res.status(201).json({
            message: 'Company registered succesfully !',
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

        const {username, password} = req.body

        const query = `SELECT * FROM Company WHERE username = '${username}'`
        const [company] = await conn.execute(query)

        if(company.length == 0){
            return res.status(403).json({
                message: 'Authentication failed | Company not found !',
                success: false
            })
        }

        const dbPass = company[0].password_hash
        const isPassEqual = await bcrypt.compare(password, dbPass)
        if(!isPassEqual){
            return res.status(400).json({
                message: "Incorrect password !",
                success: false
            })
        }

        const jwtToken = jwt.sign(
            {username: company[0].username, _id: company[0].company_id},
            process.env.JWT_SECRET_COMPANY,
            {expiresIn: '24h'}
        )

        return res.status(201).json({
            message: 'Login succesfully !', 
            company,
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