const development = {
  database: 'saksproject',
  username: 'root',
  password: 'my-secret-pw',
  // host: 'localhost',
  host: 'saks_database',
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
