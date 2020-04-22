const mongoose  = require ('mongoose')

const Schema = mongoose.Schema

const MealPlanSchema = new Schema({
    title : {
        type : String,
        required : true,
        unique: true

    },
    isVeg : {
        type : Boolean,
        required : true,

    },
    description : {
        type : String,
        required : true,
        unique: true

    },
    chef : {
            type : Schema.Types.ObjectId,
            required : true,
            ref : 'Chef'
    },
    menuItems : [{
        type : Schema.Types.ObjectId,
        ref : 'MenuItem'

    }],
    planPrice : [{
        type : Schema.Types.ObjectId,
        ref : 'PlanPrice'

    }],
    createdAt : {
        type: Date,
        default: Date.now()
    }
})

const MealPlan = mongoose.model('MealPlan',MealPlanSchema)
module.exports = MealPlan