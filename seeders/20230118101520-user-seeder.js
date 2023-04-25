'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users',[
      {
        name:"superadmin@gmail.com",
        contact:"9867121099",
        gender:"Male",
        password:bcrypt.hashSync("Superadmin@123",8),
        email:"superadmin@gmail.com",
        role:"SuperAdmin",
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ],{});
    const user = await queryInterface.sequelize.query(`Select id from Users;`);
    await queryInterface.bulkInsert('Payments',[
      {
        userId: user[0][0].id,
        paymentMethod:"Khalti",
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        userId: user[0][0].id,
        paymentMethod:"Esewa",
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        userId: user[0][0].id,
        paymentMethod:"Paypal",
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        userId: user[0][0].id,
        paymentMethod:"Moblie Banking",
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ],{});


  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete("Users", null, {});
     await queryInterface.bulkDelete("Payments", null, {});
  }
};
