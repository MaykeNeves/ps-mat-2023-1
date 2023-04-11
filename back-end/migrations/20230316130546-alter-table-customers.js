'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Criaa chave estrangeira da tabela customers para a tabela cities
    await queryInterface.addConstraint('customers', {
      fields: ['city_id'],
      type: 'foreign key',
      name: 'customers_cities_fk', //nome chave estrangeira(deve ser unico do BD)
      references: {
        table: 'cities',  //tabela estrangeira
        field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    //Não deixa apagar uma city em uso no customer
      onUpdate: 'CASCADE'      //Atualiza city_id em customer se id em city mudar
    })
  },

  async down (queryInterface, Sequelize) {
    //rever as alterações do up()
    await queryInterface.removeConstraint('customers', 'customers_cities_fk')
  }
};
