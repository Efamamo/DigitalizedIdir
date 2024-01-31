const {Router} = require('express')
const router = Router()
const authController = require('../controllers/authControler')

router.get('/signup',authController.getSignup)
router.get('/login',authController.getLogin)
router.post('/signup',authController.postSignup)
router.post('/login',authController.postLogin)
router.get('/logout',authController.logout)

module.exports = router