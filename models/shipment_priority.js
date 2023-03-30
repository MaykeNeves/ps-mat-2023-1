'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShipmentPriority extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Order, {
        foreignKey: 'shipment_priority_id',    //campo da tabela estrangeira
        sourceKey: 'id',          // campo da tabela local
        as: 'shipment_priorities'           // nome do campo de associação(plural)
      })
    }
  }
  ShipmentPriority.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(30)
    },
  },{
    sequelize,
    modelName: 'ShipmentPriority',
    tableName: 'shipment_priorities'
  });
  return ShipmentPriority;
};