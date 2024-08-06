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

testBtn.addEventListener('click', () => {
  const form = document.getElementById('testForm');
  const result = document.getElementById('result');
  const totalQuestions = 7;
  const thresholds = {
    excellent: totalQuestions * 0.9,
    good: totalQuestions * 0.8,
    satisfactory: totalQuestions * 0.7,
  };

  const answers = {
    question1: 'Уволиться',
    question2: '4',
    question3: 'Сова',
    question4: 'Синий',
    question5: '3 + 3 = 6',
    question6: 'Лев Толстой',
    question7: 'Париж',
  };

  const formData = new FormData(form);
  let score = 0;
  let incorrectAnswerNumbers = [];

  if (!checkAllQuestionsAnswered(formData)) {
    const unansweredQuestions = getUnansweredQuestions(formData);
    const unansweredSpan = document.querySelector('.mnemo__modal-quiz-unanswered-span');
    unansweredSpan.textContent = unansweredQuestions.join(', ');
    modalBackgroundUnanswered.classList.add('enabled');
    modalContentUnanswered.classList.add('enabled');
    return;
  }

  for (let [key, value] of formData.entries()) {
    if (answers[key] && value === answers[key]) {
      score++;
    } else {
      incorrectAnswerNumbers.push(key.split('question')[1]);
    }
  }

  // Вставляем номера неправильных вопросов внутрь тега <span>
  const span = document.querySelector('.mnemo__modal-quiz-incorrect-span');
  span.textContent = incorrectAnswerNumbers.join(', ');

  if (incorrectAnswerNumbers.length === 0) {
    const incorrectAnswersBlock = document.querySelector('.mnemo__modal-quiz-incorrect');
    incorrectAnswersBlock.style.display = 'none';
  }

  result.textContent = `${score}/${totalQuestions}`;

  const message = document.querySelector('.mnemo__modal-quiz');
  if (score === totalQuestions) {
    // Если все ответы правильные
    message.innerHTML = 'Вы справились <span class="excellent">Отлично</span>, правильных ответов:';
    result.innerHTML = `<span class="otlichno">${score}</span> из ${totalQuestions}`;
    smileImage.src = 'img/excellent.svg';
    const span = document.querySelector('.mnemo__modal-quiz-incorrect-span');
    span.textContent = ''; // Очищаем содержимое span с неправильными ответами
  } else if (score >= thresholds.excellent) {
    message.innerHTML = 'Вы справились <span class="excellent">Отлично</span>, правильных ответов:';
    result.innerHTML = `<span class="otlichno">${score}</span> из ${totalQuestions}`;
    smileImage.src = 'img/excellent.svg';
  } else if (score >= thresholds.good) {
    message.innerHTML = 'Вы справились <span class="good">Хорошо</span>, правильных ответов:';
    result.innerHTML = `<span class="horosho">${score}</span> из ${totalQuestions}`;
    smileImage.src = 'img/good.svg';
    goodResultBtn.classList.add('enabled');
  } else if (score >= thresholds.satisfactory) {
    message.innerHTML = 'Вы справились <span class="satisfactorily">Удовлетворительно</span>, правильных ответов:';
    result.innerHTML = `<span class="udovletvoritelno">${score}</span> из ${totalQuestions}`;
    smileImage.src = 'img/satisfactorily.svg';
    goodResultBtn.classList.add('enabled');
  } else {
    message.innerHTML = 'Попробуйте еще раз, правильных ответов:';
    result.textContent = `${score} из ${totalQuestions}`;
    smileImage.src = 'img/not-satisfactoriry.svg';
    badResultBtn.classList.add('enabled');
  }

  modalBackground.classList.add('enabled');
  modalContent.classList.add('enabled');
});

// Закрытие модального окна по нажатию на крестик
closeButton.addEventListener('click', () => {
  closeModal();
  location.reload(); // Обновление страницы
});

closeButtonUnanswered.addEventListener('click', () => {
  closeModalUnanswered();
});

// Закрытие модального окна по клику вне окна
modalBackground.addEventListener('click', (event) => {
  if (event.target === modalBackground) {
    closeModal();
    location.reload(); // Обновление страницы
  }
});

modalBackgroundUnanswered.addEventListener('click', (event) => {
  if (event.target === modalBackgroundUnanswered) {
    closeModalUnanswered();
  }
});

const closeModal = () => {
  modalBackground.classList.remove('enabled');
  modalContent.classList.remove('enabled');
};

const closeModalUnanswered = () => {
  modalBackgroundUnanswered.classList.remove('enabled');
  modalContentUnanswered.classList.remove('enabled');
};
