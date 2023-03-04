const express = require('express');

const StoreController = require('../controller/store.controller');
const imageUploader = require("../helpers/image-uploader")
const verifyMiddleware = require("../middleware/verify")


const router = express.Router();

router.post("/",verifyMiddleware.verification, imageUploader.upload.single('image'),StoreController.userInput);
router.get("/", StoreController.showdata);
router.patch("/:id",verifyMiddleware.verification,imageUploader.upload.single('image'), StoreController.editStoreData);
router.delete("/:id", StoreController.destroyStoreData);
router.get("/:latitude/:longitude/:serviceId", StoreController.getPlaceByCoordinates);

module.exports = router;