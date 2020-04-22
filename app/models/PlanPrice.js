const mongoose  = require ('mongoose')


const Schema = mongoose.Schema

const PlanPriceSchema = new Schema({
    mealPlan : {
        type : Schema.Types.ObjectId,
        ref : 'MenuPlan'

    },
    duration : {
        type : Number,
        unique : true,
        required: true
    },
    price : {
        type : Number,
        unique : true,
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now()
    }
})

const PlanPrice = mongoose.model('PlanPrice',PlanPriceSchema)
module.exports = PlanPrice