
const {Router} = require('express')
const router = Router()
const {requireAuth,checkUser} = require("../middleware/authMiddleware")
const membersController = require('../controllers/membersControler')

router.get('/members',checkUser,requireAuth,membersController.getMembers)
router.get('/members/:id',checkUser,requireAuth,membersController.getSingleMember)
router.get('/members/delete/:id',checkUser,requireAuth,membersController.verifyMemberDelete)
router.post('/members/delete/:id',checkUser,membersController.deleteMembers)

module.exports = router