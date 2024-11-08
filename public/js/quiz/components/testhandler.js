import { updateResultUI } from './resultUI.js';
import { hideLoadingIndicator, showLoadingIndicator } from './loadingIndicator.js';

export const handleSubmitTest = async (event) => {
  event.preventDefault();

  const form = document.getElementById('testForm');
  const loadingIndicator = document.getElementById('loadingIndicator');
  const formData = new FormData(form);
  const formObject = {};

  formData.forEach((value, key) => {
    formObject[key] = formData.getAll(key).length > 1 ? formData.getAll(key) : value;
  });

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
    const incorrectQuestionNumbers = incorrectAnswerNumbers.map((id) => window.questionOrderMap[id] || `ID ${id} не найден`);

    // Отображаем или скрываем кнопку "Посмотреть неправильные вопросы" в зависимости от наличия неправильных ответов
    const viewIncorrectBtn = document.querySelector('.view-incorrect-questions-btn');
    if (incorrectAnswerNumbers.length > 0) {
      viewIncorrectBtn.style.display = 'block';
      viewIncorrectBtn.dataset.incorrectAnswers = JSON.stringify(incorrectAnswerNumbers);
    } else {
      viewIncorrectBtn.style.display = 'none';
    }

    // Логика отображения кнопок в зависимости от результата
    const goodResultBtn = document.querySelector('.good-result-btn');
    const badResultBtn = document.querySelector('.bad-result-btn');
    
    const passingScore = 0.8 * totalQuestions; // пример порога, настраиваем по вашему условию

    if (score >= passingScore) {
      goodResultBtn.style.display = 'block';
      badResultBtn.style.display = 'none';
    } else {
      goodResultBtn.style.display = 'none';
      badResultBtn.style.display = 'block';
    }

    // Обновляем текст модального окна
    document.querySelector('.mnemo__modal-quiz-incorrect-span').textContent = incorrectQuestionNumbers.join(', ');
    if (incorrectQuestionNumbers.length === 0) {
      document.querySelector('.mnemo__modal-quiz-incorrect').style.display = 'none';
    }

    // Обновление UI результатов
    updateResultUI(resultMessage, score, totalQuestions);

    setTimeout(() => {
      const modalBackground = document.querySelector('.mnemo__modal-background');
      const modalContent = document.querySelector('.mnemo__modal-start');
      modalBackground.classList.add('enabled');
      modalContent.classList.add('enabled');
    }, 1000);
  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    hideLoadingIndicator(loadingIndicator);
  }
};
