const tooltipVisible = (paramClick, paramClue, close, paramInput, param, form, checkValue = false, resultSpan = null, min = 0, max = 1500, conditionMin, conditionMax, sirenCheckCallback) => {
  paramInput.min = min;
  paramInput.max = max;

  const applyAnimation = (value, param, paramSpan) => {
    const firstSkolzValue = parseFloat(document.querySelector('.temper-1-skolz').textContent);
    if (firstSkolzValue < 50) {
      param.style.animation = 'colorGreen 1s forwards';
      if (paramSpan) {
        paramSpan.style.animation = 'colorGreen 1s forwards';
      }
      return true; // Всегда возвращаем true, если значение firstSkolz меньше 50
    }

    if (value < 50) {
      param.style.animation = 'colorGreen 1s forwards';
      if (paramSpan) {
        paramSpan.style.animation = 'colorGreen 1s forwards';
      }
      return true; // Всегда возвращаем true, если значение меньше 50
    } else if (value > conditionMax || value < conditionMin) {
      param.style.animation = 'colorRed 0.5s infinite ease-in-out';
      if (paramSpan) {
        paramSpan.style.animation = 'colorRed 0.5s infinite ease-in-out';
      }
      return false; // Возвращаем false если значение не в диапазоне
    } else {
      param.style.animation = 'colorGreen 1s forwards';
      if (paramSpan) {
        paramSpan.style.animation = 'colorGreen 1s forwards';
      }
      return true; // Возвращаем true если значение в диапазоне
    }
  };

  const allClues = document.querySelectorAll('.mnemo__param-clue');

  paramClick.addEventListener('click', () => {
    allClues.forEach((clue) => {
      clue.classList.remove('enabled');
      const parentElement = clue.parentElement;
      parentElement.classList.remove('active');
    });

    paramClue.classList.add('enabled');
    const parentElement = paramClue.parentElement;
    parentElement.classList.add('active');
  });

  close.addEventListener('click', () => {
    paramClue.classList.remove('enabled');
    const parentElement = paramClue.parentElement;
    parentElement.classList.remove('active');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = parseFloat(paramInput.value);

    // Проверка, находится ли значение в пределах диапазона
    if (!isNaN(value) && value >= min && value <= max) {
      param.textContent = value;
    } else {
      param.textContent = "Некорректное значение";
    }

    let resultText;
    if (checkValue) {
      if (value >= 50 && value < 550) {
        resultText = "Выход на режим";
      } else if (value >= 550) {
        resultText = "Установившийся режим";
      } else if (value >= 0 && value < 50) {
        resultText = "Печь не работает";
      } else {
        resultText = "Некорректное значение";
      }
    } else {
      resultText = value;
    }

    // Применение анимации
    const paramSpan = param.nextElementSibling;
    const isInRange = applyAnimation(value, param, paramSpan);

    if (resultSpan) {
      resultSpan.textContent = resultText;
    }

    paramClue.classList.remove('enabled');
    const parentElement = paramClue.parentElement;
    parentElement.classList.remove('active');

    // Проверка состояния сирены после обновления параметра
    sirenCheckCallback();
  });

  // Проверка значений при загрузке страницы
  const initialValue = parseFloat(param.textContent);
  const paramSpan = param.nextElementSibling;
  applyAnimation(initialValue, param, paramSpan);
};

// Функция для проверки состояния сирены
const checkSirenStatus = (sirenElement, ...params) => {
  const firstSkolzValue = parseFloat(document.querySelector('.temper-1-skolz').textContent);

  const allInRange = params.every(([param, min, max]) => {
    const value = parseFloat(param.textContent);
    return value < 50 || (value >= min && value <= max);
  });

  if (firstSkolzValue < 50 || !allInRange) {
    sirenElement.classList.remove('siren-off');
  } else {
    sirenElement.classList.add('siren-off');
  }

  // Добавляем проверку для firstSkolz
  if (firstSkolzValue < 50) {
    sirenAnimation.classList.add('siren-off');
  }
};

const firstSkolzClue = document.querySelector('.first-skolz-clue');
const firstSkolzClick = document.querySelector('.first-skolz-js');
const firstSkolzClose = document.querySelector('.first-skolz-clue-close');
const firstSkolzInput = document.querySelector('#firstSkolzInput');
const firstSkolz = document.querySelector('.temper-1-skolz');
const firstSkolzForm = document.querySelector('.mnemo__param-clue-form--first-skolz-clue');
const resultSpan = document.querySelector('.current-param__subtitle-span');
const sirenAnimation = document.querySelector('.light-alarm__content'); // Получаем элемент сирены

const secondSkolzClick = document.querySelector('.second-skolz-js');
const secondSkolzClue = document.querySelector('.second-skolz-clue');
const secondSkolzClose = document.querySelector('.second-skolz-clue-close');
const secondSkolzInput = document.querySelector('#secondSkolzInput');
const secondSkolz = document.querySelector('.temper-2-skolz');
const secondSkolzForm = document.querySelector('.mnemo__param-clue-form--second-skolz-clue');

// Проверка состояния сирены при загрузке страницы
const sirenCheckCallback = () => checkSirenStatus(sirenAnimation, [firstSkolz, 550, 800], [secondSkolz, 0, 700]);

tooltipVisible(firstSkolzClick, firstSkolzClue, firstSkolzClose, firstSkolzInput, firstSkolz, firstSkolzForm, true, resultSpan, 0, 1500, 550, 800, sirenCheckCallback);
tooltipVisible(secondSkolzClick, secondSkolzClue, secondSkolzClose, secondSkolzInput, secondSkolz, secondSkolzForm, false, null, 0, 1500, 0, 700, sirenCheckCallback);

// Первоначальная проверка состояния сирены
sirenCheckCallback();
