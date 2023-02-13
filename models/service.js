'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey:"userId"})
      this.hasMany(models.userService,{foreignKey:"service_id",as:"service"})
    }
  }
  Service.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    slug: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    storeId : DataTypes.INTEGER,
    categoryId : DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Service',
  });
  Service.associate = function (models){

    Service.hasMany(models.ServiceType, {
      as : "SubServicelist",
      foreignKey : "serviceId"
    });
    Service.belongsTo(models.Store, {
      as : "serviceStore",
      foreignKey : "storeId"
    });
    Service.belongsTo(models.Category, {
      as : "selectedcategory",
      foreignKey : "categoryId"
    })
  }

  return Service;
};