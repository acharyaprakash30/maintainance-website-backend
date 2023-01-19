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
        IsAdmin:true,
        createdAt:new Date(),
        updatedAt:new Date()
 
      }
    ],{});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("Users", null, {});

  }
};
