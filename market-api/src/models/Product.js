const Sequelize = require('sequelize');

const sequelize = require('../db/connection/database');

const tableName = 'products';

const Product = sequelize.define(
  'Product',
  {
    SKU: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.FLOAT,
    },
    inventory: {
      type: Sequelize.INTEGER,
    },
    deliveryTimeBusinessDaysMin: {
      type: Sequelize.INTEGER,
    },
    deliveryTimeBusinessDaysMax: {
      type: Sequelize.INTEGER,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
    },
    category: {
      type: Sequelize.STRING,
    },
  },
  { tableName }
);

module.exports = Product;
