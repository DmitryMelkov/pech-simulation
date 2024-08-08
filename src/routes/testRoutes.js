import express from 'express';

const router = express.Router();

router.post('/submit-test', (req, res) => {
  const formData = req.body;
  console.log('Полученные данные:', formData);

  const totalQuestions = 8;  // Обновлено количество вопросов
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
    question8: ['Лев', 'Тигр']
  };

  let score = 0;
  let incorrectAnswerNumbers = [];

  for (const [key, value] of Object.entries(answers)) {
    if (Array.isArray(value)) {
      // Если правильный ответ - массив (множественный выбор)
      const userAnswers = formData[key] || [];

      // Преобразуем в массив, если один ответ
      const userAnswersArray = Array.isArray(userAnswers) ? userAnswers : [userAnswers];

      // Проверяем, совпадают ли ответы пользователя с правильными ответами
      if (userAnswersArray.length === value.length && userAnswersArray.every(answer => value.includes(answer))) {
        score++;
      } else {
        incorrectAnswerNumbers.push(key.split('question')[1]);
      }
    } else {
      // Обычная проверка для одиночных вопросов
      if (formData[key] === value) {
        score++;
      } else {
        incorrectAnswerNumbers.push(key.split('question')[1]);
      }
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
