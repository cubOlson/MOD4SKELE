'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [
        {
        username: 'demo1',
        email: 'demo1@aa.io',
        hashedPassword: bcrypt.hashSync('aA1!', 10),
        createdAt: new Date(),
        updatedAt: new Date()
        },

      ], {});

  },

  down: (queryInterface, Sequelize) => {
return queryInterface.bulkDelete('Users', null, {});
  }
};
