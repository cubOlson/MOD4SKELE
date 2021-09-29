'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('UserLocations', [
        {userId: 1 , city: 'Dallas', state: 'TX', country: 'US', buttonText: 'Dallas Weather', createdAt: new Date(), updatedAt: new Date()}
      ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('UserLocations', null, {});

  }
};
