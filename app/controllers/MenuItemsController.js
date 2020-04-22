const MenuItem  =require('../models/MenuItem')

module.exports.list = (req,res)=>{
    MenuItem.find()
        .then((menuitems)=>{
            res.json(menuitems)
        })
        .catch(err => res.json(err))
}

module.exports.create =(req,res)=>{
    const body = req.body
    const menuitem = new MenuItem(body)
    menuitem.save()
    .then((menuitem) => {
        res.json(menuitem)
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports.show = (req,res)=>{
    const id = req.params.id
    MenuItem.findOne({_id:id})
        .then((menuitem)=>{
            if(menuitem) {
                res.json(menuitem)

            } else {// promise resolved, in case of menuitem is null
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
   MenuItem.findOneAndUpdate({_id:id}, body,{new : true, runValidators: true})
     .then((menuitem)=>{
         if(menuitem) {
             res.json(menuitem)
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
    MenuItem.findOneAndDelete({_id:id})
    .then((menuitem)=>{
        if(menuitem){
            res.json(menuitem)
        } else {
            res.json({})
        }

    })
    .catch((err)=>{
        res.json(err)
    })
}
