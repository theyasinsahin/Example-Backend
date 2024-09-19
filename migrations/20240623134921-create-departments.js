'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('departments', {
      departmentid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      departmentname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      facultyid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'faculties',
          key: 'facultyid'
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('departments');
  }
};
