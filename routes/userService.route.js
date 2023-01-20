const experss = require("express")
const router = experss.Router();
const userserviceController =require("../controller/userService.controller")
const verifyMiddleware = require("../middleware/verify")

router.get("/userservice",verifyMiddleware.verification,userserviceController.getUserSerivceById)


module.exports=router