const experss = require("express")
const router = experss.Router();
const userserviceController =require("../controller/user-service.controller")
const verifyMiddleware = require("../middleware/verify")

router.post("/create",verifyMiddleware.verification,userserviceController.createUserService)
router.get("/",verifyMiddleware.verification,userserviceController.getUserSerivceById)
router.get("/find",userserviceController.findAll)
router.delete("/delete",verifyMiddleware.verification,userserviceController.delet)
router.put("/update",verifyMiddleware.verification,userserviceController.update)


module.exports=router