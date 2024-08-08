import { updateValueAndAnimate } from './animationUtils.js';
import { determineMode } from './modeUtils.js';
import { levelObj } from './level.js';

// Функция отображения подсказок и обновления значений
export const tooltipVisible = (
  paramClick = null,
  paramClue = null,
  close = null,
  paramInput,
  param,
  form,
  checkValue = false,
  resultSpan = null,
  min = 0,
  max = 1500
) => {
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
    paramInput.focus();

    // Добавляем обработчик для клика на пустое поле
    document.addEventListener('click', handleClickOutside, true);
  };

  const handleClose = () => {
    paramClue.classList.remove('enabled');
    paramClue.parentElement.classList.remove('active');

    // Удаляем обработчик для клика на пустое поле
    document.removeEventListener('click', handleClickOutside, true);
  };

  const handleClickOutside = (event) => {
    if (!paramClue.contains(event.target) && !paramClick.contains(event.target)) {
      handleClose();
    }
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
        param.textContent = '';
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
