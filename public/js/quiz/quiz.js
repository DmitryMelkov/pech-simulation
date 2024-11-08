import { closeModal, setupModalCloseEvents } from './components/modals.js';
import { loadQuestions } from './components/questionRenderer.js';
import { handleSubmitTest } from './components/testhandler.js';
import { checkAllQuestionsAnswered, getUnansweredQuestions } from './components/formValidation.js';

document.addEventListener('DOMContentLoaded', async () => {
  await loadQuestions();

  const modalBackground = document.querySelector('.mnemo__modal-background');
  const modalContent = document.querySelector('.mnemo__modal-start');
  const closeButton = document.querySelector('.modal-results-close-js');

  setupModalCloseEvents(closeButton, modalBackground, () => closeModal(modalBackground, modalContent, true));

  const testBtn = document.querySelector('.test__form-btn');
  testBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const form = document.getElementById('testForm');

    if (!checkAllQuestionsAnswered(form)) {
      const unansweredQuestions = getUnansweredQuestions(form);

      const unansweredModalBackground = document.querySelector('.mnemo__modal-background-unanswered');
      const unansweredModalContent = document.querySelector('.mnemo__modal-start-unanswered');
      const unansweredSpan = document.querySelector('.mnemo__modal-quiz-unanswered-span');

      unansweredSpan.textContent = unansweredQuestions.join(', ');
      unansweredModalBackground.classList.add('enabled');
      unansweredModalContent.classList.add('enabled');

      const unansweredCloseButton = document.querySelector('.modal-unanswered-close-js');
      setupModalCloseEvents(unansweredCloseButton, unansweredModalBackground, () => closeModal(unansweredModalBackground, unansweredModalContent, false));
    } else {
      handleSubmitTest(e);
    }
  });

  document.querySelector('.view-incorrect-questions-btn').addEventListener('click', () => {
    closeModal(modalBackground, modalContent, false);

    const viewIncorrectBtn = document.querySelector('.view-incorrect-questions-btn');
    const incorrectAnswerNumbers = JSON.parse(viewIncorrectBtn.dataset.incorrectAnswers || '[]');
    incorrectAnswerNumbers.forEach((id) => {
      const questionElement = document.querySelector(`[data-question-id="${id}"]`);
      if (questionElement) {
        questionElement.classList.add('incorrect-question');
      }
    });

    const firstIncorrectQuestion = document.querySelector('.incorrect-question');
    if (firstIncorrectQuestion) {
      firstIncorrectQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const finishButton = document.querySelector('.test__form-btn');
    finishButton.textContent = 'Пройти тест заново';
    finishButton.classList.add('retake-test-btn');
    finishButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => location.reload(), 500);
    });

    // Отключение чекбоксов и добавление класса для удаления ховера
    document.querySelectorAll('.test__question input[type="checkbox"]').forEach((checkbox) => {
      checkbox.disabled = true;
      checkbox.classList.add('no-hover');
    });

    // Добавляем плавающую кнопку при просмотре неправильных ответов
    const originalButtonPosition = finishButton.offsetTop;
    window.addEventListener('scroll', () => {
      if (window.scrollY + window.innerHeight < originalButtonPosition) {
        finishButton.classList.add('fixed-bottom');
      } else {
        finishButton.classList.remove('fixed-bottom');
      }
    });
  });
});
