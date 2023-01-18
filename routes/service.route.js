const express = require("express")
const router = express.Router();
const verifyMiddleware = require("../middleware/verify")

const serviceController = require("../controller/service.controller");
const { Model } = require("sequelize");

router.post("/create",verifyMiddleware.verification,serviceController.addService)
router.get("/",serviceController.index)
router.get("/:id",serviceController.show)
router.put("/update/:id",serviceController.updateService)
router.delete("/delete/:id",serviceController.deleteService)



module.exports=router