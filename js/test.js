const testBtn = document.querySelector('.test__form-btn')

testBtn.addEventListener('click', () => {
  const form = document.getElementById('testForm');
  const result = document.getElementById('result');
  let score = 0;

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

  for (let [key, value] of formData.entries()) {
    if (answers.hasOwnProperty(key) && value === answers[key]) {
      score++;
    }
  }

  result.textContent = `Your score is: ${score}/7`; // Изменено количество вопросов на 7
});
