const Sequelize = require('sequelize');

const sequelize = require('../db/connection/database');

const tableName = 'addresses';

const Address = sequelize.define(
  'Address',
  {
    type: {
      type: Sequelize.STRING,
    },
    line1: {
      type: Sequelize.STRING,
    },
    line2: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    zipCode: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
  },
  { tableName }
);

module.exports = Address;
