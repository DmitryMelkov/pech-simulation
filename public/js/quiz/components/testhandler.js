
import { updateResultUI } from './resultUI.js';
import { hideLoadingIndicator, showLoadingIndicator } from './loadingIndicator.js';

export const handleSubmitTest = async (event) => {
  event.preventDefault();

  const form = document.getElementById('testForm');
  const loadingIndicator = document.getElementById('loadingIndicator');
  const formData = new FormData(form);
  const formObject = {};

  formData.forEach((value, key) => {
    if (formData.getAll(key).length > 1) {
      formObject[key] = formData.getAll(key);
    } else {
      formObject[key] = value;
    }
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
    const incorrectQuestionNumbers = incorrectAnswerNumbers.map((id) => {
      return window.questionOrderMap[id] || `ID ${id} не найден`;
    });

    document.querySelector('.mnemo__modal-quiz-incorrect-span').textContent = incorrectQuestionNumbers.join(', ');
    if (incorrectQuestionNumbers.length === 0) {
      document.querySelector('.mnemo__modal-quiz-incorrect').style.display = 'none';
    }

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
