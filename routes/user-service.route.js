const experss = require("express")
const router = experss.Router();
const userserviceController =require("../controller/user-service.controller")
const verifyMiddleware = require("../middleware/verify");
const { CheckRole } = require("../middleware/CheckRole");
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


router.post("/create",verifyMiddleware.verification,CheckRole("superadmin"),imageUpload.upload.single('image'),userserviceController.createUserService)

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

router.get("/",verifyMiddleware.verification,CheckRole("superadmin"),userserviceController.getUserSerivce)
router.get("/user/:id",verifyMiddleware.verification,CheckRole("superadmin"),userserviceController.getUserSerivceByUserId)
router.get("/vendor/:id",verifyMiddleware.verification,CheckRole("superadmin"),userserviceController.getUserSerivceByVendorId)

router.patch("/update/:id",verifyMiddleware.verification,CheckRole("superadmin"),imageUpload.upload.single('image'),userserviceController.update)

router.post("/multiple",verifyMiddleware.verification,CheckRole("superadmin"),imageUpload.upload.array('image',10), userserviceController.bulkServiceSubmit)



module.exports=router

