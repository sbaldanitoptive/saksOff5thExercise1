const config = {
  migrate: false,
  hostname: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || '8080',
  storagePathBase: global.appRoot + '/storage/',
};

module.exports = config;
