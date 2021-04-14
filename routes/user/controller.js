const jwt = require('jsonwebtoken')
const User = require("../../model/User")

exports.jwtSignage = async (userData) => {
    const user = await User.findOne({
        email : userData.email,
        password : userData.password
    })
    if(user){
        return jwt.sign({
            name : user.name,
            email : user.email,
            _id : user._id
        }, process.env.JWT_PRIVATE_KEY, {
            expiresIn: '12h'
        })
    } else {
        return {message: "invalid email or password"}
    }

}