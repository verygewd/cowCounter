const mongoose = require('mongoose')
const crypto = require('crypto')



const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: "Username already taken",
        require: "Username Required"
    },
    hashed_password: {
        type: String,
        require: "Password Required"
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    clickCount: {
        type: Number,
        default: 0
    }
})


//virtual password and using a hashed_password for security
UserSchema.virtual('password')
    .set(function(password){
        this._password = password
        this.salt= this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() {
        return this._password
    })




UserSchema.methods = {
    authenticated: function(plainText) {
        return this.encryptPassword(plainText) == this.hashed_password
    },
    encryptPassword: function(password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    },
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}



UserSchema.path('hashed_password').validate(
    function() {
        if (this._password && this._password.length < 6) {
            this.invalidate('password', "Password must be at least 6 characters")
        }
        if (this.isNew && !this._password) {
            this.invalidate('password', 'Password Required')
        }
    }, null
)



module.exports = mongoose.model('User', UserSchema)