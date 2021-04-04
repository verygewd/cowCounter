const express = require('express')
const userControl = require('../controllers/userController')
const authControl = require('../controllers/authController')
const mongoose = require('mongoose')
const User = require('../models/userModel')

const router = express.Router()

const userById = async (req, res, next, id) => {
    const userid = mongoose.Types.ObjectId(id)
    try {
        let user = await User.findById(userid)
        if (!user) {
            return res.status('400').json({
                error: "User not found"
            })
        }
        req.profile = user
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve User"
        })
    }
}

router.route('/users')
    .get(userControl.list)
    .post(userControl.create)

router.route('/users/:userid')
    .get(authControl.requireSignin, userControl.read)
    .put(authControl.requireSignin, userControl.update)
    .delete(authControl.requireSignin, authControl.hasAuthorization, userControl.remove)

router.param('userid', userById)

module.exports = router