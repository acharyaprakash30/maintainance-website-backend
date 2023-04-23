'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Payments',[
      {
        userId: 1,
        paymentMethod:"Khalti" 
      },
      {
        userId: 1,
        paymentMethod:"Esewa" 
      },
      {
        userId: 1,
        paymentMethod:"Paypal" 
      },
      {
        userId: 1,
        paymentMethod:"Moblie Banking" 
      }
    ],{});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete("Payments", null, {});
  }
};