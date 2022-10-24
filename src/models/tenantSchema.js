const { Schema } = require('mongoose');

const tenantSchema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  username: {
    type: String,
  },
  language: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  companyName: {
    type: String,
    unique: true,
  },
});

module.exports = tenantSchema;
