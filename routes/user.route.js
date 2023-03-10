const experss = require("express")
const router = experss.Router();
const userController =require("../controller/user.controller")
const verifyMiddleware = require("../middleware/verify")
const imageUpload = require("../helpers/image-uploader")
const {validateUser} = require("../middleware/FormValidator")

router.post("/create",imageUpload.upload.single('image'),verifyMiddleware.verification,validateUser,userController.create)
router.post("/login",userController.login)
router.get("/me",verifyMiddleware.verification,userController.editProfile)
router.patch("/:id",imageUpload.upload.single('image'),verifyMiddleware.verification,validateUser,userController.editUser)
router.delete("/delete",userController.deleteUser)
router.get("/",userController.index)
router.get("/userById/:id",userController.show)
router.put("/updaterole/:id", userController.updateRole)

module.exports=router;