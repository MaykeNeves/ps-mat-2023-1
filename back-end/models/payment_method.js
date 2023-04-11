'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Order, {
        foreignKey: 'payment_method_id',    //campo da tabela estrangeira
        sourceKey: 'id',          // campo da tabela local
        as: 'payment_methods'           // nome do campo de associação(plural)
      })
    }
  }
  PaymentMethod.init({
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
    operator_fee: {
      allowNull: false,
      type: DataTypes.DECIMAL(18,2)
    },
  }, {
    sequelize,
    modelName: 'PaymentMethod',
    tableName: 'payment_methods'
  });
  return PaymentMethod;
};