const express = require("express")
const router = express.Router();
const paymentController = require("../controller/payment.controller")
const verifyMiddleware = require("../middleware/verify")
const { CheckRole } = require("../middleware/CheckRole");
/**
     * @swagger
     *  components:
     *    schemas:
     *      payment:
     *        type: object
     *        required:
     *          - userId
     *          - payment_type
     *          - payment_method
     *        properties:
     *          payment_type:
     *           type: string
     *           description: Category's payment_type
     *          payment_method:
     *           type: string
     *           description: Category's payment_method
     */


 
        
    /**
 * @swagger
 * /payment/create:
 *   post:
 *     summary: Create new payment
 *     security:
 *       - jwt: []
 *     tags: [payment]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/payment'  
 *     responses:
 *       200:
 *         description: Created payment successfully
 *       500:
 *         description: Some Server Error
 */

router.post("/create",verifyMiddleware.verification,CheckRole("SuperAdmin"),paymentController.PaymentInput)

/**
 * @swagger
 * /payment:
 *   get:
 *     summary: List of all payment
 *     security:
 *       - jwt: []
 *     tags: [payment]
 *     responses:
 *      200:
 *          description: payment List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

router.get("/",verifyMiddleware.verification,CheckRole("SuperAdmin"),paymentController.index)


/**
 * @swagger
 * /payment/{id}:
 *   get:
 *     summary: Retrieve payment
 *     security:
 *       - jwt: []
 *     tags: [payment]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: payment's id
 *     responses:
 *      200:
 *          description: payment retrieved successfully
 *      500:
 *          description: Some Server Error
 */

router.get("/:id",verifyMiddleware.verification,CheckRole("SuperAdmin"),paymentController.show)


/**
 * @swagger
 * /payment/update/{id}:
 *   put:
 *     summary: Update payment
 *     security:
 *       - jwt: []
 *     tags: [payment]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: payment's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/payment'
 *     responses:
 *      200:
 *          description: payment updated successfully
 *      500:
 *          description: Some Server Error
 */

router.put("/update/:id",verifyMiddleware.verification,CheckRole("SuperAdmin"),paymentController.editPayment)


/**
 * @swagger
 * /payment/delete/{id}:
 *   delete:
 *     summary: Delete payment
 *     security:
 *       - jwt: []
 *     tags: [payment]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: payment's id
 *     responses:
 *      200:
 *          description: payment deleted successfully
 *      500:
 *          description: Some Server Error
 */

router.delete("/delete/:id",verifyMiddleware.verification,CheckRole("SuperAdmin"),paymentController.deletePayment)



module.exports=router;; 