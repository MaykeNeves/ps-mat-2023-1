'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('customer_tags', {
      fields: ['customer_id'],
      type: 'foreign key',
      name: 'customer_tags_customers_fk', //nome chave estrangeira(deve ser unico do BD)
      references: {
        table: 'customers',  //tabela estrangeira
        field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    //Não deixa apagar uma customer em uso no customer
      onUpdate: 'CASCADE'      //Atualiza customer_id em customer se id em customer mudar
    })

    await queryInterface.addConstraint('customer_tags', {
      fields: ['customer_id'],
      type: 'foreign key',
      name: 'customer_tags_tags_fk', //nome chave estrangeira(deve ser unico do BD)
      references: {
        table: 'tags',  //tabela estrangeira
        field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    //Não deixa apagar uma tag em uso no customer_tags
      onUpdate: 'CASCADE'      //Atualiza tag_id em customer_tags se id em tags mudar
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('customer_tags', 'customer_tags_tags_fk')
    await queryInterface.removeConstraint('customer_tags', 'customer_tags_customers_fk')

  }
};
