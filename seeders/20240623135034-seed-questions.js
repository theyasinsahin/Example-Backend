'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('questions', [
      {
        questionid: 1,
        question: 'Kariyer seçimi ile ilgili olarak sıklıkla mutsuz ve depresif hissederim.'
      },
      {
        questionid: 2,
        question: 'Mümkün olan en kısa sürede kariyer kararı vermem gerektiğini düşünüyorum fakat bunu yapamamak beni endişelendirir.'
      },
      {
        questionid: 3,
        question: 'Tatmin edici bir kariyer seçmekle ilgili stres ve baskı hissederim.'
      },
      {
        questionid: 4,
        question: 'Kariyer seçiminde yaptığım ve yapmadığım şeyler için sıklıkla kendimi suçlarım.'
      },
      {
        questionid: 5,
        question: 'Herhangi bir kariyer probleminin üstünü kapatma ve yokmuş gibi davranma eğilimindeyim.'
      },
      {
        questionid: 6,
        question: 'Sıklıkla yaşamımın bir amacı olmadığını hissederim.'
      },
      {
        questionid: 7,
        question: 'Sıklıkla kariyer seçiminde yaşadığım problemlerin ortadan kaybolmasını umut ederim.'
      },
      {
        questionid: 8,
        question: 'İlk tercih ettiğim kariyeri devam ettirmemi sağlayacak özel yeteneklere sahip değilim.'
      },
      {
        questionid: 9,
        question: 'Önemli biri benim kariyer seçimimi onaylamazsa bu beni kariyer arayışından alıkoyar.'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('questions', null, {});

  }
};
