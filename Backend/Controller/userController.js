

const signup = (req, res) => {
    res.send("User signup successfully !")
}

const login = (req, res) => {
    res.send("User login successfully !")
}

module.exports = {
    signup,
    login
}