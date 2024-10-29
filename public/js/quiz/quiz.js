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
const form = document.getElementById('testForm');
const result = document.getElementById('result');

// Загружаем и отображаем вопросы при загрузке страницы
// Загружаем и отображаем вопросы при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/get-questions');
    const questions = await response.json();

    // Очищаем форму перед добавлением вопросов
    form.innerHTML = '';

    // Сопоставление question.id с порядковым номером
    const questionOrderMap = {};

    // Создаем HTML для каждого вопроса и добавляем в форму
    questions.forEach((question, index) => {
      questionOrderMap[question.id] = index + 1; // Сохраняем порядковый номер для question.id

      const questionHtml = `
        <div class="test__question">
          <p class="test__question-descr descr-reset">${index + 1}. ${question.question}</p>
          <div class="options">
            ${question.options
              .map(
                (option, i) => `
                  <div class="options__item">
                    <input class="options__input" type="${Array.isArray(question.answer) ? 'checkbox' : 'radio'}"
                           id="q${question.uniqueId}${i}" name="${question.uniqueId}" value="${option}">
                    <label class="options__label test__question-label" for="q${question.uniqueId}${i}">
                      <span class="test__question-span">${option}</span>
                    </label>
                  </div>
                `
              )
              .join('')}
          </div>
        </div>
      `;
      form.insertAdjacentHTML('beforeend', questionHtml);
    });

    // Сохраняем карту для дальнейшего использования при обработке неверных ответов
    window.questionOrderMap = questionOrderMap;
  } catch (error) {
    console.error('Ошибка при загрузке вопросов:', error);
  }
});


// Обработчик кнопки "Завершить тестирование"
testBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const formObject = {};

  formData.forEach((value, key) => {
    if (formData.getAll(key).length > 1) {
      formObject[key] = formData.getAll(key); // Сохраняем все выбранные значения
    } else {
      formObject[key] = value; // Обычный одиночный выбор
    }
  });

  console.log('Отправляемый объект formObject:', formObject);

  try {
    showLoadingIndicator(loadingIndicator);

    const response = await fetch('/submit-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formObject),
    });

    const { score, totalQuestions, resultMessage, incorrectAnswerNumbers } = await response.json();

    // Определяем номера вопросов с неверными ответами, используя questionOrderMap
    const incorrectQuestionNumbers = incorrectAnswerNumbers.map((id) => {
      return window.questionOrderMap[id] || `ID ${id} не найден`;
    });

    // Отображаем номера вопросов с неверными ответами
    document.querySelector('.mnemo__modal-quiz-incorrect-span').textContent = incorrectQuestionNumbers.join(', ');

    if (incorrectQuestionNumbers.length === 0) {
      document.querySelector('.mnemo__modal-quiz-incorrect').style.display = 'none';
    }

    result.textContent = `${score}/${totalQuestions}`;
    updateResultUI(resultMessage, score, totalQuestions);

    setTimeout(() => {
      modalBackground.classList.add('enabled');
      modalContent.classList.add('enabled');
    }, 1000);
  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    setTimeout(() => {
      hideLoadingIndicator(loadingIndicator);
    }, 1000);
  }
});


// Настройка событий для закрытия модальных окон
setupModalCloseEvents(closeButton, modalBackground, () => closeModal(modalBackground, modalContent, true));
setupModalCloseEvents(closeButtonUnanswered, modalBackgroundUnanswered, () =>
  closeModal(modalBackgroundUnanswered, modalContentUnanswered, false)
);
