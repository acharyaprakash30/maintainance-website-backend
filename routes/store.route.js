const express = require('express');

const StoreController = require('../controller/store.controller');
const imageUploader = require("../helpers/image-uploader")
const verifyMiddleware = require("../middleware/verify");
const { CheckRole } = require("../middleware/CheckRole");
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
     *           type: file
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
     *          contactNumber:
     *           type: string
     *           description: store's contactNumber
     */


       
       
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
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/store'  
 *     responses:
 *       200:
 *         description: Created store successfully
 *       500:
 *         description: Some Server Error
 */


router.post("/create",verifyMiddleware.verification,CheckRole("superadmin"),imageUploader.upload.single('image'),validateStore,StoreController.userInput);

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

router.get("/",verifyMiddleware.verification,CheckRole("superadmin"), StoreController.showdata);



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

router.patch("/:id",verifyMiddleware.verification,CheckRole("superadmin"),imageUploader.upload.single('image'), StoreController.editStoreData);


/**
 * @swagger
 * /store/delete/{id}:
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
 *     responses:
 *      200:
 *          description: store deleted successfully
 *      500:
 *          description: Some Server Error
 */

router.delete("/delete/:id", verifyMiddleware.verification,CheckRole("superadmin"),StoreController.destroyStoreData);


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

router.get("/:latitude/:longitude/:serviceId", verifyMiddleware.verification,StoreController.getPlaceByCoordinates);

module.exports = router;