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
      this.hasMany(models.OrderRelStatus, {
        foreignKey: 'user_id',    //campo da tabela estrangeira
        sourceKey: 'id',          // campo da tabela local
        as: 'user_ids'           // nome do campo de associação(plural)
      })
    }
  }
  User.init({
    id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    name:{ 
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email:{ 
      type: DataTypes.STRING(100),
      allowNull: false
    },
    verified_email:{
       type: DataTypes.BOOLEAN(),
       allowNull: false,
       default: false
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    password:{
      type: DataTypes.STRING(200),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    //Esconde o campo "password" no retrieve e no retrieveOne
    defaultScope: {
      attributes: {
        exclude: ['password']
      }
    },
    scopes: {
    //Inclui o campo "password" (necessário no login)
    withPassword: {
      attributes: {
        include: ['password']
      }
    }
  }
  });
  return User;
};