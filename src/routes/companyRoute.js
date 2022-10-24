const express = require('express');
const { getCompany, newColor } = require('../controllers/companyController');

const router = express.Router();

router.get('/:domain', getCompany);
router.post('/:domain', newColor);

module.exports = router;
