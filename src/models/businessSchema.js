const { Schema } = require('mongoose');

const businessSchema = new Schema({
  name: {
    type: String,
  },
  companyName: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  zip_code: {
    type: String,
  },
  landmark: {
    type: String,
  },
  mobile: {
    type: String,
  },
  alternate_number: {
    type: String,
  },
});
module.exports = businessSchema;
