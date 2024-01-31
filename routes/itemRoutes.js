const {Router} = require('express')
const router = Router()
const {requireAuth,checkUser} = require("../middleware/authMiddleware")

const itemController = require('../controllers/itemsController')


router.get('/items',checkUser,itemController.getItems)
router.get('/additems',checkUser,requireAuth,itemController.getAddItems)
router.get('/items/delete/:id',checkUser,requireAuth,itemController.verifyDelete)
router.get('/items/:id',checkUser,requireAuth,itemController.getSingleItem)
router.post('/items/delete/:id',checkUser,itemController.deleteItem)
router.post('/additems',checkUser,itemController.addItem)
router.post('/items/:id',checkUser,itemController.updateItem)
router.get('/contact-admins',itemController.contactAdmin)



module.exports = router