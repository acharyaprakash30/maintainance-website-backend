'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserServiceImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserServiceImages.init({
    userServiceId: DataTypes.INTEGER,
    image:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserServiceImages',
  });
  return UserServiceImages;
};