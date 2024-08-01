// Функция для обновления значений и применения анимации
const updateValueAndAnimate = (value, param) => {
  const paramSpan = param.nextElementSibling;
  const firstSkolzValue = parseFloat(document.querySelector('.temper-1-skolz').textContent);
  applyAnimation(value, param, paramSpan, param.dataset.conditionMin, param.dataset.conditionMax, firstSkolzValue);
  updateMode();
};

// Обработчики событий для синхронизации значений
const syncInputsAndSpan = () => {
  const spanElement = document.querySelector('.temper-1-skolz');
  const modalInput = document.querySelector('#firstSkolzInputModal');
  const clueInput = document.querySelector('#firstSkolzInput');

  const updateInputs = (value) => {
    modalInput.value = value;
    clueInput.value = value;
    spanElement.textContent = value;
    updateValueAndAnimate(value, spanElement);
  };

  modalInput.addEventListener('input', () => {
    const value = parseFloat(modalInput.value);
    if (!isNaN(value)) {
      updateInputs(value);
    }
  });

  clueInput.addEventListener('input', () => {
    const value = parseFloat(clueInput.value);
    if (!isNaN(value)) {
      updateInputs(value);
    }
  });

  spanElement.addEventListener('input', () => {
    const value = parseFloat(spanElement.textContent);
    if (!isNaN(value)) {
      updateInputs(value);
    }
  });
};

// Функция для применения анимации и добавления/удаления строки в таблице
const applyAnimation = (value, param, paramSpan, conditionMin, conditionMax, firstSkolzValue) => {
  if (firstSkolzValue < 50 || value < 50 || (value >= conditionMin && value <= conditionMax)) {
    param.style.animation = 'colorGreen 1s forwards';
    if (paramSpan) paramSpan.style.animation = 'colorGreen 1s forwards';
    removeRowIfExists(param.dataset.description);
    return true;
  } else {
    param.style.animation = 'colorRed 0.5s infinite ease-in-out';
    if (paramSpan) paramSpan.style.animation = 'colorRed 0.5s infinite ease-in-out';
    addRowIfRunning(param, param.dataset.description);
    return false;
  }
};

// Функция отображения подсказок и обновления значений
const tooltipVisible = (paramClick = null, paramClue = null, close = null, paramInput, param, form, checkValue = false, resultSpan = null, min = 0, max = 1500, conditionMin, conditionMax) => {
  paramInput.min = min;
  paramInput.max = max;

  const allClues = document.querySelectorAll('.mnemo__param-clue');

  const handleClick = () => {
    allClues.forEach((clue) => {
      clue.classList.remove('enabled');
      clue.parentElement.classList.remove('active');
    });
    paramClue.classList.add('enabled');
    paramClue.parentElement.classList.add('active');
  };

  const handleClose = () => {
    paramClue.classList.remove('enabled');
    paramClue.parentElement.classList.remove('active');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = parseFloat(paramInput.value);

    if (!isNaN(value) && value >= min && value <= max) {
      if (param) {
        param.textContent = value;
      } else {
        console.error('param is null');
      }
    } else {
      if (param) {
        param.textContent = "Некорректное значение";
      } else {
        console.error('param is null');
      }
    }

    if (checkValue && resultSpan) {
      resultSpan.textContent = determineMode(value);
    } else if (resultSpan) {
      resultSpan.textContent = value;
    }

    updateValueAndAnimate(value, param);
    handleClose();
  };

  paramClick.addEventListener('click', handleClick);
  close.addEventListener('click', handleClose);
  form.addEventListener('submit', handleSubmit);

  if (param) {
    const initialValue = parseFloat(param.textContent);
    updateValueAndAnimate(initialValue, param);

    if (resultSpan) {
      resultSpan.textContent = determineMode(initialValue);
    }
  } else {
    console.error('param is null');
  }
};

// Инициализация таблицы и шаблонной строки
const tableTbody = document.querySelector('.table__tbody');
const template = `
  <tr class="table__tr template-row">
    <td class="table__td table__left table__td--descr" colspan="2">Тут будут отображаться параметры,
        которые превышают допустимые значения</td>
  </tr>
`;

// Функция добавления строки, если параметр активен
const addRowIfRunning = (param, description) => {
  const existingRows = Array.from(document.querySelectorAll('.table__tr'));
  const paramExists = existingRows.some(row => row.children[0].textContent === description);

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
const removeRowIfExists = (description) => {
  const existingRows = Array.from(document.querySelectorAll('.table__tr'));
  const rowToRemove = existingRows.find(row => row.children[0].textContent === description);

  if (rowToRemove) {
    rowToRemove.remove();
  }
  checkAndInsertTemplate();
};

// Функция проверки и вставки шаблонной строки
const checkAndInsertTemplate = () => {
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

// Функция обновления параметров
const updateParameter = (paramSelector, conditionMin, conditionMax, firstSkolzValue) => {
  const paramElement = document.querySelector(paramSelector);
  if (!paramElement) {
    console.error(`Element not found: ${paramSelector}`);
    return;
  }
  const paramValue = parseFloat(paramElement.textContent);
  const paramSpan = paramElement.nextElementSibling;
  applyAnimation(paramValue, paramElement, paramSpan, conditionMin, conditionMax, firstSkolzValue);
};

// Функция обновления режима
const updateMode = () => {
  const firstSkolzElement = document.querySelector('.temper-1-skolz');
  if (!firstSkolzElement) {
    console.error('Element not found: .temper-1-skolz');
    return;
  }
  const firstSkolzValue = parseFloat(firstSkolzElement.textContent);
  const mode = determineMode(firstSkolzValue);
  const currentModeSpan = document.querySelector('.current-param__subtitle-span');

  if (currentModeSpan && currentModeSpan.textContent !== mode) {
    currentModeSpan.textContent = mode;
  }

  updateParameter('.temper-2-skolz', 0, 700, firstSkolzValue);
  updateParameter('.temper-3-skolz', 0, 500, firstSkolzValue);

  addRowIfRunning(document.querySelector('.temper-2-skolz'), "Температура на 2 скользящей");
  addRowIfRunning(document.querySelector('.temper-3-skolz'), "Температура на 3 скользящей");

  checkAndInsertTemplate();
};

// Инициализация параметров с описанием
const firstSkolz = document.querySelector('.temper-1-skolz');
firstSkolz.dataset.description = "Температура на 1 скользящей";
firstSkolz.dataset.conditionMin = 550;
firstSkolz.dataset.conditionMax = 800;
const secondSkolz = document.querySelector('.temper-2-skolz');
secondSkolz.dataset.description = "Температура на 2 скользящей";
secondSkolz.dataset.conditionMin = 0;
secondSkolz.dataset.conditionMax = 700;
const thirdSkolz = document.querySelector('.temper-3-skolz');
thirdSkolz.dataset.description = "Температура на 3 скользящей";
thirdSkolz.dataset.conditionMin = 0;
thirdSkolz.dataset.conditionMax = 500;

const firstSkolzClick = document.querySelector('.first-skolz-js');
const firstSkolzClue = document.querySelector('.first-skolz-clue');
const firstSkolzClose = document.querySelector('.first-skolz-clue-close');
const firstSkolzInput = document.querySelector('#firstSkolzInputModal');
const firstSkolzInputClue = document.querySelector('#firstSkolzInput');
const firstSkolzForm = document.querySelector('.mnemo__param-clue-form--first-skolz-clue');
const resultSpan = document.querySelector('.current-param__subtitle-span');

const secondSkolzClick = document.querySelector('.second-skolz-js');
const secondSkolzClue = document.querySelector('.second-skolz-clue');
const secondSkolzClose = document.querySelector('.second-skolz-clue-close');
const secondSkolzInput = document.querySelector('#secondSkolzInput');
const secondSkolzForm = document.querySelector('.mnemo__param-clue-form--second-skolz-clue');

const thirdSkolzClick = document.querySelector('.third-skolz-js');
const thirdSkolzClue = document.querySelector('.third-skolz-clue');
const thirdSkolzClose = document.querySelector('.third-skolz-clue-close');
const thirdSkolzInput = document.querySelector('#thirdSkolzInput');
const thirdSkolzForm = document.querySelector('.mnemo__param-clue-form--third-skolz-clue');

// Инициализация tooltipVisible для параметров
tooltipVisible(firstSkolzClick, firstSkolzClue, firstSkolzClose, firstSkolzInput, firstSkolz, firstSkolzForm, true, resultSpan, 0, 1500, 550, 800);
tooltipVisible(secondSkolzClick, secondSkolzClue, secondSkolzClose, secondSkolzInput, secondSkolz, secondSkolzForm, false, null, 0, 1500, 0, 700);
tooltipVisible(thirdSkolzClick, thirdSkolzClue, thirdSkolzClose, thirdSkolzInput, thirdSkolz, thirdSkolzForm, false, null, 0, 1500, 0, 500);

// Инициализация синхронизации инпутов и span
syncInputsAndSpan();
