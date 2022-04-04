'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
    });

    await queryInterface.createTable('addresses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      type: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    });

    await queryInterface.createTable('cards', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      number: {
        type: Sequelize.STRING,
      },
      expirationDate: {
        type: Sequelize.DATE,
      },
      name: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    });

    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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
    });

    await queryInterface.createTable('images', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: Sequelize.STRING,
      },
      width: {
        type: Sequelize.INTEGER,
      },
      height: {
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
      },
    });

    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      paymentCardId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cards',
          key: 'id',
        },
      },
      shippingAddressId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'addresses',
          key: 'id',
        },
      },
    });

    return;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
    await queryInterface.dropTable('images');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('addresses');
    await queryInterface.dropTable('cards');
    await queryInterface.dropTable('users');
    return;
  },
};
