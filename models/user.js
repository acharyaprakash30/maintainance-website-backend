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
      this.hasOne(models.userService,{foreignKey:"userId",as:"user"})
      this.hasMany(models.Service,{foreignKey:"userId",as:"Service"})
      this.hasOne(models.Location,{foreignKey:"userId",as:"Location"})
      this.hasOne(models.Payment,{foreignKey:"userId",as:"Payment"})
    }
  } 
  User.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    contact: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    role:DataTypes.STRING,
    subTotal:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = function(models){
    User.hasMany(models.Store, {
      as : "UserStores",
      foreignKey: "userId"
    })
  }
  return User;
};



[
  {
    userServiceId:1,
    featureId:1,
    featurePrice:100
  },
  {
    userServiceId:1,
    featureId:1,
    featurePrice:100
  },
]