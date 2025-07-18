module.exports = async function globalTeardown() {
  // Get the instance that was created in the setup
  const instance = globalThis.__MONGOD__;
  if (instance) {
    await instance.stop();
  }
};