const express = require("express")
const router = express.Router();
const verifyMiddleware = require("../middleware/verify")
const serviceController = require("../controller/service.controller");
const imageUpload = require("../helpers/image-uploader");

router.post("/",verifyMiddleware.verification,imageUpload.upload.single('image'),serviceController.addService)
router.get("/",serviceController.index)
router.get("/category/:categoryId",serviceController.getserviceByCategory)
router.get("/:id",serviceController.show)
router.put("/update/:id",serviceController.updateService)
router.delete("/delete/:id",serviceController.deleteService)



module.exports=router