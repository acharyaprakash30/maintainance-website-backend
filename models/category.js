'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    CategoryName: DataTypes.STRING,
    CategoryImage: DataTypes.STRING,
    parentId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  Category.associate = function (models){
    Category.hasOne(models.Category, {
      as : "parentCategory",
      foreignKey : "parentId",
    })

    Category.hasMany(models.Service, {
      as : "CategoryServices",
      foreignKey : "id",
    })
  }
  return Category;
};