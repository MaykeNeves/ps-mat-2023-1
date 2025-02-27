'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     
      name: {
        type: Sequelize.STRING(100)
      },
      email: {
        type: Sequelize.STRING(100)
      },
      verified_email: {
        type: Sequelize.BOOLEAN
      },
      is_admin: {
        type: Sequelize.BOOLEAN
      },
      phone: {
        type: Sequelize.STRING(20)
      },
      password: {
        type: Sequelize.STRING(200)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};