'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carrier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Order, {
        foreignKey: 'carrier_id',    //campo da tabela estrangeira
        sourceKey: 'id',          // campo da tabela local
        as: 'carriers'           // nome do campo de associação(plural)
      })
    }
  }
  Carrier.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(30)
    },
  },{
    sequelize,
    modelName: 'Carrier',
    tableName: 'carriers'
  });
  return Carrier;
};