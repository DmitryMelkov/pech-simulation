export const updateResultUI = (resultMessage, score, totalQuestions) => {
  const message = document.querySelector('.mnemo__modal-quiz');
  const span = document.querySelector('.mnemo__modal-quiz-incorrect-span');
  const smileImage = document.getElementById('smileImage');
  const badResultBtn = document.querySelector('.bad-result-btn');
  const goodResultBtn = document.querySelector('.good-result-btn');

  switch (resultMessage) {
    case 'Отлично':
      message.innerHTML = 'Вы справились <span class="excellent">Отлично</span>, правильных ответов:';
      result.innerHTML = `${score} из ${totalQuestions}`;
      smileImage.src = 'img/excellent.svg';
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
