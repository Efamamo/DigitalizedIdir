const {Router} = require('express')
const router = Router()
const {requireAuth,checkUser} = require("../middleware/authMiddleware")
const homeController = require('../controllers/homeController')

router.get("/home",checkUser,requireAuth,homeController.getHome)
router.get("/addEvent",checkUser,requireAuth,homeController.getEventAdd)
router.get("/events/:id",checkUser,requireAuth,homeController.getSingleEvent)
router.post("/events/:id",checkUser,homeController.updateEvent)
router.get("/events/delete/:id",checkUser,requireAuth,homeController.verifyEventDelete)
router.post('/addEvent',checkUser,homeController.addEvent)
router.post('/events/delete/:id',checkUser,homeController.delete)
router.get('/setting',requireAuth,checkUser,homeController.setting)
router.post('/update',requireAuth,checkUser,homeController.update)
router.get('/payment',(req,res)=>{res.render('payment')})

module.exports =  router