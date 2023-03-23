'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Customer, {
        foreignKey: 'customer_id',    //Nome do campo na tabela de ORIGEM
        targetKey: 'id',          //Nome do campo na tabela de Destino
        as: 'customer'                //Nome do atributo para exibição
      })

      this.belongsTo(models.Tag, {
        foreignKey: 'tag_id',    //Nome do campo na tabela de ORIGEM
        targetKey: 'id',          //Nome do campo na tabela de Destino
        as: 'tag'                //Nome do atributo para exibição
      })

    }
  }
  CustomerTag.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    customer_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    tag_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'CustomerTag',
    tableName: 'customer_tags'
  });
  return CustomerTag;
};