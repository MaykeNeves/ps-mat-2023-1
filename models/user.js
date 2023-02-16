'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING(100),
    email: DataTypes.STRING(100),
    verified_email: DataTypes.BOOLEAN(),
    id_admin: DataTypes.BOOLEAN,
    phone: DataTypes.STRING(20),
    password: DataTypes.STRING(200)
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};