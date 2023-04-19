const express = require('express');
const ServiceTypeController = require('../controller/serviceType.controller');
const {validateServiceType}=require("../middleware/FormValidator")
const router = express.Router();


/**
     * @swagger
     *  components:
     *    schemas:
     *      servicetype:
     *        type: object
     *        required:
     *          - name
     *          - serviceId
     *        properties:
     *          name:
     *           type: string
     *           description: servicetype's name
     *          serviceId:
     *           type: integer
     *           description: servicetype's serviceId
     *         
     */
    // /**
    //  * @swagger
    //  * tags:
    //  *     name: servicetype
    //  *     description: The servicetype managing API endpoint
    //  */


 /**
 * @swagger
 * /servicetype/create:
 *   post:
 *     summary: Create new servicetype
 *     security:
 *       - jwt: []
 *     tags: [servicetype]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/servicetype'  
 *     responses:
 *       200:
 *         description: Created servicetype successfully
 *       500:
 *         description: Some Server Error
 */

router.post("/create", validateServiceType,ServiceTypeController.userInput);

/**
 * @swagger
 * /servicetype:
 *   get:
 *     summary: List of all servicetype
 *     security:
 *       - jwt: []
 *     tags: [servicetype]
 *     responses:
 *      200:
 *          description: servicetype List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

router.get("/", ServiceTypeController.showdata);

/**
 * @swagger
 * /servicetype/{id}:
 *   get:
 *     summary: Retrieve servicetype
 *     security:
 *       - jwt: []
 *     tags: [servicetype]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: servicetype's id
 *     responses:
 *      200:
 *          description: servicetype retrieved successfully
 *      500:
 *          description: Some Server Error
 */

router.get("/:id", ServiceTypeController.showdataById);

/**
 * @swagger
 * /servicetype/{id}:
 *   put:
 *     summary: Update servicetype
 *     security:
 *       - jwt: []
 *     tags: [servicetype]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: servicetype's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/servicetype'
 *     responses:
 *      200:
 *          description: servicetype updated successfully
 *      500:
 *          description: Some Server Error
 */

router.put("/:id", ServiceTypeController.editServiceType);

/**
 * @swagger
 * /servicetype/delete/{id}:
 *   delete:
 *     summary: Delete servicetype
 *     security:
 *       - jwt: []
 *     tags: [servicetype]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: servicetype's id
 *     responses:
 *      200:
 *          description: servicetype deleted successfully
 *      500:
 *          description: Some Server Error
 */

router.delete("/delete/:id", ServiceTypeController.destroyServiceType);

module.exports = router;