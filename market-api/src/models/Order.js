const Sequelize = require('sequelize');

const sequelize = require('../db/connection/database');

const hooks = {
  beforeCreate(order) {
    order.createdAt = new Date();
  },
};

const tableName = 'orders';

const Order = sequelize.define(
  'Order',
  {
    price: {
      type: Sequelize.FLOAT,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
  },
  { hooks, tableName }
);

module.exports = Order;
