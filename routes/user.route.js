const experss = require("express")
const router = experss.Router();
const userController =require("../controller/user.controller")
const imageUpload = require("../helpers/image-uploader")
const {validateUser, changePassword, validateChangePassword, validateUserUpdate} = require("../middleware/FormValidator");
const verifyMiddleware = require("../middleware/verify")
const { CheckRole } = require("../middleware/CheckRole");


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
     *          - role
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
     *           type: file
     *           description: User's image
     *          role:
     *           type: string
     *           description: User's role
     *         
     */



 /**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create new user
 *     security:
 *       - jwt: []
 *     tags: [user]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/user'  
 *     responses:
 *       200:
 *         description: Created User successfully
 *       500:
 *         description: Some Server Error
 */

 router.post("/create",imageUpload.upload.single('image'),validateUser,userController.create)

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

router.put("/:id",imageUpload.upload.single('image'),verifyMiddleware.verification,CheckRole("superadmin","admin"),validateUserUpdate,userController.editUser)

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
 *     responses:
 *      200:
 *          description: user deleted successfully
 *      500:
 *          description: Some Server Error
 */

router.delete("/delete",verifyMiddleware.verification,CheckRole("superadmin","admin"),userController.deleteUser)

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

router.get("/",verifyMiddleware.verification,CheckRole("superadmin","admin"),userController.index)

/**
 * @swagger
 * /user/userbyid/{id}:
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

router.get("/userById/:id",verifyMiddleware.verification,CheckRole("superadmin","admin"),userController.show)
/**
 * @swagger
 * /updaterole/{id}:
 *   put:
 *     summary: update user role
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

router.put("/updaterole/:id",verifyMiddleware.verification,CheckRole("superadmin","admin"),userController.updateRole)
router.post("/forgetpassword",userController.forgetPassword)
router.post("/resetpassword",userController.resetPassword)
router.put("/changepassword/:id",verifyMiddleware.verification,CheckRole("superadmin"),validateChangePassword,userController.changePassword)


module.exports=router;