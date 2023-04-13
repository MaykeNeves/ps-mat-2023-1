'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('products', {
      fields: ['supplier_id'],
      type: 'foreign key',
      name: 'supplier_product_fk', //nome chave estrangeira(deve ser unico do BD)
      references: {
        table: 'suppliers',  //tabela estrangeira
        field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    //Não deixa apagar uma customer em uso no customer
      onUpdate: 'CASCADE'      //Atualiza customer_id em customer se id em customer mudar
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('products', 'supplier_product_fk')
  }
};
