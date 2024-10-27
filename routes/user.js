const express= require("express")
const userController = require("../controllers/user")
const router = express.Router()
const {isAuth} = require("../middleware/is-Auth")

router.post("/login",userController.login)
router.get("/authenticate-loader",isAuth,userController.enteredFinalController)
router.post("/create-ticket",isAuth,userController.createTicket)
router.post("/get-tickets",isAuth,userController.filterTicketByUserID)
// router.get("/get-question",isAuth,userController.validateTestFinish,userController.getEssayQuestionAndStatus)
// router.post("/save-answers",isAuth,userController.saveWritingAnswer)
// router.get("/end-exam",isAuth,userController.endExam)


module.exports = router