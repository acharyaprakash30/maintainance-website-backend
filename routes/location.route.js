const express = require("express")
const router = express.Router();
const locationController = require("../controller/location.controller")
const verifyMiddleware = require("../middleware/verify")


router.post("/create",verifyMiddleware.verification,locationController.locationInput)
router.get("/",locationController.index)
router.get("/:id",locationController.show)
router.put("/update/:id",locationController.editlocation)
router.delete("/delete/:id",locationController.deleteLocation)



module.exports=router;; 