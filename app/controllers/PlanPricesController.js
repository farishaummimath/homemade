const PlanPrice  =require('../models/PlanPrice')

module.exports.list = (req,res)=>{
    PlanPrice.find()
        .then((planprices)=>{
            res.json(planprices)
        })
        .catch(err => res.json(err))
}

module.exports.create =(req,res)=>{
    const body = req.body
    const planprice = new PlanPrice(body)
    // planprice.mealPlan = 
    planprice.save()
    .then((planprice) => {
        res.json(planprice)
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports.show = (req,res)=>{
    const id = req.params.id
    PlanPrice.findOne({_id:id})
        .then((planprice)=>{
            if(planprice) {
                res.json(planprice)

            } else {// promise resolved, in case of planprice is null
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
    PlanPrice.findOneAndUpdate({_id:id}, body,{new : true, runValidators: true})
     .then((planprice)=>{
         if(planprice) {
             res.json(planprice)
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
    PlanPrice.findOneAndDelete({_id:id})
    .then((planprice)=>{
        if(planprice){
            res.json(planprice)
        } else {
            res.json({})
        }

    })
    .catch((err)=>{
        res.json(err)
    })
}
