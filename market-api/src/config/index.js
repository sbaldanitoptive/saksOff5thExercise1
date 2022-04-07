const config = {
  migrate: false,
  port: process.env.PORT || '8080',
  socketPort: process.env.SOCKETPORT || '4000',
  uploadPathBase: global.appRoot + '/storage/',
};

module.exports = config;
