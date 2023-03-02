const experss = require("express")
const router = experss.Router();
const userController =require("../controller/user.controller")
const verifyMiddleware = require("../middleware/verify")
const imageUpload = require("../helpers/image-uploader")


    /**
     * @swagger
     *  components:
     *    schemas:
     *      user:
     *        type: object
     *        required:
     *          - email
     *          - name
     *          - contact
     *          - password
     *          - gender
     *          - image
     *        properties:
     *          email:
     *           type: string
     *           description: User's email
     *          name:
     *           type: string
     *           description: User's name
     *          contact:
     *           type: string
     *           description: User's contact
     *          password:
     *           type: string
     *           description: User's password
     *          confirmPassword:
     *           type: string
     *           description: Confirm User's password
     *          gender:
     *           type: string
     *           description: User's gender
     *          image:
     *           type: string
     *           description: User's image
     *         
     */

    /**
     * @swagger
     * tags:
     *     name: User
     *     description: The User managing API endpoint
     */

    /**
 * @swagger
 * /user:
 *   post:
 *     summary: Create new user
 *     security:
 *       - jwt: []
 *     tags: [user]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'  
 *     consumes:
 *        - multipart/form-data
 *     parameters:
 *        - name: image
 *          in: formData
 *          description: The image file to upload
 *          required: true
 *          type: file
 *          
 *     responses:
 *       200:
 *         description: Created User successfully
 *       500:
 *         description: Some Server Error
 */
router.post("/",imageUpload.upload.single('image'),userController.create)

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login
 *     security:
 *       - jwt: []
 *     tags: [user]
 *     parameters:
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *          required: true
 *          description: user's email
 *      - in: path
 *        name: password
 *        schema:
 *          type: string
 *          required: true
 *          description: user's password
 *         
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *      200:
 *          description: logged in successfully
 *      500:
 *          description: Some Server Error
 */

router.post("/login",userController.login)


/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Update profile
 *     security:
 *       - jwt: []
 *     tags: [user]
 *     responses:
 *      200:
 *          description: user profile updated successfully
 *      500:
 *          description: Some Server Error
 */
router.get("/me",verifyMiddleware.verification,userController.editProfile)


/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user
 *     security:
 *       - jwt: []
 *     tags: [user]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: user's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *      200:
 *          description: user updated successfully
 *      500:
 *          description: Some Server Error
 */
router.put("/:id",verifyMiddleware.verification,userController.editUser)


/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Delete User
 *     security:
 *       - jwt: []
 *     tags: [user]
 *     parameters:
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *          required: true
 *          description: user's email
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *      200:
 *          description: user deleted successfully
 *      500:
 *          description: Some Server Error
 */

router.delete("/delete",userController.deleteUser)

/**
 * @swagger
 * /user:
 *   get:
 *     summary: List of all user
 *     security:
 *       - jwt: []
 *     tags: [user]
 *     responses:
 *      200:
 *          description: user List retrieved successfully
 *      500:
 *          description: Some Server Error
 */
router.get("/",userController.index)

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retrieve user
 *     security:
 *       - jwt: []
 *     tags: [user]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: user's id
 *     responses:
 *      200:
 *          description: user retrieved successfully
 *      500:
 *          description: Some Server Error
 */
router.get("/:id",userController.show)

module.exports=router;