// Инициализация таблицы и шаблонной строки
const tableTbody = document.querySelector('.table__tbody');
const template = `
  <tr class="table__tr template-row">
    <td class="table__td table__left table__td--descr" colspan="2">Тут будут отображаться параметры,
        которые превышают допустимые значения</td>
  </tr>
`;

const getDataModalAttribute = (description, value) => {
  const modalMap = {
    'Температура на 1 скользящей': 'modal-param-js--temper-1-skolz',
    'Температура на 2 скользящей': 'modal-param-js--temper-2-skolz',
    'Температура на 3 скользящей': 'modal-param-js--temper-3-skolz',
    'Температура камеры выгрузки': 'modal-param-js--temper-kamer-vygruz',
    'Температура в топке': 'modal-param-js--temper-v-topke',
    'Температура вверху камеры загрузки': 'modal-param-js--temper-verh-kamer-zagruz',
    'Температура внизу камеры загрузки':
      value > 1100
        ? 'modal-param-js--temper-vniz-kamer-zagruz-high'
        : value < 1000
        ? 'modal-param-js--temper-vniz-kamer-zagruz-low'
        : '',
    'Температура на входе печи дожигания': 'modal-param-js--temper-vhod-pech-dozhig',
    'Температура на выходе печи дожигания': 'modal-param-js--temper-vyhod-pech-dozhig',
    'Температура гранул после холодильника': 'modal-param-js--granul-holod-zagruz',
    'Температура газов до скруббера': 'modal-param-js--temper-gazov-do-skrubber',
    'Температура газов после скруббера': 'modal-param-js--temper-gazov-posle-skrubber',
    'Температура воды в ванне скруббера': 'modal-param-js--temper-vody-v-vanne-skrubber',
    'Температура газов котла утилизатора': 'modal-param-js--temper-gazov-kotel-utiliz-val',
    // 'Давление в барабане котла': 'modal-param-js--davl-v-barabane',
    'Разрежение внизу загрузочной камеры': 'modal-param-js--razr-niz-zagr-kam',
    'Разрежение в топке печи': 'modal-param-js--razrezh-v-topke',
    'Уровень в котле': 'modal-param-js--uroven-v-kotle',
    'Уровень в ванне скруббера': 'modal-param-js--uroven-vanne-skrubber',
    'Уровень воды в емкости ХВО': 'modal-param-js--uroven-vody-hvo',
    'Давление газов после скруббера': 'modal-param-js--davl-gazov-posle-skrubbera',
  };
  return modalMap[description] || '';
};

export const addOrUpdateRow = (param, description) => {
  const existingRows = Array.from(document.querySelectorAll('.table__tr'));
  const paramValue = parseFloat(param.textContent.trim());
  let rowUpdated = false;

  existingRows.forEach((row) => {
    if (row.children[0].textContent === description) {
      row.children[1].textContent = paramValue;
      rowUpdated = true;
    }
  });

  if (!rowUpdated && param.style.animation.includes('colorRed')) {
    const dataModal = getDataModalAttribute(description, paramValue);
    if (dataModal) {
      const row = `
        <tr class="table__tr table__tr--incorrect-param table__tr--incorrect-param-js" data-modal="${dataModal}">
          <td class="table__td table__left">${description}</td>
          <td class="table__td table__right">${paramValue}</td>
        </tr>
      `;
      tableTbody.innerHTML += row;
    }
  }

  if (rowUpdated && paramValue < 1000 && description === 'Температура внизу камеры загрузки') {
    const dataModal = getDataModalAttribute(description, paramValue);
    const row = `
      <tr class="table__tr table__tr--incorrect-param table__tr--incorrect-param-js" data-modal="${dataModal}">
        <td class="table__td table__left">${description}</td>
        <td class="table__td table__right">${paramValue}</td>
      </tr>
    `;
    tableTbody.innerHTML = tableTbody.innerHTML.replace(rowUpdated, row);
  }

  checkAndInsertTemplate();
};

// Функция добавления строки, если параметр активен
export const addRowIfRunning = (param, description) => {
  const existingRows = Array.from(document.querySelectorAll('.table__tr'));
  const paramValue = parseFloat(param.textContent.trim());
  const paramExists = existingRows.some((row) => row.children[0].textContent === description);

  if (param.style.animation.includes('colorRed') && !paramExists) {
    const dataModal = getDataModalAttribute(description, paramValue);
    if (dataModal) {
      console.log(`Adding new row with description: ${description}, data-modal: ${dataModal}`);
      const row = `
        <tr class="table__tr table__tr--incorrect-param table__tr--incorrect-param-js" data-modal="${dataModal}">
          <td class="table__td table__left">${description}</td>
          <td class="table__td table__right">${param.innerHTML}</td>
        </tr>
      `;
      tableTbody.innerHTML += row;
    }
  }

  // Добавьте эту проверку
  if (paramExists && paramValue < 1000 && description === 'Температура внизу камеры загрузки') {
    const dataModal = getDataModalAttribute(description, paramValue);
    const row = `
      <tr class="table__tr table__tr--incorrect-param table__tr--incorrect-param-js" data-modal="${dataModal}">
        <td class="table__td table__left">${description}</td>
        <td class="table__td table__right">${param.innerHTML}</td>
      </tr>
    `;
    tableTbody.innerHTML = tableTbody.innerHTML.replace(existingRows[existingRows.length - 1], row);
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
