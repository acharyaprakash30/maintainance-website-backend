'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Service,{foreignKey:"userId",as:"Service"})
    }
  } 
  User.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    contact: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    IsAdmin:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};