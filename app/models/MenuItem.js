const mongoose  = require ('mongoose')
const Schema = mongoose.Schema

const MenuItemSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique: true

    },
    description : {
        type : String,
        required : true,
        unique: true
    },
    createdAt : {
        type: Date,
        default: Date.now()
    }
})

const MenuItem = mongoose.model('MenuItem',MenuItemSchema)
module.exports = MenuItem