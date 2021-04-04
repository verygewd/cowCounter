const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const expresJWT = require('express-jwt')


const signin = async (req, res) => {
    try {
        let user = await User.findOne({'username': req.body.username})
        if (!user) {
            return res.status('401').json({
                error: "User not found"
            })
        } 

        if (!user.authenticated(req.body.password)) {
            return res.status('401').send({
                error: "Username and Passowrd do not match"
            })
        }
        
        const token = jwt.sign({_id: user._id}, "superDuperSecret")
        
        res.cookie('t', token, {expire: new Date() + 9999})
        return res.json({
            token,
            user: {
                _id: user._id,
                username: user.username
            }
        })
        
    } catch (err) {
        return res.status('401').json({
            error: "Could not sign in"
        })
    }
}

const signout = (req, res) => {
    res.clearCookie('t')
    return res.status('200').json({
        message: "Signed Out"
    })
}

const requireSignin = expresJWT({
    secret: "superDuperSecret",
    algorithms: ["HS256"],
    userProperty: 'auth'
})

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!authorized) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
}

module.exports = { signin, signout, hasAuthorization, requireSignin}