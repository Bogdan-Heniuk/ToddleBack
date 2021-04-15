const jwt = require('jsonwebtoken')
const User = require("../model/User")


class UserController {
    async jwtSignage(userData) {
        const user = await User.findOne({
            email: userData.email,
            password: userData.password
        })
        if (user) {
            return jwt.sign({
                name: user.name,
                email: user.email,
                _id: user._id
            }, process.env.JWT_PRIVATE_KEY, {
                expiresIn: '12h'
            })
        } else {
            return {message: "invalid email or password"}
        }
    }

    async verify(req, res) {
        const userToken = await this.jwtSignage(req.body)
        res.json(userToken)
    }

    async registration(req, res) {
        const checkIfExists = await User.findOne({email: req.body.email})
        if (checkIfExists) res.json({message: "User exists"})
        else {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            await user.save()
            const userToken = await this.jwtSignage(req.body)
            res.json(userToken)
        }
    }
}

module.exports = new UserController()