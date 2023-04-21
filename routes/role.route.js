const express = require('express');
const roleController = require('../controller/role.controller');

const router = express.Router();
const verifyMiddleware = require("../middleware/verify")
const { CheckRole } = require("../middleware/CheckRole");



/**
     * @swagger
     *  components:
     *    schemas:
     *      role:
     *        type: object
     *        required:
     *          - name
     *        properties:
     *          name:
     *           type: string
     *           description: Role's name
     *         
     */




 /**
 * @swagger
 * /role/create:
 *   post:
 *     summary: Create new role
 *     security:
 *       - jwt: []
 *     tags: [role]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/role'  
 *     responses:
 *       200:
 *         description: Created role successfully
 *       500:
 *         description: Some Server Error
 */

router.post("/create", verifyMiddleware.verification,CheckRole("SuperAdmin"),roleController.create);

/**
 * @swagger
 * /role:
 *   get:
 *     summary: List of all role
 *     security:
 *       - jwt: []
 *     tags: [role]
 *     responses:
 *      200:
 *          description: role List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

router.get("/",verifyMiddleware.verification,CheckRole("SuperAdmin"), roleController.showAll);

/**
 * @swagger
 * /role/{id}:
 *   put:
 *     summary: Update role
 *     security:
 *       - jwt: []
 *     tags: [role]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: role's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/role'
 *     responses:
 *      200:
 *          description: role updated successfully
 *      500:
 *          description: Some Server Error
 */

router.put("/:id",verifyMiddleware.verification,CheckRole("SuperAdmin"), roleController.update);


/**
 * @swagger
 * /role/delete/{id}:
 *   delete:
 *     summary: Delete role
 *     security:
 *       - jwt: []
 *     tags: [role]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: role's email
 *     responses:
 *      200:
 *          description: role deleted successfully
 *      500:
 *          description: Some Server Error
 */

router.delete("/delete/:id", verifyMiddleware.verification,CheckRole("SuperAdmin"),roleController.delet);

module.exports = router;