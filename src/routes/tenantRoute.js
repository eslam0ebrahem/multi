const express = require('express');
const { getTenants, newTenant } = require('../controllers/tenantController');

const router = express.Router();
// router.use((req, res, next) => {
//   if (req.get('host').match(/\w+/)[0] === 'localhost') { return next(); }
//   const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
//   next(error);
// });
router.get('/', getTenants);
router.post('/', newTenant);

module.exports = router;
