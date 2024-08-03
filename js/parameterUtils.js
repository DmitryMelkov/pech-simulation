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
  },
  {
    spanSelector: '.temper-2-skolz',
    modalInputSelector: '#secondSkolzInputModal',
    clueInputSelector: '#secondSkolzInput',
    conditionMin: 0,
    conditionMax: 700,
    description: 'Температура на 2 скользящей',
  },
  {
    spanSelector: '.temper-3-skolz',
    modalInputSelector: '#thirdSkolzInputModal',
    clueInputSelector: '#thirdSkolzInput',
    conditionMin: 0,
    conditionMax: 750, // Updated for "выход на режим"
    description: 'Температура на 3 скользящей',
  },
];

// Синхронизация инпутов и спанов
export const syncInputsAndSpan = () => {
  const updateInputs = (value, modalInput, clueInput, spanElement) => {
    if (isNaN(value) || value < 0 || value > 1500) {
      console.error('Value must be between 0 and 1500');
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

    if (!spanElement || !modalInput || !clueInput) {
      return;
    }

    modalInput.addEventListener('input', () => {
      const value = parseFloat(modalInput.value);
      updateInputs(value, modalInput, clueInput, spanElement);
    });

    clueInput.addEventListener('input', () => {
      const value = parseFloat(clueInput.value);
      updateInputs(value, modalInput, clueInput, spanElement);
    });

    spanElement.addEventListener('input', () => {
      const value = parseFloat(spanElement.textContent);
      updateInputs(value, modalInput, clueInput, spanElement);
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

  checkAndInsertTemplate();
};
