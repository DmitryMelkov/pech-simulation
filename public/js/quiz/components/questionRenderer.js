export const loadQuestions = async () => {
  const form = document.getElementById('testForm');
  const questionOrderMap = {};

  try {
    const response = await fetch('/get-questions');
    const questions = await response.json();

    form.innerHTML = '';

    questions.forEach((question, index) => {
      questionOrderMap[question.id] = index + 1;

      const questionHtml = `
        <div class="test__question">
          <p class="test__question-descr descr-reset">${index + 1}. ${question.question}</p>
          <div class="options">
            ${question.options
              .map(
                (option, i) => `
                  <div class="options__item">
                    <input class="options__input" type="${Array.isArray(question.answer) ? 'checkbox' : 'radio'}"
                           id="q${question.uniqueId}${i}" name="${question.uniqueId}" value="${option}">
                    <label class="options__label test__question-label" for="q${question.uniqueId}${i}">
                      <span class="test__question-span">${option}</span>
                    </label>
                  </div>
                `
              )
              .join('')}
          </div>
        </div>
      `;
      form.insertAdjacentHTML('beforeend', questionHtml);
    });

    window.questionOrderMap = questionOrderMap;
  } catch (error) {
    console.error('Ошибка при загрузке вопросов:', error);
  }
};
