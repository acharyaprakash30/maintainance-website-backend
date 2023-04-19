'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceType extends Model {
    static associate(models) {
    }
  }
  ServiceType.init({
    name: DataTypes.STRING,
    serviceId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ServiceType',
  });
  ServiceType.associate = function (models){
    ServiceType.belongsTo(models.Service, {
      as : "SubService",
      foreignKey : "serviceId"
    })
  }
  return ServiceType;
};