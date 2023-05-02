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

      this.belongsTo(models.Customer, {
        foreignKey: 'customer_id',    //Nome do campo na tabela de ORIGEM
        targetKey: 'id',          //Nome do campo na tabela de Destino
        as: 'customer'                //Nome do atributo para exibição
      })

      this.belongsTo(models.Channel, {
        foreignKey: 'channel_id',    //Nome do campo na tabela de ORIGEM
        targetKey: 'id',          //Nome do campo na tabela de Destino
        as: 'channel'                //Nome do atributo para exibição
      })

      this.belongsTo(models.Carrier, {
        foreignKey: 'carrier_id',    //Nome do campo na tabela de ORIGEM
        targetKey: 'id',          //Nome do campo na tabela de Destino
        as: 'carrier'                //Nome do atributo para exibição
      })

      this.belongsTo(models.ShipmentPriority, {
        foreignKey: 'shipment_priority_id',    //Nome do campo na tabela de ORIGEM
        targetKey: 'id',          //Nome do campo na tabela de Destino
        as: 'shipment_priority'                //Nome do atributo para exibição
      })

      this.belongsTo(models.PaymentMethod, {
        foreignKey: 'payment_method_id',    //Nome do campo na tabela de ORIGEM
        targetKey: 'id',          //Nome do campo na tabela de Destino
        as: 'orders'                //Nome do atributo para exibição
      })

      this.belongsToMany(models.OrderRelStatus, {
        through: 'order_rel_statuses' , //tabela intermediaria
        foreignKey: 'order_id',  //chave estrangeira da tabela intermediária
        otherKey: 'order_status_id', // OUtra chave da tabela intermediaria
        otherKey: 'user_id',
        as: 'order_rel_status'    // Nome do campo de associação (plural)

      })

      this.belongsToMany(models.OrderTag, {
        through: 'order_tags' , //tabela intermediaria
        foreignKey: 'order_id',  //chave estrangeira da tabela intermediária
        otherKey: 'tag_id', // OUtra chave da tabela intermediaria
        
        as: 'order_rel_statuses'    // Nome do campo de associação (plural)

      })

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