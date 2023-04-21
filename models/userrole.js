'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserRole.init({
    userId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserRole',
  });
  UserRole.associate = (models) => {
		UserRole.belongsTo(models.User, { foreignKey: 'userId', as:'usersData', onDelete: 'CASCADE'});
		UserRole.belongsTo(models.Role, { foreignKey: 'roleId', as: 'rolesData', onDelete: 'CASCADE'});
	};
  return UserRole;
};