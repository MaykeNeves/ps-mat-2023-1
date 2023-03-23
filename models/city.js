'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Customer, {
        foreignKey: 'city_id',    //campo da tabela estrangeira
        sourceKey: 'id',          // campo da tabela local
        as: 'customers'           // nome do campo de associação(plural)
      })
    }
  }
  City.init({
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
    state: {
      allowNull: false,
      type: DataTypes.STRING(2)
    },
  }, {
    sequelize,
    modelName: 'City',
    tableName: 'cities'
  });
  return City;
};