const experss = require("express")
const router = experss.Router();
const userController =require("../controller/user.controller")
const verifyMiddleware = require("../middleware/verify")

router.post("/create",userController.create)
router.post("/login",userController.login)
router.get("/me",verifyMiddleware.verification,userController.editProfile)
router.put("/:id",verifyMiddleware.verification,userController.editUser)
router.delete("/delete",userController.deleteUser)
router.get("/",userController.index)
router.get("/userById/:id",userController.show)

module.exports=router;