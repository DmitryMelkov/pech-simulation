import express from 'express';

const router = express.Router();

router.post('/submit-test', (req, res) => {
  const formData = req.body;
  console.log('Полученные данные:', formData);

  const totalQuestions = 7;
  const thresholds = {
    excellent: Math.floor(totalQuestions * 0.9),  // 90% от totalQuestions
    good: Math.floor(totalQuestions * 0.8),      // 80% от totalQuestions
    satisfactory: Math.floor(totalQuestions * 0.7) // 70% от totalQuestions
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

  let score = 0;
  let incorrectAnswerNumbers = [];

  for (const [key, value] of Object.entries(answers)) {
    if (formData[key] === value) {
      score++;
    } else {
      incorrectAnswerNumbers.push(key.split('question')[1]);
    }
  }

  let resultMessage = '';
  if (score === totalQuestions) {
    resultMessage = 'Отлично';
  } else if (score >= thresholds.excellent) {
    resultMessage = 'Отлично';
  } else if (score >= thresholds.good) {
    resultMessage = 'Хорошо';
  } else if (score >= thresholds.satisfactory) {
    resultMessage = 'Удовлетворительно';
  } else {
    resultMessage = 'Неудовлетворительно';
  }

  const response = { score, totalQuestions, resultMessage, incorrectAnswerNumbers };
  console.log('Ответ сервера:', response);

  res.json(response);
});

export default router;
