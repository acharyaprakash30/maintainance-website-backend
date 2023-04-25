const express = require('express');
const fiscalyearController = require('../controller/fiscalyear.controller');
const router = express.Router();
const verifyMiddleware = require("../middleware/verify")
const { CheckRole } = require("../middleware/CheckRole");

router.post('/',verifyMiddleware.verification,fiscalyearController.savefiscalyear);
router.post('/fiscalOrder',verifyMiddleware.verification,fiscalyearController.FilterByFiscalYear);
router.patch('/:id',verifyMiddleware.verification,fiscalyearController.updatefiscalyear);
router.patch('/updateFiscalYearState/:id',verifyMiddleware.verification,fiscalyearController.updateFiscalYearState);
router.get('/',verifyMiddleware.verification,fiscalyearController.getfiscalyear);
router.get('/:id',fiscalyearController.showfiscalyearById);
router.delete('/:id',verifyMiddleware.verification,fiscalyearController.deletefiscalyear);

module.exports = router