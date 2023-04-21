const experss = require("express")
const router = experss.Router();
const userserviceController =require("../controller/user-service.controller")
const verifyMiddleware = require("../middleware/verify");
const imageUpload = require("../helpers/image-uploader");





router.post("/multiple",verifyMiddleware.verification,imageUpload.upload.array('image',10), userserviceController.bulkServiceSubmit)

/**
     * @swagger
     *  components:
     *    schemas:
     *      userservice:
     *        type: object
     *        required:
     *          - userId
     *          - image
     *          - description
     *          - status
     *          - serviceId
     *          - paymentId
     *          - userserviceId
     *        properties:
     *          userId:
     *           type: string
     *           description: userService's user_id
     *          image:
     *           type: file
     *           description: userService's image
     *          description:
     *           type: string
     *           description: userService's description
     *          status:
     *           type: boolean
     *           description: userService's status
     *          serviceId:
     *           type: integer
     *           description: userService's service_id
     *          paymentId:
     *           type: integer
     *           description: userService's payment_id
     *          userserviceId:
     *           type: integer
     *           description: userService's payment_id
     *    
     */
    // /**
    //  * @swagger
    //  * tags:
    //  *     name: userservice
    //  *     description: The userservice managing API endpoint
    //  */
              
    /**
 * @swagger
 * /userservice/create:
 *   post:
 *     summary: Create new userservice
 *     security:
 *       - jwt: []
 *     tags: [userservice]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/userservice'  
 *     responses:
 *       200:
 *         description: Created userservice successfully
 *       500:
 *         description: Some Server Error
 */
router.post("/create",verifyMiddleware.verification,imageUpload.upload.single('image'),userserviceController.createUserService)
/**
 * @swagger
 * /userservice:
 *   get:
 *     summary: List of all userservice
 *     security:
 *       - jwt: []
 *     tags: [userservice]
 *     responses:
 *      200:
 *          description: userservice List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

router.get("/",verifyMiddleware.verification,userserviceController.getUserSerivce)
//router.get("/find",userserviceController.findAll)

/**
 * @swagger
 * /userservice/delete/{id}:
 *   delete:
 *     summary: Delete userservice
 *     security:
 *       - jwt: []
 *     tags: [userservice]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: userservice's id
 *     responses:
 *      200:
 *          description: userservice deleted successfully
 *      500:
 *          description: Some Server Error
 */

router.delete("/delete/:id",verifyMiddleware.verification,userserviceController.delet)

//router.put("/update",verifyMiddleware.verification,userserviceController.update)

/**
 * @swagger
 * /userservice/update/{id}:
 *   put:
 *     summary: Update userservice
 *     security:
 *       - jwt: []
 *     tags: [userservice]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: userservice's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userservice'
 *     responses:
 *      200:
 *          description: userservice updated successfully
 *      500:
 *          description: Some Server Error
 */

router.patch("/update/:id",verifyMiddleware.verification,imageUpload.upload.single('image'),userserviceController.update)





module.exports=router

