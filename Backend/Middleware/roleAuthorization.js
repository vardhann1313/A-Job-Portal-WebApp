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

const authorizeRole = (requiredRoles) => {
    return (req, res, next) => {
        if(!requiredRoles.includes(req.user.role)){
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