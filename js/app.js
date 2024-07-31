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
    console.log('Closing tooltip for', paramClue);
    paramClue.classList.remove('enabled');
    paramClue.parentElement.classList.remove('active');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted for', param);
    const value = parseFloat(paramInput.value);
    console.log('Input value:', value);

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

    const firstSkolzValue = parseFloat(document.querySelector('.temper-1-skolz').textContent);
    const paramSpan = param ? param.nextElementSibling : null;
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
  const paramElement = document.querySelector(paramSelector);
  if (!paramElement) {
    console.error(`Element not found: ${paramSelector}`);
    return;
  }
  const paramValue = parseFloat(paramElement.textContent);
  const paramSpan = paramElement.nextElementSibling;
  applyAnimation(paramValue, paramElement, paramSpan, conditionMin, conditionMax, firstSkolzValue);
};

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
