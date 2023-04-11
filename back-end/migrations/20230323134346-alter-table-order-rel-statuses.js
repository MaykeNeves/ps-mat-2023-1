'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('order_rel_statuses', {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'order_rel_statuses_fk', //nome chave estrangeira(deve ser unico do BD)
      references: {
        table: 'orders',  //tabela estrangeira
        field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    //Não deixa apagar uma customer em uso no customer
      onUpdate: 'CASCADE'      //Atualiza customer_id em customer se id em customer mudar
    })


    await queryInterface.addConstraint('order_rel_statuses', {
      fields: ['order_status_id'],
      type: 'foreign key',
      name: 'order_status_id_fk', //nome chave estrangeira(deve ser unico do BD)
      references: {
        table: 'order_statuses',  //tabela estrangeira
        field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    //Não deixa apagar uma customer em uso no customer
      onUpdate: 'CASCADE'      //Atualiza customer_id em customer se id em customer mudar
    })

    await queryInterface.addConstraint('order_rel_statuses', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'user_id_fk', //nome chave estrangeira(deve ser unico do BD)
      references: {
        table: 'users',  //tabela estrangeira
        field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    //Não deixa apagar uma customer em uso no customer
      onUpdate: 'CASCADE'      //Atualiza customer_id em customer se id em customer mudar
    })


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('order_rel_statuses', 'order_rel_statuses_fk')
    await queryInterface.removeConstraint('order_rel_statuses', 'order_status_id_fk')
    await queryInterface.removeConstraint('order_rel_statuses', 'user_id_fk')

  }
};
