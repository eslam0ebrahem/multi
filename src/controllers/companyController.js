const { switchDB, getDBModel } = require('../config/db');
const businessSchema = require('../models/businessSchema');
const tenantSchema = require('../models/tenantSchema');

exports.getCompany = async (req, res, next) => {
  const { domain } = req.params;
  console.log(domain);
  // const CompanySchemas = new Map([['business', businessSchema]]);
  // const companyDB = await switchDB(domain, CompanySchemas, next);
  // const businessModel = await getDBModel(companyDB, 'business');
  // const business = await businessModel.find({});
  // res.json({
  //   data: business,
  //   domain,
  // });
  const TenantSchemas = new Map([['tenant', tenantSchema]]);
  const tenantDB = await switchDB('AppTenants', TenantSchemas, next);
  const tenantModel = await getDBModel(tenantDB, 'tenant');
  const tenant = await tenantModel.find({ companyName: domain });
  // res.json({
  //   data: tenant,
  // });
  res.render('index', {
    data: tenant,
  });
};
exports.newColor = async (req, res, next) => {
  const { domain } = req.params;
  const TenantSchemas = new Map([['tenant', tenantSchema]]);
  const tenantDB = await switchDB('AppTenants', TenantSchemas, next);
  const tenantModel = await getDBModel(tenantDB, 'tenant');
  const tenants = await tenantModel.findOneAndUpdate({ companyName: 'domain' }, { 'info.color': 'trynow' }, {
    new: true,
  });
  res.json({
    data: tenants,
  });
};
