'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey:"userId"})
      this.hasOne(models.userService,{foreignKey:"paymentId",as:"payment"})
    }
  }
  Payment.init({
    // payment_type: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    userId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};