'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey:"user_id",as:"serviceUser"})
      this.belongsTo(models.Service,{foreignKey:"service_id",as:"serviceStore"})
      this.belongsTo(models.Payment,{foreignKey:"payment_id"})
    }
  }
  userService.init({
    userId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    serviceId: DataTypes.INTEGER,
    paymentId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER,
    serviceLatitude:DataTypes.STRING,
    serviceLongitude:DataTypes.STRING,
    serviceLocation:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userService',
  });
  return userService;
};