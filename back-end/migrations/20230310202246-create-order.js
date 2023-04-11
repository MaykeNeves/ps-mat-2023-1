'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      external_code: {
        type: Sequelize.STRING(20)
      },
      theme: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      remarks: {
        type: Sequelize.TEXT
      },
      pic_url: {
        type: Sequelize.STRING(200)
      },
      custom_name: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      custom_age: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      order_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      event_date: {
        type: Sequelize.DATE
      },
      artwork_date: {
        type: Sequelize.DATE
      },
      shipment_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      total_amount: {
        type: Sequelize.DECIMAL(18,2)
      },
      customer_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      channel_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      carrier_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      shipment_priority_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      payment_method_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};