'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userServices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      image:{
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM("Pending", "Accept Order", "Maintaining","Done"),
        defaultValue: "Pending"
      },
      serviceId: {
        type: Sequelize.INTEGER
      },
      paymentId: {
        type: Sequelize.INTEGER
      },
      storeId: {
        type: Sequelize.INTEGER
      },
      serviceLatitude: {
        type: Sequelize.STRING
      },
      serviceLongitude : {
        type: Sequelize.STRING
      },
      serviceLocation : {
        type: Sequelize.STRING
      },
      serviceDate: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
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
    await queryInterface.dropTable('userServices');
  }
};