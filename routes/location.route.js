const express = require("express")
const router = express.Router();
const locationController = require("../controller/location.controller")
const verifyMiddleware = require("../middleware/verify")


/**
     * @swagger
     *  components:
     *    schemas:
     *      location:
     *        type: object
     *        required:
     *          - address
     *          - userId
     *        properties:
     *          address:
     *           type: string
     *           description: location's address
     */

    // /**
    //  * @swagger
    //  * tags:
    //  *     name: location
    //  *     description: The location managing API endpoint
    //  */
       
    /**
 * @swagger
 * /location/create:
 *   post:
 *     summary: Create new location
 *     security:
 *       - jwt: []
 *     tags: [location]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/location'  
 *     responses:
 *       200:
 *         description: Created location successfully
 *       500:
 *         description: Some Server Error
 */

router.post("/create",verifyMiddleware.verification,locationController.locationInput)


/**
 * @swagger
 * /location:
 *   get:
 *     summary: List of all location
 *     security:
 *       - jwt: []
 *     tags: [location]
 *     responses:
 *      200:
 *          description: location List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

router.get("/",locationController.index)

/**
 * @swagger
 * /location/{id}:
 *   get:
 *     summary: Retrieve location
 *     security:
 *       - jwt: []
 *     tags: [location]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: location's id
 *     responses:
 *      200:
 *          description: location retrieved successfully
 *      500:
 *          description: Some Server Error
 */

router.get("/:id",locationController.show)


/**
 * @swagger
 * /location/update/{id}:
 *   put:
 *     summary: Update location
 *     security:
 *       - jwt: []
 *     tags: [location]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: location's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/location'
 *     responses:
 *      200:
 *          description: location updated successfully
 *      500:
 *          description: Some Server Error
 */

router.put("/update/:id",locationController.editlocation)

/**
 * @swagger
 * /location/delete/{id}:
 *   delete:
 *     summary: Delete location
 *     security:
 *       - jwt: []
 *     tags: [location]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: location's id
 *     responses:
 *      200:
 *          description: location deleted successfully
 *      500:
 *          description: Some Server Error
 */

router.delete("/delete/:id",locationController.deleteLocation)



module.exports=router;; 