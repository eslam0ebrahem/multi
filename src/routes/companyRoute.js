const express = require('express');
const { getCompany } = require('../controllers/companyController');

const router = express.Router();

router.get('/:domain', getCompany);

module.exports = router;
