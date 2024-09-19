'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('questions', {
      questionid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      question: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('questions');

  }
};
