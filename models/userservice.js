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
    user_id: DataTypes.INTEGER,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    service_id: DataTypes.INTEGER,
    payment_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    fiscal_year_id : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userService',
  });
  return userService;
};