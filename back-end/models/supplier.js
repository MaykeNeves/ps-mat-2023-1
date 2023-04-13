'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, {
        foreignKey: 'id',    //Nome do campo na tabela de ORIGEM
        targetKey: 'id',          //Nome do campo na tabela de Destino
        as: 'products'                //Nome do atributo para exibição
      })
    }
  }
  Supplier.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    address: {
      type: DataTypes.TEXT
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING(20)
    }
  }, {
    sequelize,
    modelName: 'Supplier',
    tableName: 'suppliers'
  });
  return Supplier;
};