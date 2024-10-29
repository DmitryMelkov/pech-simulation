export const checkAllQuestionsAnswered = (formData) => {
  // Получаем список всех вопросов на основе ключей formData
  const allQuestions = [...new Set([...formData.keys()].map((key) => key.match(/question(\d+)/)?.[1]))].filter(Boolean);

  const answeredQuestions = [...formData.keys()]
    .filter((key) => key.startsWith('question'))
    .map((key) => key.split('question')[1]);

  return allQuestions.every((question) => answeredQuestions.includes(question));
};

export const getUnansweredQuestions = (formData) => {
  const allQuestions = [...new Set([...formData.keys()].map((key) => key.match(/question(\d+)/)?.[1]))].filter(Boolean);

  const answeredQuestions = [...formData.keys()]
    .filter((key) => key.startsWith('question'))
    .map((key) => key.split('question')[1]);

  return allQuestions.filter((question) => !answeredQuestions.includes(question));
};
