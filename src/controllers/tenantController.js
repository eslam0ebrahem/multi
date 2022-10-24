const { switchDB, getDBModel } = require('../config/db');
const businessSchema = require('../models/businessSchema');
const tenantSchema = require('../models/tenantSchema');

const CompanySchemas = new Map([['business', businessSchema]]);
const TenantSchemas = new Map([['tenant', tenantSchema]]);

exports.getTenants = async (req, res, next) => {
  const tenantDB = await switchDB('AppTenants', TenantSchemas, next);
  const tenantModel = await getDBModel(tenantDB, 'tenant');
  const tenants = await tenantModel.find({});
  res.render('index', {
    data: tenants,
  });
};
exports.newTenant = async (req, res, next) => {
  const tenantDB = await switchDB('AppTenants', TenantSchemas, next, true);
  const tenantModel = await getDBModel(tenantDB, 'tenant');
  const data = req.body;
  const tenant = tenantModel.create(data);
  const companyDB = await switchDB(data.companyName, CompanySchemas, next, 'new');
  const businessModel = await getDBModel(companyDB, 'business');
  const business = businessModel.create(data);
  Promise.all([tenant, business]);
  res.json({
    data: 'done',
  });
};
