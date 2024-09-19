'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      studentid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      studentmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      faculty: {
        type: Sequelize.STRING,
        allowNull: false
      },
      department: {
        type: Sequelize.STRING,
        allowNull: false
      },
      totalscore: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      negativeEmotionsScore: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      perceivedBarriersScore: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('students');
  }
};
