const Chef  =require('../models/Chef')

module.exports.list = (req,res)=>{
    Chef.find({user:req.user._id})
        .then((chefs)=>{
            res.json(chefs)
        })
        .catch(err => res.json(err))
}

module.exports.create =(req,res)=>{
    const body = req.body
    const chef = new Chef(body)
    chef.user = req.user._id
    chef.save()
    .then((chef) => {
        res.json(chef)
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports.show = (req,res)=>{
    const id = req.params.id
    Chef.findOne({_id:id,user:req.user._id})
        .then((chef)=>{
            if(chef) {
                res.json(chef)

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
   Chef.findOneAndUpdate({_id:id,user:req.user._id}, body,{new : true, runValidators: true})
     .then((chef)=>{
         if(chef) {
             res.json(chef)
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
    Chef.findOneAndDelete({_id:id,user:req.user._id})
    .then((chef)=>{
        if(chef){
            res.json(chef)
        } else {
            res.json({})
        }

    })
    .catch((err)=>{
        res.json(err)
    })
}
