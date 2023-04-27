const express = require('express');
const fiscalyearController = require('../controller/fiscalyear.controller');
const router = express.Router();
const verifyMiddleware = require("../middleware/verify")
const { CheckRole } = require("../middleware/CheckRole");

router.post('/create',verifyMiddleware.verification,fiscalyearController.savefiscalyear);
router.patch('/:id',verifyMiddleware.verification,fiscalyearController.updatefiscalyear);
router.patch('/updateFiscalYearState/:id',verifyMiddleware.verification,fiscalyearController.updateFiscalYearState);
router.get('/',verifyMiddleware.verification,fiscalyearController.getfiscalyear);
router.get('/:id',fiscalyearController.showfiscalyearById);
router.delete('/delete/:id',verifyMiddleware.verification,fiscalyearController.deletefiscalyear);

module.exports = router