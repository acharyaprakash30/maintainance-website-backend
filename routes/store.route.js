const express = require('express');

const StoreController = require('../controller/store.controller');
const imageUploader = require("../helpers/image-uploader")
const verifyMiddleware = require("../middleware/verify");
const { validateStore } = require('../middleware/FormValidator');


const router = express.Router();

/**
     * @swagger
     *  components:
     *    schemas:
     *      store:
     *        type: object
     *        required:
     *          - name
     *          - image
     *          - latitude
     *          - longitude
     *          - address
     *          - userId
     *          - contactNumber
     *        properties:
     *          name:
     *           type: string
     *           description: store's name
     *          image:
     *           type: string
     *           description: store's image
     *          latitude:
     *           type: float
     *           description: store's latitude
     *          longitude:
     *           type: float
     *           description: store's longitude
     *          address:
     *           type: string
     *           description: store's address
     *          userId:
     *           type: integer
     *           description: store's userId
     *          contactNumber:
     *           type: string
     *           description: store's contactNumber
     */

    // /**
    //  * @swagger
    //  * tags:
    //  *     name: store
    //  *     description: The store managing API endpoint
    //  */
       
       
    /**
 * @swagger
 * /store/create:
 *   post:
 *     summary: Create new store
 *     security:
 *       - jwt: []
 *     tags: [store]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/store'  
 *     responses:
 *       200:
 *         description: Created store successfully
 *       500:
 *         description: Some Server Error
 */


router.post("/create",verifyMiddleware.verification, imageUploader.upload.single('image'),validateStore,StoreController.userInput);

/**
 * @swagger
 * /store:
 *   get:
 *     summary: List of all store
 *     security:
 *       - jwt: []
 *     tags: [store]
 *     responses:
 *      200:
 *          description: store List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

router.get("/", StoreController.showdata);



/**
 * @swagger
 * /store/{id}:
 *   put:
 *     summary: Update store
 *     security:
 *       - jwt: []
 *     tags: [store]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: store's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/store'
 *     responses:
 *      200:
 *          description: store updated successfully
 *      500:
 *          description: Some Server Error
 */

router.patch("/:id",verifyMiddleware.verification,imageUploader.upload.single('image'), StoreController.editStoreData);


/**
 * @swagger
 * /store/{id}:
 *   delete:
 *     summary: Delete store
 *     security:
 *       - jwt: []
 *     tags: [store]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: store's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/store'
 *     responses:
 *      200:
 *          description: store deleted successfully
 *      500:
 *          description: Some Server Error
 */

router.delete("/:id", StoreController.destroyStoreData);


/**
 * @swagger
 * /store/{latitude}/{longitude}/{serviceId}:
 *   get:
 *     summary: Retrieve store
 *     security:
 *       - jwt: []
 *     tags: [store]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: store's id
 *     responses:
 *      200:
 *          description: store retrieved successfully
 *      500:
 *          description: Some Server Error
 */

router.get("/:latitude/:longitude/:serviceId", StoreController.getPlaceByCoordinates);

module.exports = router;