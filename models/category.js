'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Service,{foreignKey:"categoryId"})
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
  // Category.associate = function (models){
  //   Category.hasMany(models.Service, {
  //     as : "CategoryServices",
  //     foreignKey : "categoryId"
  //   })
  // }
  return Category;
};