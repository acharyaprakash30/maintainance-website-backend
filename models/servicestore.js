'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceStore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ServiceStore.init({
    serviceId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ServiceStore',
  });
  ServiceStore.associate = function (models){

    ServiceStore.belongsTo(models.Service, {
      as : "service",
      foreignKey : "serviceId"
    });
    ServiceStore.hasMany(models.StoreServiceFeature, {
      as : "serviceStoreFeatures",
      foreignKey : "storeServiceId"
    });
  }

  return ServiceStore;
};