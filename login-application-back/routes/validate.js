const router = require('express').Router();
const validatingMethods = require('../methods/validatingMethods');

router.get('/CreateNewAccessCode', validatingMethods.CreateNewAccessCode);
router.get('/ValidateAccessCode', validatingMethods.ValidateAccessCode);

module.exports = router;