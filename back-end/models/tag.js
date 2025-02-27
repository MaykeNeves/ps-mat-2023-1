'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // this.hasMany(models.CustomerTag, {
      //   foreignKey: 'tag_id',    //campo da tabela estrangeira
      //   sourceKey: 'id',          // campo da tabela local
      //   as: 'customers'           // nome do campo de associação(plural)
      // })

      this.belongsToMany(models.Customer, {
        through: 'customer_tags' , //tabela intermediaria
        foreignKey: 'tag_id',  //chave estrangeira da tabela intermediária
        otherKey: 'customer_id', // OUtra chave da tabela intermediaria
        as: 'customers'    // Nome do campo de associação (plural)

      })

    }
  }
  Tag.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING(30)
    },
    color: {
      type: DataTypes.STRING(8)
    },
    type: {
      type: DataTypes.ENUM('C','O')
    },
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags'
  });
  return Tag;
};