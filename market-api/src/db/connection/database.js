const Sequelize = require('sequelize');

const connection = require('./connection');

let database;

switch (process.env.NODE_ENV) {
  default:
    database = new Sequelize(
      connection.development.database,
      connection.development.username,
      connection.development.password,
      {
        host: connection.development.host,
        dialect: connection.development.dialect,
        port: connection.development.port,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        define: {
          timestamps: false,
        },
        logging: connection.development.logging,
      }
    );
}

module.exports = database;
