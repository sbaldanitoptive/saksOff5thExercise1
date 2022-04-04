const User = require('../models/User');
const Address = require('../models/Address');
const Card = require('../models/Card');
const Product = require('../models/Product');
const Image = require('../models/Image');
const Order = require('../models/Order');

const asyncAssociations = () => {
  // User-Address One-to-Many association
  const userAddressConfig = { foreignKey: 'userId', onDelete: 'CASCADE' };
  User.hasMany(Address, userAddressConfig);
  Address.belongsTo(User, userAddressConfig);

  // User-Card One-to-Many association
  const userCardConfig = { foreignKey: 'userId', onDelete: 'CASCADE' };
  User.hasMany(Card, userCardConfig);
  Card.belongsTo(User, userCardConfig);

  // Product-Image One-to-Many association
  const productImageConfig = { foreignKey: 'productId', onDelete: 'CASCADE' };
  Product.hasMany(Image, productImageConfig);
  Image.belongsTo(Product, productImageConfig);

  // Product-Order One-to-Many association
  const productOrderConfig = { foreignKey: 'productId', onDelete: 'CASCADE' };
  Product.hasMany(Order, productOrderConfig);
  Order.belongsTo(Product, productOrderConfig);

  // User-Order One-to-Many association
  const userOrderConfig = { foreignKey: 'userId', onDelete: 'CASCADE' };
  User.hasMany(Order, userOrderConfig);
  Order.belongsTo(User, userOrderConfig);

  // Card-Order One-to-Many association
  const cardOrderConfig = { foreignKey: 'paymentCardId', onDelete: 'CASCADE' };
  Card.hasMany(Order, cardOrderConfig);
  Order.belongsTo(Card, cardOrderConfig);

  // Address-Order One-to-Many association
  const addressOrderConfig = {
    foreignKey: 'shippingAddressId',
    onDelete: 'CASCADE',
  };
  Address.hasMany(Order, addressOrderConfig);
  Order.belongsTo(Address, addressOrderConfig);
};

module.exports = asyncAssociations;
