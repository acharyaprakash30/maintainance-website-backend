const experss = require("express")
const router = experss.Router();
const userController =require("../controller/user.controller")

router.post("/create",userController.create)
router.post("/login",userController.login)

module.exports=router;