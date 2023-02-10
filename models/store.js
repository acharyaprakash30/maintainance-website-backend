'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Store.init({
    name: DataTypes.STRING,
    image: DataTypes.BLOB,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    address: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Store',
  });
  Store.associate = function(models){
    Store.belongsTo(models.User, {
      as : "StoreData",
      foreignKey: "userId"
    });
  }
  return Store;
};