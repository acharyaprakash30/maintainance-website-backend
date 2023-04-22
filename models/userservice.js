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
      // this.belongsTo(models.User,{foreignKey:"userId",as:"serviceUser"})
      // this.belongsTo(models.Service,{foreignKey:"serviceId",as:"serviceStore"})
      // this.belongsTo(models.Payment,{foreignKey:"paymentId",as:"payment"})
    }
  }
  userService.init({
    userId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    serviceId: DataTypes.INTEGER,
    paymentId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER,
    image:DataTypes.STRING,
    serviceLatitude:DataTypes.STRING,
    serviceLongitude:DataTypes.STRING,
    serviceLocation:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userService',
  });
  userService.associate = function(models){
    userService.belongsTo(models.User, {
      as : "user",
      foreignKey: "userId"
    });
    userService.belongsTo(models.Service, {
      as : "service",
      foreignKey: "serviceId"
    });
    userService.belongsTo(models.Store, {
      as : "store",
      foreignKey: "storeId"
    });
    userService.hasMany(models.UserServiceFeature, {
      as : "servicefeatures",
      foreignKey : "userServiceId"
    })
 
  }


  return userService;
};