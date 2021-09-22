'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [
        {
        username: 'cubOlson',
        email: 'cub.olson@gmail.com',
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
