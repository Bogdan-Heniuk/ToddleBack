const app = module.exports = require('express')()
const userController = require('./controller')
const jwtValidation = require('../../middlwares/jwtValidation')
const User = require("../../model/User")


app.post('/users/verify',  jwtValidation, async (req, res) =>{
    res.sendStatus(200)
})

app.post('/users/login', async (req, res) =>{
    const userToken = await userController.jwtSignage(req.body)
    res.json(userToken)
})

app.post('/users', async (req, res) => {
    const checkIfExists = await User.findOne({email : req.body.email})
    if(checkIfExists) res.json({message : "User exists"})
    else{
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        await user.save()
        const userToken = await userController.jwtSignage(req.body)
        res.json(userToken)
    }
})