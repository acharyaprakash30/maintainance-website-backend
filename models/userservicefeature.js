'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserServiceFeature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserServiceFeature.init({
    userServiceId: DataTypes.INTEGER,
    featureId: DataTypes.INTEGER,
    featurePrice:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserServiceFeature',
  });
  return UserServiceFeature;
};