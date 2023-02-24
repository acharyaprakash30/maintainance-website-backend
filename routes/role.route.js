const express = require('express');
const roleController = require('../controller/role.controller');

const router = express.Router();

router.post("/create", roleController.create);
router.get("/", roleController.showAll);
router.patch("/:id", roleController.update);
router.delete("/:id", roleController.delet);

module.exports = router;