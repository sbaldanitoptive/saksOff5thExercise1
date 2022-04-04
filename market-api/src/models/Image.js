const Sequelize = require('sequelize');

const sequelize = require('../db/connection/database');

const tableName = 'images';

const Image = sequelize.define(
  'Image',
  {
    url: {
      type: Sequelize.STRING,
    },
    width: {
      type: Sequelize.INTEGER,
    },
    height: {
      type: Sequelize.INTEGER,
    },
  },
  { tableName }
);

module.exports = Image;
