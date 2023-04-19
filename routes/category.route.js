const express = require('express');
const categoryController = require('../controller/category.controller');
const imageUpload = require("../helpers/image-uploader");
const {validateCategory} = require("../middleware/FormValidator")
const router = express.Router();


/**
     * @swagger
     *  components:
     *    schemas:
     *      category:
     *        type: object
     *        required:
     *          - CategoryName
     *          - CategoryImage
     *          - parentId
     *        properties:
     *          CategoryName:
     *           type: string
     *           description: Category's CategoryName
     *          image:
     *           type: file
     *           description: Category's CategoryImage
     *          parentId:
     *           type: integer
     *           description: Category's parentId
     */

    // /**
    //  * @swagger
    //  * tags:
    //  *     name: category
    //  *     description: The category managing API endpoint
    //  */
    

 /**
 * @swagger
 * /category/create:
 *   post:
 *     summary: Create new category
 *     security:
 *       - jwt: []
 *     tags: [category]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/category'  
 *     responses:
 *       200:
 *         description: Created category successfully
 *       500:
 *         description: Some Server Error
 */

    router.post("/create", imageUpload.upload.single('image'),validateCategory,categoryController.save);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: List of all category
 *     security:
 *       - jwt: []
 *     tags: [category]
 *     responses:
 *      200:
 *          description: category List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

router.get("/", categoryController.showAll);


/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update category
 *     security:
 *       - jwt: []
 *     tags: [category]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: category's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/category'
 *     responses:
 *      200:
 *          description: category updated successfully
 *      500:
 *          description: Some Server Error
 */

router.put("/:id",imageUpload.upload.single('image'),validateCategory,categoryController.updateCategoryById);

/**
 * @swagger
 * /category/delete/{id}:
 *   delete:
 *     summary: Delete category
 *     security:
 *       - jwt: []
 *     tags: [category]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: category's id
 *     responses:
 *      200:
 *          description: category deleted successfully
 *      500:
 *          description: Some Server Error
 */

router.delete("/delete/:id",categoryController.deleteCategory);


/**
 * @swagger
 * /category/all:
 *   get:
 *     summary: List of all category
 *     security:
 *       - jwt: []
 *     tags: [category]
 *     responses:
 *      200:
 *          description: category List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

router.get("/all", categoryController.showCategories);


/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Retrieve category
 *     security:
 *       - jwt: []
 *     tags: [category]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: category's id
 *     responses:
 *      200:
 *          description: category retrieved successfully
 *      500:
 *          description: Some Server Error
 */

router.get("/:id", categoryController.showCategoryById);


module.exports = router;