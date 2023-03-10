const express = require('express');
const fiscal_yearController = require('../controller/fiscal_year.controller');

const router = express.Router();

router.post("/", fiscal_yearController.userInput);
router.get("/", fiscal_yearController.showData);
router.patch("/:id", fiscal_yearController.editfiscalyear);
router.delete("/:id", fiscal_yearController.deletefiscalyear);

module.exports = router;