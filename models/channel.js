'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Channel.init({
    id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    commission_fee: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Channel',
  });
  return Channel;
};