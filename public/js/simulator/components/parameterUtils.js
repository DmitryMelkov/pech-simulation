import { applyAnimation, updateValueAndAnimate, updateLevelAnimation } from './animationUtils.js';
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
    type: 'temperature',
  },
  {
    spanSelector: '.temper-2-skolz',
    modalInputSelector: '#secondSkolzInputModal',
    clueInputSelector: '#secondSkolzInput',
    conditionMin: 0,
    conditionMax: 700,
    description: 'Температура на 2 скользящей',
    type: 'temperature',
  },
  {
    spanSelector: '.temper-3-skolz',
    modalInputSelector: '#thirdSkolzInputModal',
    clueInputSelector: '#thirdSkolzInput',
    conditionMin: 0,
    conditionMax: 750,
    description: 'Температура на 3 скользящей',
    type: 'temperature',
  },
  {
    spanSelector: '.temper-topka',
    modalInputSelector: '#temperVTopkeInputModal',
    clueInputSelector: '#temperVTopkeInput',
    conditionMin: 0,
    conditionMax: 1000,
    description: 'Температура в топке',
    type: 'temperature',
  },
  {
    spanSelector: '.temper-kamer-vygruz',
    modalInputSelector: '#temperKamerVygruzInputModal',
    clueInputSelector: '#temperKamerVygruzInput',
    conditionMin: 0,
    conditionMax: 750,
    description: 'Температура камеры выгрузки',
    type: 'temperature',
  },
  {
    spanSelector: '.temper-verh-kamer-zagruz',
    modalInputSelector: '#temperVerhKamerZagruzInputModal',
    clueInputSelector: '#verhKameryZagruzInput',
    conditionMin: 0,
    conditionMax: 1000,
    description: 'Температура вверху камеры загрузки',
    type: 'temperature',
  },
  {
    spanSelector: '.temper-vniz-kamer-zagruz',
    modalInputSelector: '#temperVnizKamerZagruzInputModal',
    clueInputSelector: '#vnizKameryZagruzInput',
    conditionMin: 0,
    conditionMax: 1100,
    description: 'Температура внизу камеры загрузки',
    type: 'temperature',
  },
  {
    spanSelector: '.temper-vhod-pech-dozhig',
    modalInputSelector: '#temperVhodPechDozhigInputModal',
    clueInputSelector: '#vhodPechDozhigInput',
    conditionMin: 0,
    conditionMax: 1150,
    description: 'Температура на входе печи дожигания',
    type: 'temperature',
  },
  {
    spanSelector: '.temper-vyhod-pech-dozhig',
    modalInputSelector: '#temperVyhodPechDozhigInputModal',
    clueInputSelector: '#vyhodPechDozhigInput',
    conditionMin: 0,
    conditionMax: 1200,
    description: 'Температура на выходе печи дожигания',
    type: 'temperature',
  },
  {
    spanSelector: '.temper-granul-holod',
    modalInputSelector: '#temperGranulHolodInputModal',
    clueInputSelector: '#granulHolodInput',
    conditionMin: 0,
    conditionMax: 70,
    description: 'Температура гранул после холодильника',
    type: 'temperature',
  },
  {
    spanSelector: '.temper-gazov-do-skruber-span',
    modalInputSelector: '#temperGazovDoSkrubberaInputModal',
    clueInputSelector: '#temperGazovDoSkrubberInput',
    conditionMin: 0,
    conditionMax: 400,
    description: 'Температура газов до скруббера',
    type: 'temperature',
  },
  {
    spanSelector: '.davl-v-barabane',
    modalInputSelector: '#pVbarabaneInputModal',
    clueInputSelector: '#pVbarabaneInput',
    conditionMin: 0,
    conditionMax: 10,
    description: 'Давление в барабане котла',
    type: 'pressure',
  },
  {
    spanSelector: '.razrezh-topka',
    modalInputSelector: '#razrezhVtopkeInputModal',
    clueInputSelector: '#razrezhVtopkeInput',
    conditionMin: -4,
    conditionMax: -1,
    description: 'Разрежение в топке печи',
    type: 'razrezh',
  },
  {
    spanSelector: '.uroven-v-kotle',
    modalInputSelector: '#urovenVkotleInputModal',
    clueInputSelector: '#urovenVkotleInput',
    conditionMin: -80,
    conditionMax: 80,
    description: 'Уровень в котле',
    type: 'level',
  },
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
    } else if (type === 'level') {
      isValid = !isNaN(value) && value >= -200 && value <= 200;
    }

    if (!isValid) {
      console.error(
        `Value must be between ${
          type === 'temperature'
            ? '0 and 1500'
            : type === 'pressure'
            ? '0 and 20'
            : type === 'razrezh'
            ? '-4 and -1'
            : type === 'level'
            ? '-200 and 200'
            : 'unknown range'
        }`
      );
      return;
    }

    value = parseFloat(value);
    modalInput.value = value;
    clueInput.value = value;
    spanElement.textContent = value;
    updateValueAndAnimate(value, spanElement);

    if (type === 'level') {
      const levelKotel = document.querySelector('.column-kotel__percent');
      const firstSkolzValue = parseFloat(document.querySelector('.temper-1-skolz').textContent.trim());
      const levelKotelPercent = document.querySelector('.column-kotel__span-1');

      if (levelKotel && levelKotelPercent && !isNaN(firstSkolzValue)) {
        updateLevelAnimation(value, -80, 80, levelKotel, levelKotelPercent, firstSkolzValue);
      }
    }
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

  if (paramSelector === '.uroven-v-kotle') {
    const levelKotel = document.querySelector('.column-kotel__percent');
    const levelKotelPercent = document.querySelector('.column-kotel__span-1');
    if (levelKotel && levelKotelPercent) {
      updateLevelAnimation(paramValue, conditionMin, conditionMax, levelKotel, levelKotelPercent, firstSkolzValue);
    }
  }
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
  updateParameter('.temper-topka', 0, 1000, firstSkolzValue);
  updateParameter('.temper-kamer-vygruz', 0, 750, firstSkolzValue);
  updateParameter('.temper-verh-kamer-zagruz', 0, 1000, firstSkolzValue);
  updateParameter('.temper-vniz-kamer-zagruz', 0, 1100, firstSkolzValue);
  updateParameter('.temper-vhod-pech-dozhig', 0, 1150, firstSkolzValue);
  updateParameter('.temper-vyhod-pech-dozhig', 0, 1200, firstSkolzValue);
  updateParameter('.temper-granul-holod', 0, 70, firstSkolzValue);
  updateParameter('.temper-gazov-do-skruber-span', 0, 400, firstSkolzValue);

  updateParameter('.davl-v-barabane', 0, 10, firstSkolzValue);
  updateParameter('.razrezh-topka', -4, -1, firstSkolzValue);
  updateParameter('.uroven-v-kotle', -80, 80, firstSkolzValue);

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
  addRowIfRunning(document.querySelector('.temper-v-topke'), 'Температура в топке');
  addRowIfRunning(document.querySelector('.temper-kamer-vygruz'), 'Температура камеры выгрузки');
  addRowIfRunning(document.querySelector('.temper-verh-kamer-zagruz'), 'Температура вверху камеры загрузки');
  addRowIfRunning(document.querySelector('.temper-vniz-kamer-zagruz'), 'Температура внизу камеры загрузки');
  addRowIfRunning(document.querySelector('.temper-vhod-pech-dozhig'), 'Температура на входе печи дожигания');
  addRowIfRunning(document.querySelector('.temper-vyhod-pech-dozhig'), 'Температура на выходе печи дожигания');
  addRowIfRunning(document.querySelector('.temper-granul-holod'), 'Температура гранул после холодильника');
  addRowIfRunning(document.querySelector('.temper-gazov-do-skruber-span'), 'Температура газов до скруббера');

  addRowIfRunning(document.querySelector('.davl-v-barabane'), 'Давление в барабане котла');
  addRowIfRunning(document.querySelector('.razrezh-topka'), 'Разрежение в топке печи');
  addRowIfRunning(document.querySelector('.uroven-v-kotle'), 'Уровень в котле');

  checkAndInsertTemplate();
};
