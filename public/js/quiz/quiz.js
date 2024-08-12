import { checkAllQuestionsAnswered, getUnansweredQuestions } from './components/formValidation.js';
import { hideLoadingIndicator, showLoadingIndicator } from './components/loadingIndicator.js';
import { closeModal, setupModalCloseEvents } from './components/modals.js';
import { updateResultUI } from './components/resultUI.js';

const testBtn = document.querySelector('.test__form-btn');
const modalBackground = document.querySelector('.mnemo__modal-background');
const modalContent = document.querySelector('.mnemo__modal-start');
const modalBackgroundUnanswered = document.querySelector('.mnemo__modal-background-unanswered');
const modalContentUnanswered = document.querySelector('.mnemo__modal-start-unanswered');
const closeButton = document.querySelector('.modal-results-close-js');
const closeButtonUnanswered = document.querySelector('.modal-unanswered-close-js');
const loadingIndicator = document.getElementById('loadingIndicator');

testBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const form = document.getElementById('testForm');
  const result = document.getElementById('result');

  const formData = new FormData(form);

  // Проверяем, все ли вопросы отвечены
  if (!checkAllQuestionsAnswered(formData)) {
    const unansweredQuestions = getUnansweredQuestions(formData);
    document.querySelector('.mnemo__modal-quiz-unanswered-span').textContent = unansweredQuestions.join(', ');
    modalBackgroundUnanswered.classList.add('enabled');
    modalContentUnanswered.classList.add('enabled');
    return;
  }

  // Преобразуем FormData в объект
  const formObject = Object.fromEntries(formData);

  // Собираем все выбранные значения для вопроса с несколькими чекбоксами
  const selectedValues = formData.getAll('question8');
  formObject.question8 = selectedValues; // Добавляем массив значений для question8 в объект

  try {
    // Показать индикатор загрузки
    showLoadingIndicator(loadingIndicator);

    const response = await fetch('/submit-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formObject),
    });

    const { score, totalQuestions, resultMessage, incorrectAnswerNumbers } = await response.json();

    document.querySelector('.mnemo__modal-quiz-incorrect-span').textContent = incorrectAnswerNumbers.join(', ');

    if (incorrectAnswerNumbers.length === 0) {
      document.querySelector('.mnemo__modal-quiz-incorrect').style.display = 'none';
    }

    result.textContent = `${score}/${totalQuestions}`;
    updateResultUI(resultMessage, score, totalQuestions);

    // Добавить задержку перед открытием модального окна с результатами
    setTimeout(() => {
      modalBackground.classList.add('enabled');
      modalContent.classList.add('enabled');
    }, 1000);
  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    // Скрыть индикатор загрузки после небольшой задержки
    setTimeout(() => {
      hideLoadingIndicator(loadingIndicator);
    }, 1000);
  }
});

setupModalCloseEvents(closeButton, modalBackground, () => closeModal(modalBackground, modalContent, true)); // Перезагрузка после закрытия
setupModalCloseEvents(closeButtonUnanswered, modalBackgroundUnanswered, () =>
  closeModal(modalBackgroundUnanswered, modalContentUnanswered, false) // Не перезагружать страницу при закрытии модалки для неотвеченных вопросов
);
