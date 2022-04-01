const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');

const sequelize = require('../db/connection/database');

const hooks = {
  beforeCreate(user) {
    const pass = bcryptService().password(user);
    user.password = pass;
  },
};

const tableName = 'users';

const User = sequelize.define(
  'User',
  {
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
  },
  { hooks, tableName }
);

module.exports = User;
