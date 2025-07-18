const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async function globalSetup() {
  // It's important to create a global instance of mongod for the teardown function to be able to stop it.
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();

  // The instance needs to be stored in global so it can be accessed in the teardown
  globalThis.__MONGOD__ = instance;

  process.env.MONGO_URL = uri;
};