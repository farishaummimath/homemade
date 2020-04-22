const  User= require('../models/User')
const authenticateUser = function(req,res,next){
    const token = req.header('x-auth')
    User.findByToken(token)
        .then(function(user){
            //res.send(user)
            if(user){
                req.user = user
                req.token = token
                next()
            } else {
                res.status('401').send({notice:'Token  not found'})
            }
            
        })
        .catch(function(err){
            res.status('401').send(err)
        })
}
const authorizeAdmin = (req,res,next)=>{
    if(req.user.role == 'admin'){
        next()
    } else {
        res.status('403').json({'notice':"You are not authorised"})
    }
}
const authorizeChef = (req,res,next)=>{
    if(req.user.role == 'chef'){
        next()
    } else {
        res.status('403').json({'notice':"You are not authorised to view as Chef"})
    }
}
const authorizeCustomer = (req,res,next)=>{
    if(req.user.role == 'customer'){
        next()
    } else {
        res.status('403').json({'notice':"You are not authorised to view as Chef"})
    }
}


module.exports = {
    authenticateUser,
    authorizeAdmin,
    authorizeChef,
    authorizeCustomer
}
