const express= require("express")
const dataEntryController = require("../controllers/dataentry")
const router = express.Router()

router.post("/add-user",dataEntryController.postUser)
router.post("/add-quiz",dataEntryController.postQuiz)
module.exports = router