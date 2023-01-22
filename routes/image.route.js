const express = require("express")
const router = express.Router()
const imageController = require("../controller/image.controller")
const imageUploader = require("../helpers/image-uploader")
const verifyMiddleware = require("../middleware/verify")


router.post("/upload",verifyMiddleware.verification,imageUploader.upload.single('image'),imageController.upload)

module.exports=router;