const mongoose  = require ('mongoose')
const validator = require('validator')
const jwt  = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const pick = require('lodash/pick')



const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName : {
        type : String,
        required: true,
    },
    lastName : {
        type : String,
        required: true,
    },
    username : {
        type : String,
        required: true,
        unique: true,
        minlength:5
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        validate : {
            validator: function(value){
                return validator.isEmail(value)
            },
            message: function(){
                return 'Invalid Email Format'
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    },
    mobile : {
        type : String,
        minlength : 10,
        maxlength : 10,
        unique : true,
        validate : {
            validator : function(value){
                return validator.isNumeric(value)
            },
            message : function(){
                return 'Invalid mobile number'
            }
        }
    },
    tokens : [
        {
            token :{
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    role: {
        type: String,
        enum: ['admin','customer','chef']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
userSchema.methods.generateToken = function(ipAddress){
    const user = this
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date())
    }
    const token = jwt.sign(tokenData,'jwt@123')// secret key jwt@123
    user.tokens.push({
        token
    })

    return user.save()
        .then(function(user){
            return Promise.resolve(token)
        })
        .catch(function(err){
            Promise.reject(err)
        })
}
userSchema.statics.findByCredentials = function(body){
    const User = this
    return User.findOne(pick(body,['username','email']))
                .then(function(user){
                    if(!user) {
                        return Promise.reject('Invalid email / password')
                    }
                    return bcryptjs.compare(body.password,user.password)
                        .then(function(result){
                            if(result){
                                return Promise.resolve(user)
                            } else {
                                return Promise.reject('Invalid email/password')
                            }
                        })
                })
                .catch(function(err){
                    return Promise.reject(err)
                    // return new Promise(function(resolve,reject){
                    //   reject(err)
                    // })
                })
}
userSchema.statics.findByToken= function(token){
    const User = this // reference to User model
    // handle error from jwt verify using try and catch
    let tokenData
    try {
        tokenData = jwt.verify(token,'jwt@123')
    } catch(err) {
        return Promise.reject(err)
    }
    return User.findOne({
            _id: tokenData._id,
            'tokens.token':token
    }) // either user or null
}
// own instance methods


userSchema.pre('save',function(next){
    const user = this // refers to user object, just before saving the function will be called
    console.log(user)
    if(user.isNew){
        bcryptjs.genSalt(10)
        .then(function(salt){
            bcryptjs.hash(user.password,salt)
                .then(function(encryptedPassword){
                    user.password = encryptedPassword
                    next()
                })
        })
    } else {
        next()
    }
})
const User = mongoose.model('User',userSchema)
module.exports =  User