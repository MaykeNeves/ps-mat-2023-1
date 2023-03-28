'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addConstraint('orders', {
      fields: ['customer_id'],
      type: 'foreign key',
      name: 'order_customers_customers_fk', //nome chave estrangeira(deve ser unico do BD)
      references: {
        table: 'customers',  //tabela estrangeira
        field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    //Não deixa apagar uma customer em uso no customer
      onUpdate: 'CASCADE'      //Atualiza customer_id em customer se id em customer mudar
    })

    await queryInterface.addConstraint('orders', {
      fields: ['channel_id'],
      type: 'foreign key',
      name: 'order_channels_channels_fk', //nome chave estrangeira(deve ser unico do BD)
      references: {
        table: 'channels',  //tabela estrangeira
        field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    //Não deixa apagar uma customer em uso no customer
      onUpdate: 'CASCADE'      //Atualiza customer_id em customer se id em customer mudar
    })

    await queryInterface.addConstraint('orders', {
      fields: ['carrier_id'],
      type: 'foreign key',
      name: 'order_carriers_carriers_fk', //nome chave estrangeira(deve ser unico do BD)
      references: {
        table: 'carriers',  //tabela estrangeira
        field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    //Não deixa apagar uma customer em uso no customer
      onUpdate: 'CASCADE'      //Atualiza customer_id em customer se id em customer mudar
    })

    await queryInterface.addConstraint('orders', {
      fields: ['shipment_priority_id'],
      type: 'foreign key',
      name: 'order_shipment_priority_shipments_fk', //nome chave estrangeira(deve ser unico do BD)
      references: {
        table: 'shipment_priorities',  //tabela estrangeira
        field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    //Não deixa apagar uma customer em uso no customer
      onUpdate: 'CASCADE'      //Atualiza customer_id em customer se id em customer mudar
    })

    await queryInterface.addConstraint('orders', {
      fields: ['payment_method_id'],
      type: 'foreign key',
      name: 'order_payment_method_payments_fk', //nome chave estrangeira(deve ser unico do BD)
      references: {
        table: 'payment_methods',  //tabela estrangeira
        field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    //Não deixa apagar uma customer em uso no customer
      onUpdate: 'CASCADE'      //Atualiza customer_id em customer se id em customer mudar
    })


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('orders', 'order_customers_customers_fk')
    await queryInterface.removeConstraint('orders', 'order_channels_channels_fk')
    await queryInterface.removeConstraint('orders', 'order_carriers_carriers_fk')
    await queryInterface.removeConstraint('orders', 'order_shipment_priority_shipments_fk')
    await queryInterface.removeConstraint('orders', 'order_payment_method_payments_fk')
  }
};
