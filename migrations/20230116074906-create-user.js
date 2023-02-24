'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM("Male", "Female", "Others"), 
      },
      image: {
        type: Sequelize.BLOB
      },
      role:{
        type: Sequelize.INTEGER,
        defaultValue:1 //1 is normal user 2. super admin 3.admin  4. vendor 5.deliveryAgent

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};