const express = require("express")
const router = express.Router();
const paymentController = require("../controller/payment.controller")
const verifyMiddleware = require("../middleware/verify")


router.post("/create",paymentController.PaymentInput)
router.get("/",paymentController.index)
router.get("/:id",paymentController.show)
router.put("/update/:id",paymentController.editPayment)
router.delete("/delete/:id",paymentController.deletePayment)



module.exports=router;; 