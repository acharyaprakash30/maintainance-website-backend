const express = require('express');

const StoreController = require('../controller/store.controller');
const imageUploader = require("../helpers/image-uploader")


const router = express.Router();

router.post("/", imageUploader.upload.single('image'),StoreController.userInput);
router.get("/", StoreController.showdata);
router.patch("/:id",imageUploader.upload.single('image'), StoreController.editStoreData);
router.delete("/:id", StoreController.destroyStoreData);
router.get("/:latitude/:longitude", StoreController.getPlaceByCoordinates);

module.exports = router;