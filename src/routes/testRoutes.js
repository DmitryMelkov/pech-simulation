import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Получаем текущую директорию с помощью `import.meta.url`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Загружаем вопросы из файла JSON
const questionsPath = path.join(__dirname, '../data/questions.json');
const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

// Маршрут для получения вопросов с их случайным перемешиванием
router.get('/get-questions', (req, res) => {
  const shuffledQuestions = [...questions]
    .map((q, index) => ({
      ...q,
      uniqueId: `question${q.id}`, // добавляем уникальный ID на основе номера вопроса
      options: q.options.sort(() => Math.random() - 0.5) // перемешиваем варианты ответов
    }))
    .sort(() => Math.random() - 0.5); // перемешиваем вопросы

  res.json(shuffledQuestions);
});

// Обработчик для отправки ответов и расчета результатов
router.post('/submit-test', (req, res) => {
  const formData = req.body;
  console.log('Полученные данные на сервере:', formData);

  const totalQuestions = questions.length;
  const thresholds = {
    excellent: Math.floor(totalQuestions * 0.9),
    good: Math.floor(totalQuestions * 0.8),
    satisfactory: Math.floor(totalQuestions * 0.7),
  };

  let score = 0;
  let incorrectAnswerNumbers = [];

  questions.forEach((question) => {
    const userAnswer = formData[`question${question.id}`];
    const correctAnswer = question.answer;

    if (userAnswer !== undefined) {
      // Проверка на наличие ответа
      if (Array.isArray(correctAnswer)) {
        // Преобразуем одиночный ответ в массив для корректного сравнения
        const userAnswersArray = Array.isArray(userAnswer) ? userAnswer : [userAnswer];

        if (
          userAnswersArray.length === correctAnswer.length &&
          userAnswersArray.every((answer) => correctAnswer.includes(answer))
        ) {
          score++;
        } else {
          incorrectAnswerNumbers.push(question.id);
          console.log(
            `Неправильный ответ для вопроса ${question.id}: ожидалось ${correctAnswer}, получено ${userAnswer}`
          );
        }
      } else {
        if (userAnswer === correctAnswer) {
          score++;
        } else {
          incorrectAnswerNumbers.push(question.id);
          console.log(
            `Неправильный ответ для вопроса ${question.id}: ожидалось ${correctAnswer}, получено ${userAnswer}`
          );
        }
      }
    } else {
      console.log(`Ответ на вопрос ${question.id} отсутствует.`);
    }
  });

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
