const development = {
  database: 'marketapi',
  username: 'root',
  password: 'root',
  host: 'localhost',
  dialect: 'mysql',
  port: process.env.DB_PORT || 3306,
  logging: false,
  migrationStorage: 'sequelize',
  migrationStorageTableName: 'migrations',
  seederStorage: 'sequelize',
  seederStorageTableName: 'seeders',
};

module.exports = {
  development,
};
