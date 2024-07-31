const determineMode = (value) => {
  if (value >= 50 && value < 550) {
    return "Выход на режим";
  } else if (value >= 550) {
    return "Установившийся режим";
  } else if (value >= 0 && value < 50) {
    return "Печь не работает";
  } else {
    return "Некорректное значение";
  }
};

const applyAnimation = (value, param, paramSpan, conditionMin, conditionMax, firstSkolzValue) => {
  if (firstSkolzValue < 50 || value < 50 || (value >= conditionMin && value <= conditionMax)) {
    param.style.animation = 'colorGreen 1s forwards';
    if (paramSpan) paramSpan.style.animation = 'colorGreen 1s forwards';
    return true;
  } else {
    param.style.animation = 'colorRed 0.5s infinite ease-in-out';
    if (paramSpan) paramSpan.style.animation = 'colorRed 0.5s infinite ease-in-out';
    return false;
  }
};

const tooltipVisible = (paramClick, paramClue, close, paramInput, param, form, checkValue = false, resultSpan = null, min = 0, max = 1500, conditionMin, conditionMax) => {
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
      param.textContent = value;
    } else {
      param.textContent = "Некорректное значение";
    }

    if (checkValue) {
      resultSpan.textContent = determineMode(value);
    } else {
      resultSpan.textContent = value;
    }

    const firstSkolzValue = parseFloat(document.querySelector('.temper-1-skolz').textContent);
    const paramSpan = param.nextElementSibling;
    applyAnimation(value, param, paramSpan, conditionMin, conditionMax, firstSkolzValue);

    handleClose();
    updateMode();
  };

  paramClick.addEventListener('click', handleClick);
  close.addEventListener('click', handleClose);
  form.addEventListener('submit', handleSubmit);

  const initialValue = parseFloat(param.textContent);
  const paramSpan = param.nextElementSibling;
  const firstSkolzValue = parseFloat(document.querySelector('.temper-1-skolz').textContent);
  applyAnimation(initialValue, param, paramSpan, conditionMin, conditionMax, firstSkolzValue);

  if (resultSpan) {
    resultSpan.textContent = determineMode(initialValue);
  }
};

const updateParameter = (paramSelector, conditionMin, conditionMax, firstSkolzValue) => {
  const paramValue = parseFloat(document.querySelector(paramSelector).textContent);
  const param = document.querySelector(paramSelector);
  const paramSpan = param.nextElementSibling;
  applyAnimation(paramValue, param, paramSpan, conditionMin, conditionMax, firstSkolzValue);
};

const updateMode = () => {
  const firstSkolzValue = parseFloat(document.querySelector('.temper-1-skolz').textContent);
  const mode = determineMode(firstSkolzValue);
  const currentModeSpan = document.querySelector('.current-param__subtitle-span');

  if (currentModeSpan.textContent !== mode) {
    currentModeSpan.textContent = mode;
  }

  updateParameter('.temper-2-skolz', 0, 700, firstSkolzValue); // Обновляем secondSkolz
  updateParameter('.temper-3-skolz', 0, 500, firstSkolzValue); // Обновляем thirdSkolz
};

const firstSkolzClue = document.querySelector('.first-skolz-clue');
const firstSkolzClick = document.querySelector('.first-skolz-js');
const firstSkolzClose = document.querySelector('.first-skolz-clue-close');
const firstSkolzInput = document.querySelector('#firstSkolzInput');
const firstSkolz = document.querySelector('.temper-1-skolz');
const firstSkolzForm = document.querySelector('.mnemo__param-clue-form--first-skolz-clue');
const resultSpan = document.querySelector('.current-param__subtitle-span');

const secondSkolzClick = document.querySelector('.second-skolz-js');
const secondSkolzClue = document.querySelector('.second-skolz-clue');
const secondSkolzClose = document.querySelector('.second-skolz-clue-close');
const secondSkolzInput = document.querySelector('#secondSkolzInput');
const secondSkolz = document.querySelector('.temper-2-skolz');
const secondSkolzForm = document.querySelector('.mnemo__param-clue-form--second-skolz-clue');

const thirdSkolzClick = document.querySelector('.third-skolz-js');
const thirdSkolzClue = document.querySelector('.third-skolz-clue');
const thirdSkolzClose = document.querySelector('.third-skolz-clue-close');
const thirdSkolzInput = document.querySelector('#thirdSkolzInput');
const thirdSkolz = document.querySelector('.temper-3-skolz');
const thirdSkolzForm = document.querySelector('.mnemo__param-clue-form--third-skolz-clue');

tooltipVisible(firstSkolzClick, firstSkolzClue, firstSkolzClose, firstSkolzInput, firstSkolz, firstSkolzForm, true, resultSpan, 0, 1500, 550, 800);
tooltipVisible(secondSkolzClick, secondSkolzClue, secondSkolzClose, secondSkolzInput, secondSkolz, secondSkolzForm, false, null, 0, 1500, 0, 700);
tooltipVisible(thirdSkolzClick, thirdSkolzClue, thirdSkolzClose, thirdSkolzInput, thirdSkolz, thirdSkolzForm, false, null, 0, 1500, 0, 500);

updateMode(); // Инициализируем начальное значение режима
