const MealPlan  =require('../models/MealPlan')

module.exports.list = (req,res)=>{
    MealPlan.find({chef:req.user._id})
        .then((mealplans)=>{
            res.json(mealplans)
        })
        .catch(err => res.json(err))
}

module.exports.create =(req,res)=>{
    const body = req.body
    const mealplan = new MealPlan(body)
    mealplan.chef = req.user._id
    mealplan.save()
    .then((mealplan) => {
        res.json(mealplan)
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports.show = (req,res)=>{
    const id = req.params.id
    MealPlan.findOne({_id:id,chef:req.user._id})
        .then((mealplan)=>{
            if(mealplan) {
                res.json(mealplan)

            } else {// promise resolved, in case of chef is null
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.update = (req,res)=>{
    const id = req.params.id
    const body = req.body
    MealPlan.findOneAndUpdate({_id:id,chef:req.user._id}, body,{new : true, runValidators: true})
     .then((mealplan)=>{
         if(mealplan) {
             res.json(mealplan)
         } else {
             res.json({})
         }

     })
     .catch((err)=>{
         res.json(err)

     })

}

module.exports.destroy = (req,res)=>{
    const id = req.params.id
    MealPlan.findOneAndDelete({_id:id,user:req.user._id})
    .then((mealplan)=>{
        if(mealplan){
            res.json(mealplan)
        } else {
            res.json({})
        }

    })
    .catch((err)=>{
        res.json(err)
    })
}
