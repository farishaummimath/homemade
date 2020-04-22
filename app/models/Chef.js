const mongoose  = require ('mongoose')
const validator = require('validator')
const jwt  = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const pick = require('lodash/pick')

const Schema = mongoose.Schema

const chefSchema = new Schema({
    chefName : {
        type : String,
        required: true,
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    location : {
        type : String,
        required: true,
    },
    rating :{
        type : Number
    },
    menuItems : [
        {
            menuItem : {
                type : Schema.Types.ObjectId,
                ref : 'MenuItem'
            },
            active : {
                type : Boolean,
                required: true,
            }      
    }],
    createdAt : {
        type: Date,
        default: Date.now()
    }
    
})

const Chef  = mongoose.model('Chef',chefSchema)
module.exports =  Chef