'use strict';

const { ROLE, ADDRESS_TYPE, CATEGORY } = require('../../helpers/types');
const bcryptService = require('../../services/bcrypt.service');

module.exports = {
  async up(queryInterface, Sequelize) {
    const bcrypt = bcryptService();
    // Initialize Users table
    await queryInterface.bulkInsert('users', [
      {
        email: 'fullcustomer@email.com',
        password: bcrypt.password('fullcustomer'),
        role: ROLE.CUSTOMER,
      },
      {
        email: 'basiccustomer@email.com',
        password: bcrypt.password('basiccustomer'),
        role: ROLE.CUSTOMER,
      },
      {
        email: 'admin@email.com',
        password: bcrypt.password('admin'),
        role: ROLE.MERCHANDISER,
      },
    ]);

    const users = await queryInterface.sequelize.query(`SELECT id from users;`);

    const fullCustomer = users[0];

    await queryInterface.bulkInsert('addresses', [
      {
        line1: '123 ABC Street',
        line2: '',
        city: 'Wichita',
        state: 'KS',
        zipCode: '67211',
        country: 'USA',
        type: ADDRESS_TYPE.BILLING,
        userId: fullCustomer.id,
      },
      {
        line1: '123 ABC Street',
        line2: '',
        city: 'Wichita',
        state: 'KS',
        zipCode: '67211',
        country: 'USA',
        type: ADDRESS_TYPE.SHIPPING,
        userId: fullCustomer.id,
      },
    ]);

    await queryInterface.bulkInsert('cards', [
      {
        number: '9992-3123-4323-4522',
        expirationDate: new Date('2025-03-01'),
        name: 'Full Customer',
        userId: fullCustomer.id,
      },
    ]);
    return;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('addresses', null, {});
    await queryInterface.bulkDelete('cards', null, {});
  },
};
