'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.OrderRelStatus, {
        foreignKey: 'order_status_id',    //campo da tabela estrangeira
        sourceKey: 'id',          // campo da tabela local
        as: 'order_rel_statuses'           // nome do campo de associação(plural)
      })

    }
  }
  OrderStatus.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    sequence: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    description: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'OrderStatus',
    tableName: 'order_statuses'
  });
  return OrderStatus;
};