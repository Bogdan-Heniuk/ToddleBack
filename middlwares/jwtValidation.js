const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    req.token = jwt.verify(req.headers.token, process.env.JWT_PRIVATE_KEY)
    next()
}