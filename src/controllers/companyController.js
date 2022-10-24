const { switchDB, getDBModel } = require('../config/db');
const businessSchema = require('../models/businessSchema');

exports.getCompany = async (req, res, next) => {
  const { domain } = req.params;
  const CompanySchemas = new Map([['business', businessSchema]]);
  const companyDB = await switchDB(domain, CompanySchemas, next);
  const businessModel = await getDBModel(companyDB, 'business');
  const business = await businessModel.find({});

  res.json({
    data: business,
    domain,
  });
};
