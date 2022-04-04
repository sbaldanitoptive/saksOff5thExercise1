const Sequelize = require('sequelize');

const sequelize = require('../db/connection/database');

const tableName = 'cards';

const Card = sequelize.define(
  'Card',
  {
    number: {
      type: Sequelize.STRING,
    },
    expirationDate: {
      type: Sequelize.DATE,
    },
    name: {
      type: Sequelize.STRING,
    },
  },
  { tableName }
);

module.exports = Card;
