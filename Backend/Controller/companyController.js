const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../database')

// Functions related to company Auth ----------------
// Company signup -----------------------------------
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
            message: 'Registration failed ',
            success: false
        })
    }finally{
        conn.release()
    }
}

// Company login -------------------------
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
            {username: company[0].username, _id: company[0].company_id, role: "company"},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        const name = company[0].username
        const role = "COMPANY"
        return res.status(200).json({
            message: 'Login succesfully !', 
            name,
            role,
            jwtToken,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong !',
            success: false
        })
    }finally{
        conn.release()
    }
}

// HR functions handled by company ----------
// get All HRs -------------------------------

const getAllHr = async (req, res) => {
    const company_id = req.user._id
    let conn 

    try {
        conn = await db.getConnection()

        const query = `SELECT * FROM HR WHERE company_id = ${company_id}`
        const [data] = await conn.execute(query)

        return res.status(201).json({
            message: "Fetched successfully !",
            success: true,
            data
        })
        
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong !',
            success: false
        })
    }finally{
        conn.release()
    }
}

// Delete HR --------------------------------
const deleteHr = async (req, res) => {
    let conn 
    try {
        conn = await db.getConnection()

        const hr_id = parseInt(req.params.id)
        const query = `DELETE FROM HR WHERE hr_id = ${hr_id}`
        const [result] = await conn.execute(query)

        if(result.affectedRows != 0){
            return res.status(201).json({
                message: 'Deleted successfully !',
                success: true
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong !',
            success: false
        })
    }finally{
        conn.release()
    }
}

module.exports = {
    signup,
    login,
    getAllHr,
    deleteHr
}