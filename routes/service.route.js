const express = require("express")
const router = express.Router();
const verifyMiddleware = require("../middleware/verify")
const serviceController = require("../controller/service.controller");
const imageUpload = require("../helpers/image-uploader");
/**
 * @swagger
 * tags:
 *     name: Service
 *     description: The service managing API endpoint
 */

    /**
     * @swagger
     *  components:
     *    schemas:
     *      Service:
     *        type: object
     *        required:
     *          - name
     *          - image
     *          - slug
     *          - userId
     *          - storeId
     *          - categoryId
     *        properties:
     *          name:
     *           type: string
     *           description: service's name
     *          image:
     *           type: string
     *           description: service's image
     *          slug:
     *           type: string
     *           description: service's slug
     *          userId:
     *           type: integer
     *           description:  userId
     *          storeId:
     *           type: integer
     *           description:  storeId
     *          categoryId:
     *           type: integer
     *           description:  categoryId
     *         
     */


    /**
 * @swagger
 * /service:
 *   post:
 *     summary: Create new service
 *     security:
 *       - jwt: []
 *     tags: [service]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/service'    
 *     responses:
 *       200:
 *         description: Created service successfully
 *       500:
 *         description: Some Server Error
 */
router.post("/",verifyMiddleware.verification,imageUpload.upload.single('image'),serviceController.addService)

/**
 * @swagger
 * /service:
 *   get:
 *     summary: List of all service
 *     security:
 *       - jwt: []
 *     tags: [service]
 *     responses:
 *      200:
 *          description: service List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

router.get("/",serviceController.index)

/**
 * @swagger
 * /service/category/{categoryId}:
 *   get:
 *     summary: Retrieve service
 *     security:
 *       - jwt: []
 *     tags: [service]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: service's id
 *     responses:
 *      200:
 *          description: service retrieved successfully
 *      500:
 *          description: Some Server Error
 */
router.get("/category/:categoryId",serviceController.getserviceByCategory)

/**
 * @swagger
 * /service/{id}:
 *   get:
 *     summary: Retrieve service
 *     security:
 *       - jwt: []
 *     tags: [service]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: service's id
 *     responses:
 *      200:
 *          description: service retrieved successfully
 *      500:
 *          description: Some Server Error
 */
router.get("/:id",serviceController.show)

/**
 * @swagger
 * /service/update/{id}:
 *   put:
 *     summary: Update service
 *     security:
 *       - jwt: []
 *     tags: [service]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: service's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/service'
 *     responses:
 *      200:
 *          description: service updated successfully
 *      500:
 *          description: Some Server Error
 */
router.put("/update/:id",serviceController.updateService)

/**
 * @swagger
 * /service/delete/{id}:
 *   delete:
 *     summary: Delete service
 *     security:
 *       - jwt: []
 *     tags: [service]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: service's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/service'
 *     responses:
 *      200:
 *          description: service deleted successfully
 *      500:
 *          description: Some Server Error
 */

router.delete("/delete/:id",serviceController.deleteService)




module.exports=router