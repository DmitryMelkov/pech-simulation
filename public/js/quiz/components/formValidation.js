export const checkAllQuestionsAnswered = (formData) => {
  const answeredQuestions = [...formData.keys()].map((key) => key.split('question')[1]);
  const allQuestions = ['1', '2', '3', '4', '5', '6', '7', '8'];
  return allQuestions.every((question) => answeredQuestions.includes(question));
};

export const getUnansweredQuestions = (formData) => {
  const answeredQuestions = [...formData.keys()].map((key) => key.split('question')[1]);
  const allQuestions = ['1', '2', '3', '4', '5', '6', '7', '8']; 
  return allQuestions.filter((question) => !answeredQuestions.includes(question));
};