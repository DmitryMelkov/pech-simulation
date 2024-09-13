import { checkAllQuestionsAnswered, getUnansweredQuestions } from './components/formValidation.js';
import { hideLoadingIndicator, showLoadingIndicator } from './components/loadingIndicator.js';
import { closeModal, setupModalCloseEvents } from './components/modals.js';
import { updateResultUI } from './components/resultUI.js';

// Функция для перемешивания массива (вопросов или ответов)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Функция для обновления номеров вопросов
function updateQuestionNumbers(questions) {
  questions.forEach((question, index) => {
    const questionNumberElement = question.querySelector('.test__question-descr');
    const currentText = questionNumberElement.textContent;
    const updatedText = currentText.replace(/^\d+\./, `${index + 1}.`); // Заменяем номер на новый
    questionNumberElement.textContent = updatedText;

    // Сохраняем оригинальный номер вопроса как data-атрибут
    question.setAttribute('data-original-number', index + 1);
  });
}

// Перемешиваем вопросы и ответы при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('testForm');
  const questions = Array.from(form.querySelectorAll('.test__question'));

  // Перемешиваем вопросы
  shuffleArray(questions);
  questions.forEach((question) => form.appendChild(question));

  // Обновляем номера вопросов
  updateQuestionNumbers(questions);

  // Перемешиваем варианты ответов для каждого вопроса
  questions.forEach((question) => {
    const options = Array.from(question.querySelectorAll('.options__item'));
    shuffleArray(options);
    const optionsContainer = question.querySelector('.options');
    options.forEach((option) => optionsContainer.appendChild(option));
  });
});

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

    // Получаем правильные номера для неотвеченных вопросов
    const unansweredQuestionNumbers = unansweredQuestions.map((questionId) => {
      const questionElement = form.querySelector(`[name="${questionId}"]`).closest('.test__question');
      return questionElement.getAttribute('data-original-number'); // Используем оригинальный номер
    });

    // Сортируем неотвеченные вопросы по их исходным номерам
    const sortedUnansweredQuestions = unansweredQuestionNumbers.sort((a, b) => a - b);

    // Отображаем отсортированные номера в модалке
    document.querySelector('.mnemo__modal-quiz-unanswered-span').textContent = sortedUnansweredQuestions.join(', ');
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
