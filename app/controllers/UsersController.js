const pick = require('lodash/pick')
const User = require('../models/User')

//localhost:3022/users/register
module.exports.register = (req,res)=>{
    // strong parameters- serialize inputs
    //const body = pick(req.body,['username','email','password'])
    const body = req.body
    // const body = req.body
    const user = new User(body)
    user.save()
   .then(function(user){
       //const {_id,username,email} = user
       res.json(pick(user,['_id','username','email']))
   })
   .catch(err=> res.send(err))
}

//localhost:3022/users/login

module.exports.login = (req, res) => {
    const body = req.body
    let user
    User.findByCredentials(body)
        .then(userData => {
            user = pick(userData, ['_id', "username", "email"])
            return userData.generateToken(req.ip)
        })
            .then(token => res.json({user, token}))
            .catch(err => res.json(err))
}

//localhost:3022/users/account -- setting private route
module.exports.accountInfo = (req,res)=>{
    const { user } = req
    res.send(pick(user,['id','firstName','lastName','username','email']))
    
}


//localhost:3022/users/logout

module.exports.logout = (req,res)=>{
    const {user,token} = req
    User.findByIdAndUpdate(user._id,{$pull:{tokens:{token}}})
        .then(function(){
            res.send({notice:'successfully logged out'})
        })
        .catch(function(err){
            res.send(err)
        })
}



