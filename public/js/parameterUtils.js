import { applyAnimation, updateValueAndAnimate } from './animationUtils.js';
import { determineMode } from './modeUtils.js';
import { addRowIfRunning, checkAndInsertTemplate } from './tableUtils.js';

export const parameters = [
  {
    spanSelector: '.temper-1-skolz',
    modalInputSelector: '#firstSkolzInputModal',
    clueInputSelector: '#firstSkolzInput',
    conditionMin: 550,
    conditionMax: 800,
    description: 'Температура на 1 скользящей',
    type: 'temperature'
  },
  {
    spanSelector: '.temper-2-skolz',
    modalInputSelector: '#secondSkolzInputModal',
    clueInputSelector: '#secondSkolzInput',
    conditionMin: 0,
    conditionMax: 700,
    description: 'Температура на 2 скользящей',
    type: 'temperature'
  },
  {
    spanSelector: '.temper-3-skolz',
    modalInputSelector: '#thirdSkolzInputModal',
    clueInputSelector: '#thirdSkolzInput',
    conditionMin: 0,
    conditionMax: 750,
    description: 'Температура на 3 скользящей',
    type: 'temperature'
  },
  {
    spanSelector: '.davl-v-barabane',
    modalInputSelector: '#pVbarabaneInputModal',
    clueInputSelector: '#pVbarabaneInput',
    conditionMin: 0,
    conditionMax: 10,
    description: 'P в барабане котла',
    type: 'pressure'
  },
  {
    spanSelector: '.razrezh-topka',
    modalInputSelector: '#razrezhVtopkeInputModal',
    clueInputSelector: '#razrezhVtopkeInput',
    conditionMin: -4,
    conditionMax: -1,
    description: 'Разрежение в топке печи',
    type: 'razrezh'
  }
];

// Синхронизация инпутов и спанов
export const syncInputsAndSpan = () => {
  const updateInputs = (value, modalInput, clueInput, spanElement, type) => {
    let isValid = false;

    if (type === 'temperature') {
      isValid = !isNaN(value) && value >= 0 && value <= 1500;
    } else if (type === 'pressure') {
      isValid = !isNaN(value) && value >= 0 && value <= 20;
    } else if (type === 'razrezh') {
      isValid = !isNaN(value) && value >= -10 && value <= 0;
    }
    if (!isValid) {
      console.error(`Value must be between ${type === 'temperature' ? '0 and 1500' : type === 'pressure' ? '0 and 20' : '0 and -10'}`);
      return;
    }

    value = parseFloat(value);
    modalInput.value = value;
    clueInput.value = value;
    spanElement.textContent = value;
    updateValueAndAnimate(value, spanElement);
  };

  parameters.forEach((param) => {
    const spanElement = document.querySelector(param.spanSelector);
    const modalInput = document.querySelector(param.modalInputSelector);
    const clueInput = document.querySelector(param.clueInputSelector);
    const type = param.type;

    if (!spanElement || !modalInput || !clueInput) {
      return;
    }

    modalInput.addEventListener('input', () => {
      const value = parseFloat(modalInput.value);
      updateInputs(value, modalInput, clueInput, spanElement, type);
    });

    clueInput.addEventListener('input', () => {
      const value = parseFloat(clueInput.value);
      updateInputs(value, modalInput, clueInput, spanElement, type);
    });

    spanElement.addEventListener('input', () => {
      const value = parseFloat(spanElement.textContent);
      updateInputs(value, modalInput, clueInput, spanElement, type);
    });
  });
};

// Функция обновления параметров
export const updateParameter = (paramSelector, conditionMin, conditionMax, firstSkolzValue) => {
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
export const updateMode = () => {
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

  // Обновление параметров с учетом первого значения
  updateParameter('.temper-2-skolz', 0, 700, firstSkolzValue);
  updateParameter('.davl-v-barabane', 0, 10, firstSkolzValue);
  updateParameter('.razrezh-topka', -4, -1, firstSkolzValue);

  // Изменение диапазонов для 3 скользящей в зависимости от первого значения
  if (mode === 'Установившийся режим') {
    updateParameter('.temper-3-skolz', 0, 400, firstSkolzValue);
  } else if (mode === 'Выход на режим') {
    updateParameter('.temper-3-skolz', 0, 750, firstSkolzValue);
  } else {
    // Добавлен новый блок, чтобы остановить моргание параметра, если первый скользящий ниже 50
    updateParameter('.temper-3-skolz', 0, 750, firstSkolzValue);
  }

  addRowIfRunning(document.querySelector('.temper-2-skolz'), 'Температура на 2 скользящей');
  addRowIfRunning(document.querySelector('.temper-3-skolz'), 'Температура на 3 скользящей');
  addRowIfRunning(document.querySelector('.davl-v-barabane'), 'P в барабане котла');
  addRowIfRunning(document.querySelector('.razrezh-topka'), 'Разрежение в топке печи');

  checkAndInsertTemplate();
};
