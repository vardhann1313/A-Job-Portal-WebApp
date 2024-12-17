const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']
    if(!token){
        return res.status(401).json({
            message: "Access Denied",
            success: false
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return res.status(403).json({
                message: "Invalid Token",
                success: false
            })
        }
        req.user = user
        next()
    })
}

const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        if(req.user.role != requiredRole){
            return res.status(403).json({
                message: "Access forbidden : Insufficient permission",
                success: false
            })
        }
        next()
    }
}

module.exports = {
    authenticateToken,
    authorizeRole
}