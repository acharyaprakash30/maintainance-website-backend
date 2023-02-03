const express = require('express');
const ServiceTypeController = require('../controller/serviceType.controller');

const router = express.Router();

router.post("/", ServiceTypeController.userInput);
router.get("/", ServiceTypeController.showdata);
router.patch("/:id", ServiceTypeController.editServiceType);
router.delete("/:id", ServiceTypeController.destroyServiceType);

module.exports = router;