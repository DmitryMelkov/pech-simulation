// Функция добавления или обновления строки, если параметр активен

// Инициализация таблицы и шаблонной строки
const tableTbody = document.querySelector('.table__tbody');
const template = `
  <tr class="table__tr template-row">
    <td class="table__td table__left table__td--descr" colspan="2">Тут будут отображаться параметры,
        которые превышают допустимые значения</td>
  </tr>
`;

export const addOrUpdateRow = (param, description) => {
  const existingRows = Array.from(document.querySelectorAll('.table__tr'));
  const paramValue = param.textContent.trim();
  let rowUpdated = false;

  existingRows.forEach((row) => {
    if (row.children[0].textContent === description) {
      row.children[1].textContent = paramValue;
      rowUpdated = true;
    }
  });

  if (!rowUpdated && param.style.animation.includes('colorRed')) {
    const row = `
      <tr class="table__tr table__tr--incorrect-param">
        <td class="table__td table__left">${description}</td>
        <td class="table__td table__right">${paramValue}</td>
      </tr>
    `;
    tableTbody.innerHTML += row;
  }
  checkAndInsertTemplate();
};


// Функция добавления строки, если параметр активен
export const addRowIfRunning = (param, description) => {
  const existingRows = Array.from(document.querySelectorAll('.table__tr'));
  const paramExists = existingRows.some((row) => row.children[0].textContent === description);

  if (param.style.animation.includes('colorRed') && !paramExists) {
    const row = `
      <tr class="table__tr table__tr--incorrect-param">
        <td class="table__td table__left">${description}</td>
        <td class="table__td table__right">${param.innerHTML}</td>
      </tr>
    `;
    tableTbody.innerHTML += row;
  }
  checkAndInsertTemplate();
};

// Функция удаления строки, если параметр нормализовался
export const removeRowIfExists = (description) => {
  const existingRows = Array.from(document.querySelectorAll('.table__tr'));
  const rowToRemove = existingRows.find((row) => row.children[0].textContent === description);

  if (rowToRemove) {
    rowToRemove.remove();
  }
  checkAndInsertTemplate();
};

// Функция проверки и вставки шаблонной строки
export const checkAndInsertTemplate = () => {
  const existingRows = Array.from(tableTbody.querySelectorAll('.table__tr:not(.template-row)'));
  if (existingRows.length === 0) {
    if (!tableTbody.querySelector('.template-row')) {
      tableTbody.innerHTML = template;
    }
  } else {
    const templateRow = tableTbody.querySelector('.template-row');
    if (templateRow) {
      templateRow.remove();
    }
  }
};
