const mongoose = require('mongoose');
const config = require('../../src/config/config');

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  w: 'majority'
}

//[MONGODB DRIVER] Warning: Top-level use of w, wtimeout, j, and fsync is deprecated. Use writeConcern instead ** above
// writeConcern: {
//   w: 'majority'
// }

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(config.mongoose.url, options); //config.mongoose.options
  });

  beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

module.exports = setupTestDB;
