const express = require('express')
const router = express.Router()
const {authenticateUser,authorizeCustomer,authorizeChef,authorizeAdmin}  =require('../app/middlewares/authentication')

const UsersController = require('../app/controllers/UsersController')
const MenuItemsController = require('../app/controllers/MenuItemsController')
const ChefsController = require('../app/controllers/ChefsController')
const MealPlansController = require('../app/controllers/MealPlansController')

router.post('/users/register',UsersController.register)
router.post('/users/login',UsersController.login)
router.get('/users/account',authenticateUser,UsersController.accountInfo)
router.delete('/users/logout', authenticateUser, UsersController.logout)

router.get('/menuitems',authenticateUser,MenuItemsController.list)
router.post('/menuitems',authenticateUser,authorizeAdmin,MenuItemsController.create)
router.get('/menuitems/:id',authenticateUser,MenuItemsController.show)
router.put('/menuitems/:id',authenticateUser,authorizeAdmin,MenuItemsController.update)
router.delete('/menuitems/:id',authenticateUser,authorizeAdmin,MenuItemsController.destroy)

router.get('/chefs',authenticateUser,ChefsController.list)
router.post('/chefs',authenticateUser,authorizeChef,ChefsController.create)
router.get('/chefs/:id',authenticateUser,ChefsController.show)
router.put('/chefs/:id',authenticateUser,authorizeChef,ChefsController.update)
router.delete('/chefs/:id',authenticateUser,authorizeChef,ChefsController.destroy)

router.get('/chefs/:id/mealplans',authenticateUser,MealPlansController.list)
router.post('/chefs/:id/mealplans',authenticateUser,authorizeChef,MealPlansController.create)
router.get('/chefs/:id/mealplans/:id',authenticateUser,MealPlansController.show)
router.put('/chefs/:id/mealplans/:id',authenticateUser,authorizeChef,MealPlansController.update)
router.delete('/chefs/:id/mealplans/:id',authenticateUser,authorizeChef,MealPlansController.destroy)


module.exports = router