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
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete("Users", null, {});
  }
};
