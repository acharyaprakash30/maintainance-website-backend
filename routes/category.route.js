const express = require('express');
const categoryController = require('../controller/category.controller');
const imageUpload = require("../helpers/image-uploader");

const router = express.Router();

router.post("/", imageUpload.upload.single('image'),categoryController.save);
router.get("/", categoryController.showAll);
router.patch("/:id",imageUpload.upload.single('image'), categoryController.updateCategoryById);
router.delete("/:id",categoryController.deleteCategory);
router.get("/all", categoryController.showCategories);
router.get("/:id", categoryController.showCategoryById);


module.exports = router;