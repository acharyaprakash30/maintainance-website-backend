const express = require('express');
const fiscal_yearController = require('../controller/fiscal_year.controller');
const {validateFiscalYear}=require("../middleware/FormValidator")
const router = express.Router();
const verifyMiddleware = require("../middleware/verify")
const { CheckRole } = require("../middleware/CheckRole");

/**
     * @swagger
     *  components:
     *    schemas:
     *      fiscal_year:
     *        type: object
     *        required:
     *          - year
     *          - status
     *        properties:
     *          year:
     *           type: string
     *           description: fiscal_year's year
     *          status:
     *           type: boolean
     *           description: fiscal_year's status      
     */

 
 /**
 * @swagger
 * /fiscalyear/create:
 *   post:
 *     summary: Create new fiscalyear
 *     security:
 *       - jwt: []
 *     tags: [fiscal_year]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/fiscal_year'  
 *     responses:
 *       200:
 *         description: Created fiscal year successfully
 *       500:
 *         description: Some Server Error
 */

router.post("/create",verifyMiddleware.verification,CheckRole("SuperAdmin"),validateFiscalYear, fiscal_yearController.userInput);


/**
 * @swagger
 * /fiscalyear:
 *   get:
 *     summary: List of all fiscalyear
 *     security:
 *       - jwt: []
 *     tags: [fiscal_year]
 *     responses:
 *      200:
 *          description: fiscalyear List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

router.get("/", verifyMiddleware.verification,CheckRole("SuperAdmin"),fiscal_yearController.showData);


/**
 * @swagger
 * /fiscalyear/{id}:
 *   put:
 *     summary: Update fiscalyear
 *     security:
 *       - jwt: []
 *     tags: [fiscal_year]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: fiscalyear's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/fiscal_year'
 *     responses:
 *      200:
 *          description: fiscalyear updated successfully
 *      500:
 *          description: Some Server Error
 */

router.put("/:id", verifyMiddleware.verification,CheckRole("SuperAdmin"),fiscal_yearController.editfiscalyear);


/**
 * @swagger
 * /fiscalyear/delete/{id}:
 *   delete:
 *     summary: Delete User
 *     security:
 *       - jwt: []
 *     tags: [fiscal_year]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: fiscalyear's id
 *     responses:
 *      200:
 *          description: fiscalyear deleted successfully
 *      500:
 *          description: Some Server Error
 */

router.delete("/delete/:id",verifyMiddleware.verification,CheckRole("SuperAdmin"), fiscal_yearController.deletefiscalyear);

module.exports = router;