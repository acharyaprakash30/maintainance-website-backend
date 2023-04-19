const express = require("express")
const router = express.Router();
const verifyMiddleware = require("../middleware/verify")
const serviceController = require("../controller/service.controller");
const imageUpload = require("../helpers/image-uploader");
const {validateService}=require("../middleware/FormValidator")

/**
     * @swagger
     *  components:
     *    schemas:
     *      service:
     *        type: object
     *        required:
     *          - name
     *          - image
     *          - slug
     *          - userId
     *          - categoryId
     *        properties:
     *          name:
     *           type: string
     *           description: Service's name
     *          image:
     *           type: file
     *           description: Service's image
     *          slug:
     *           type: string
     *           description: Service's slug
     *          categoryId:
     *           type: integer
     *           description: Service's categoryId
     */
    
   //  /**
   //   * @swagger
   //   * tags:
   //   *     name: Service
   //   *     description: The Service managing API endpoint
   //   */
    /**
 * @swagger
 * /service/create:
 *   post:
 *     summary: Create new service
 *     security:
 *       - jwt: []
 *     tags: [service]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/service'  
 *     responses:
 *       200:
 *         description: Created Service successfully
 *       500:
 *         description: Some Server Error
 */
router.post("/create",verifyMiddleware.verification,imageUpload.upload.single('image'),validateService,serviceController.addService);

/**
 * @swagger
 * /service/{id}:
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
 *          description: Service updated successfully
 *      500:
 *          description: Some Server Error
 */

router.patch("/:id",verifyMiddleware.verification,imageUpload.upload.single('image'),serviceController.updateService)

/**
 * @swagger
 * /serivce:
 *   get:
 *     summary: List of all service
 *     security:
 *       - jwt: []
 *     tags: [service]
 *     responses:
 *      200:
 *          description: serive List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

router.get("/",serviceController.index)

/**
 * @swagger
 * /serviceFeatures:
 *   get:
 *     summary: List of all serviceFeatures
 *     security:
 *       - jwt: []
 *     tags: [service]
 *     responses:
 *      200:
 *          description: serviceFeatures List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

router.get("/serviceFeatures",serviceController.servicesByFeatues)

/**
 * @swagger
 * /category/:categoryId:
 *   get:
 *     summary: List of all service by category
 *     security:
 *       - jwt: []
 *     tags: [service]
 *     parameters:
 *      - in: path
 *        name: categoryId
 *        schema:
 *          type: integer
 *          required: true
 *          description: categoryId   
 *     responses:
 *      200:
 *          description: service by category List retrieved successfully
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
 *          description: service id
 *     responses:
 *      200:
 *          description: serivce deleted successfully
 *      500:
 *          description: Some Server Error
 */

router.delete("/delete/:id",serviceController.deleteService)



module.exports=router