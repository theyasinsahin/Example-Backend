'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('faculties', {
      facultyid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      facultyname: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('faculties');

  }
};
