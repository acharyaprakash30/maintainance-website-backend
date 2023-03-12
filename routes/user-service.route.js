const experss = require("express")
const router = experss.Router();
const userserviceController =require("../controller/user-service.controller")
const verifyMiddleware = require("../middleware/verify");
const imageUpload = require("../helpers/image-uploader");


router.post("/create",verifyMiddleware.verification,imageUpload.upload.single('image'),userserviceController.createUserService)
router.get("/",verifyMiddleware.verification,userserviceController.getUserSerivce)
//router.get("/find",userserviceController.findAll)
router.delete("/delete/:id",verifyMiddleware.verification,userserviceController.delet)
//router.put("/update",verifyMiddleware.verification,userserviceController.update)
router.patch("/update/:id",verifyMiddleware.verification,imageUpload.upload.single('image'),userserviceController.update)

module.exports=router

