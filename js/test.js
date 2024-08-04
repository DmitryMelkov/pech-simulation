const testBtn = document.querySelector('.test__form-btn');
const modalBackground = document.querySelector('.mnemo__modal-background');
const modalContent = document.querySelector('.mnemo__modal-start');
const closeButton = document.querySelector('.mnemo__modal-close');
const smileImage = document.getElementById('smileImage');

const  checkAllQuestionsAnswered = (formData) => {
  const answeredQuestions = [...formData.keys()].map(key => key.split('question')[1]);
  const allQuestions = ['1', '2', '3', '4', '5', '6', '7'];

  return allQuestions.every(question => answeredQuestions.includes(question));
}

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
    alert('Пожалуйста, ответьте на все вопросы!');
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



  result.textContent = `${score}/${totalQuestions}`;

  const message = document.querySelector('.mnemo__modal-quiz');
  if (score >= thresholds.excellent) {
    message.innerHTML = 'Вы справились <span class="excellent">отлично</span>, правильных ответов:';
    result.innerHTML = `<span class="otlichno">${score}</span> из ${totalQuestions}`;
    smileImage.src = 'img/excellent.svg';
  } else if (score >= thresholds.good) {
    message.innerHTML = 'Вы справились <span class="good">хорошо</span>, правильных ответов:';
    result.innerHTML = `<span class="horosho">${score}</span> из ${totalQuestions}`;
    smileImage.src = 'img/good.svg';
  } else if (score >= thresholds.satisfactory) {
    message.innerHTML = 'Вы справились <span class="satisfactorily">удовлетворительно</span>, правильных ответов:';
    result.innerHTML = `<span class="udovletvoritelno">${score}</span> из ${totalQuestions}`;
    smileImage.src = 'img/satisfactorily.svg';
  } else {
    message.innerHTML = 'Попробуйте еще раз, правильных ответов:';
    result.textContent = `${score} из ${totalQuestions}`;
    smileImage.src = 'img/not-satisfactoriry.svg';
  }

  modalBackground.classList.add('enabled');
  modalContent.classList.add('enabled');
});

closeButton.addEventListener('click', () => {
  modalBackground.classList.remove('enabled');
  modalContent.classList.remove('enabled');
});

modalBackground.addEventListener('click', (event) => {
  if (event.target === modalBackground) {
    modalBackground.classList.remove('enabled');
    modalContent.classList.remove('enabled');
  }
});
