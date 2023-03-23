'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Tag, {
        foreignKey: 'order_id',    //Nome do campo na tabela de ORIGEM
        targetKey: 'id',          //Nome do campo na tabela de Destino
        as: 'tag'                //Nome do atributo para exibição
      })

      this.belongsTo(models.Order, {
        foreignKey: 'tag_id',    //Nome do campo na tabela de ORIGEM
        targetKey: 'id',          //Nome do campo na tabela de Destino
        as: 'order'                //Nome do atributo para exibição
      })


    }
  }
  OrderTag.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    order_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    tag_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'OrderTag',
    tableName: 'order_tags'
  });
  return OrderTag;
};