const testBtn = document.querySelector('.test__form-btn');
const modalBackground = document.querySelector('.mnemo__modal-background');
const modalContent = document.querySelector('.mnemo__modal-start');
const modalBackgroundUnanswered = document.querySelector('.mnemo__modal-background-unanswered');
const modalContentUnanswered = document.querySelector('.mnemo__modal-start-unanswered');
const closeButton = document.querySelector('.modal-results-close-js');
const closeButtonUnanswered = document.querySelector('.modal-unanswered-close-js');
const smileImage = document.getElementById('smileImage');
const badResultBtn = document.querySelector('.bad-result-btn');
const goodResultBtn = document.querySelector('.good-result-btn');
const loadingIndicator = document.getElementById('loadingIndicator');

const checkAllQuestionsAnswered = (formData) => {
  const answeredQuestions = [...formData.keys()].map((key) => key.split('question')[1]);
  const allQuestions = ['1', '2', '3', '4', '5', '6', '7'];

  return allQuestions.every((question) => answeredQuestions.includes(question));
};

const getUnansweredQuestions = (formData) => {
  const answeredQuestions = [...formData.keys()].map((key) => key.split('question')[1]);
  const allQuestions = ['1', '2', '3', '4', '5', '6', '7'];

  return allQuestions.filter((question) => !answeredQuestions.includes(question));
};

testBtn.addEventListener('click', async () => {
  const form = document.getElementById('testForm');
  const result = document.getElementById('result');

  const formData = new FormData(form);
  console.log([...formData.keys()]);

  if (!checkAllQuestionsAnswered(formData)) {
    const unansweredQuestions = getUnansweredQuestions(formData);
    document.querySelector('.mnemo__modal-quiz-unanswered-span').textContent = unansweredQuestions.join(', ');
    modalBackgroundUnanswered.classList.add('enabled');
    modalContentUnanswered.classList.add('enabled');
    return;
  }

  const formObject = Object.fromEntries(formData);

  try {
    // Показать индикатор загрузки
    loadingIndicator.classList.add('active');

    const response = await fetch('/submit-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formObject)
    });

    const { score, totalQuestions, resultMessage, incorrectAnswerNumbers } = await response.json();

    document.querySelector('.mnemo__modal-quiz-incorrect-span').textContent = incorrectAnswerNumbers.join(', ');

    if (incorrectAnswerNumbers.length === 0) {
      document.querySelector('.mnemo__modal-quiz-incorrect').style.display = 'none';
    }

    result.textContent = `${score}/${totalQuestions}`;
    updateResultUI(resultMessage, score, totalQuestions, incorrectAnswerNumbers);

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
      loadingIndicator.classList.remove('active');
    }, 1000);
  }
});

const updateResultUI = (resultMessage, score, totalQuestions, incorrectAnswerNumbers) => {
  const message = document.querySelector('.mnemo__modal-quiz');
  const span = document.querySelector('.mnemo__modal-quiz-incorrect-span');

  switch (resultMessage) {
    case 'Отлично':
      message.innerHTML = 'Вы справились <span class="excellent">Отлично</span>, правильных ответов:';
      result.innerHTML = `${score} из ${totalQuestions}`;
      smileImage.src = 'img/excellent.svg';
      span.textContent = '';
      break;
    case 'Хорошо':
      message.innerHTML = 'Вы справились <span class="good">Хорошо</span>, правильных ответов:';
      result.innerHTML = `${score} из ${totalQuestions}`;
      smileImage.src = 'img/good.svg';
      break;
    case 'Удовлетворительно':
      message.innerHTML = 'Вы справились <span class="satisfactorily">Удовлетворительно</span>, правильных ответов:';
      result.innerHTML = `${score} из ${totalQuestions}`;
      smileImage.src = 'img/satisfactorily.svg';
      goodResultBtn.classList.add('enabled');
      break;
    default:
      message.innerHTML = 'Попробуйте еще раз, правильных ответов:';
      result.textContent = `${score} из ${totalQuestions}`;
      smileImage.src = 'img/not-satisfactorily.svg';
      badResultBtn.classList.add('enabled');
  }
};

const closeModal = () => {
  modalBackground.classList.remove('enabled');
  modalContent.classList.remove('enabled');
  location.reload();
};

const closeModalUnanswered = () => {
  modalBackgroundUnanswered.classList.remove('enabled');
  modalContentUnanswered.classList.remove('enabled');
};

closeButton.addEventListener('click', closeModal);
closeButtonUnanswered.addEventListener('click', closeModalUnanswered);
modalBackground.addEventListener('click', (event) => {
  if (event.target === modalBackground) {
    closeModal();
  }
});
modalBackgroundUnanswered.addEventListener('click', (event) => {
  if (event.target === modalBackgroundUnanswered) {
    closeModalUnanswered();
  }
});
