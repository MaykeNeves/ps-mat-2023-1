'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    external_code: {
      type: DataTypes.STRING(20)
    },
    theme: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    remarks: {
      type: DataTypes.TEXT
    },
    pic_url: {
      type: DataTypes.STRING(200)
    },
    custom_name: {
      allowNull: false,
      type: DataTypes.STRING(30)
    },
    custom_age: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    order_date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    event_date: {
      type: DataTypes.DATE
    },
    artwork_date: {
      type: DataTypes.DATE
    },
    shipment_date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    total_amount: {
      type: DataTypes.DECIMAL(18,2)
    },
    customer_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    channel_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    carrier_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    shipment_priority_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    payment_method_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders'
  });
  return Order;
};