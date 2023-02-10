const express = require('express');
const categoryController = require('../controller/category.controller');
const imageUpload = require("../helpers/image-uploader");

const router = express.Router();

router.post("/", imageUpload.upload.single('image'),categoryController.save);
router.get("/", categoryController.showAll);
//router.get("/services", categoryController.showServices);


module.exports = router;