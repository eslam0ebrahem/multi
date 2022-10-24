const mongoose = require('mongoose');

const { Admin } = mongoose.mongo;

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
};
const getDBModel = async (db, modelName) => db.model(modelName);

const connectDB = () => new Promise((resolve, reject) => {
  mongoose.connect(DB);
  mongoose
    .connect(DB, mongoOptions)
    .then((conn) => {
      console.log('connected');
      resolve(conn);
    })
    .catch((error) => reject(error));
});
/** Switche to db on same connection pool
 * @return new connection
 */

const switchDB = async (dbName, dbSchema, next, isNew) => {
  const mongo = await connectDB();
  const result = await new Admin(mongo.connection.db).listDatabases();
  const { databases } = result;
  // if (!isNew && databases.filter((i) => i.name === dbName).length === 0) {
  //   return next(new Error('🔍 - Not Found'));
  // }
  if (mongo.connection.readyState === 1) {
    const db = mongo.connection.useDb(dbName, { useCache: true });
    // Prevent from schema re-registration
    if (!Object.keys(db.models).length) {
      dbSchema.forEach((schema, modelName) => {
        db.model(modelName, schema);
      });
    }
    return db;
  } return next(new Error('🔍 - Not Found'));
};
module.exports = { switchDB, getDBModel };
