const {Router} = require('express')
const router = Router()
const {requireAuth,checkUser} = require("../middleware/authMiddleware")

const newsController = require('../controllers/newsController')
router.get('/',(req,res)=>{res.render('index')})
router.get('/news',checkUser,requireAuth,checkUser,newsController.getNews)
router.get('/add',checkUser,requireAuth,newsController.getAdd)
router.get('/announcements/:id',checkUser,requireAuth,newsController.getSingleAnnouncement)
router.get('/news/:id',checkUser,newsController.getSingleNews)
router.get('/news/delete/:id',checkUser,requireAuth,newsController.verifyNewsDelete)
router.get('/announcements/delete/:id',checkUser,requireAuth,newsController.verifyAnnDelete)
router.post('/announcements/:id',checkUser,newsController.updateAnnouncement)
router.post('/news/:id',checkUser,newsController.updateNews)
router.post("/announcements/delete/:id/del",checkUser,newsController.deleteAnnouncement)
router.post("/news/delete/:id/del",checkUser,newsController.deleteNews)
router.post('/addAnnounce',checkUser,newsController.addAnnouncement)
router.post('/addNews',checkUser,newsController.addNews)
router.post('/clearNotifications/:id',newsController.clear)


module.exports = router