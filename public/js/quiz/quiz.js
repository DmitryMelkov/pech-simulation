import { closeModal, setupModalCloseEvents } from './components/modals.js';
import { loadQuestions } from './components/questionRenderer.js';
import { handleSubmitTest } from './components/testHandler.js';
import { checkAllQuestionsAnswered, getUnansweredQuestions } from './components/formValidation.js';

document.addEventListener('DOMContentLoaded', async () => {
  await loadQuestions();

  const modalBackground = document.querySelector('.mnemo__modal-background');
  const modalContent = document.querySelector('.mnemo__modal-start');
  const closeButton = document.querySelector('.modal-results-close-js');

  // Настройка основного модального окна
  setupModalCloseEvents(closeButton, modalBackground, () => closeModal(modalBackground, modalContent, true));

  const testBtn = document.querySelector('.test__form-btn');
  testBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const form = document.getElementById('testForm');

    if (!checkAllQuestionsAnswered(form)) {
      // Если есть пропущенные вопросы, показываем модальное окно
      const unansweredQuestions = getUnansweredQuestions(form);

      // Открытие модального окна для неотвеченных вопросов
      const unansweredModalBackground = document.querySelector('.mnemo__modal-background-unanswered');
      const unansweredModalContent = document.querySelector('.mnemo__modal-start-unanswered');
      const unansweredSpan = document.querySelector('.mnemo__modal-quiz-unanswered-span');

      // Добавляем список пропущенных вопросов в модальное окно
      unansweredSpan.textContent = unansweredQuestions.join(', ');

      // Показываем модальное окно
      unansweredModalBackground.classList.add('enabled');
      unansweredModalContent.classList.add('enabled');

      // Настройка закрытия модального окна с неотвеченными вопросами
      const unansweredCloseButton = document.querySelector('.modal-unanswered-close-js');
      setupModalCloseEvents(unansweredCloseButton, unansweredModalBackground, () => closeModal(unansweredModalBackground, unansweredModalContent, false));

    } else {
      // Если все вопросы отвечены, отправляем тест
      handleSubmitTest(e);
    }
  });
});
