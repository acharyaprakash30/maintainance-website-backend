'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StoreServiceFeature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StoreServiceFeature.init({
    storeServiceId: DataTypes.INTEGER,
    serviceFeatureId: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'StoreServiceFeature',
  });
  StoreServiceFeature.associate = function (models){
    StoreServiceFeature.belongsTo(models.ServiceType, {
      as : "serviceType",
      foreignKey : "serviceFeatureId"
    });
  
  }


  return StoreServiceFeature;
};