'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ServiceType.init({
    name: DataTypes.STRING,
    serviceId: DataTypes.INTEGER,
    price : DataTypes.INTEGER
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