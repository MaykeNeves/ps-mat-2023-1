'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderRelStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Order, {
        foreignKey: 'order_id',    //Nome do campo na tabela de ORIGEM
        targetKey: 'id',          //Nome do campo na tabela de Destino
        as: 'order'                //Nome do atributo para exibição
      })

      this.belongsTo(models.OrderStatus, {
        foreignKey: 'order_status_id',    //Nome do campo na tabela de ORIGEM
        targetKey: 'id',          //Nome do campo na tabela de Destino
        as: 'order_status'                //Nome do atributo para exibição
      })

      this.belongsTo(models.User, {
        foreignKey: 'user_id',    //Nome do campo na tabela de ORIGEM
        targetKey: 'id',          //Nome do campo na tabela de Destino
        as: 'user'                //Nome do atributo para exibição
      })


    }
  }
  OrderRelStatus.init({
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
    order_status_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'OrderRelStatus',
    tableName: 'order_rel_statuses'
  });
  return OrderRelStatus;
};