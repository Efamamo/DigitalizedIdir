
const {Router} = require('express')
const router = Router()
const {requireAuth,checkUser} = require("../middleware/authMiddleware")
const memorialController = require('../controllers/memorialController')

router.get('/memorials',checkUser,requireAuth,memorialController.getMemorials)
router.get("/memorials/:id",checkUser,requireAuth,memorialController.getSingleMemorial)
router.get('/memorials/delete/:id',checkUser,requireAuth,memorialController.verifyMemorialDelete)
router.get('/addMemorial',requireAuth,checkUser,memorialController.getAddMemorial)
router.post('/addMemorials',checkUser,memorialController.addMemorial)
router.post('/memorials/:id',checkUser,memorialController.updateMemorial)
router.post('/memorials/delete/:id',checkUser,memorialController.deleteMemorial)
router.get('/bylaw',checkUser,(req,res)=>res.render('bylaw'))
router.get('/report',checkUser,(req,res)=>res.render('report'))


module.exports = router