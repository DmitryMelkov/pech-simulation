// Обновленная функция проверки всех ответов
export const checkAllQuestionsAnswered = (form) => {
  const questions = form.querySelectorAll('.test__question');
  return Array.from(questions).every((question) => {
    const inputs = question.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    return Array.from(inputs).some((input) => input.checked);
  });
};

// Обновленная функция получения неотвеченных вопросов
export const getUnansweredQuestions = (form) => {
  const questions = form.querySelectorAll('.test__question');
  const unansweredQuestions = [];

  questions.forEach((question, index) => {
    const inputs = question.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    const isAnswered = Array.from(inputs).some((input) => input.checked);
    if (!isAnswered) unansweredQuestions.push(index + 1); // Индексация вопросов
  });

  return unansweredQuestions;
};
