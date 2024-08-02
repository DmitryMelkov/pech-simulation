import { addOrUpdateRow, removeRowIfExists } from './tableUtils.js';
import { updateMode } from "./parameterUtils.js";


// Функция для обновления значений и применения анимации
export const updateValueAndAnimate = (value, param) => {
  const paramSpan = param.nextElementSibling;
  const firstSkolzValue = parseFloat(document.querySelector('.temper-1-skolz').textContent.trim());
  value = parseFloat(value);
  applyAnimation(
    value,
    param,
    paramSpan,
    parseFloat(param.dataset.conditionMin),
    parseFloat(param.dataset.conditionMax),
    firstSkolzValue
  );
  updateMode();
};

// Функция для применения анимации и добавления/удаления строки в таблице
export const applyAnimation = (value, param, paramSpan, conditionMin, conditionMax, firstSkolzValue) => {
  value = parseFloat(value);
  if (firstSkolzValue < 50 || value < 50 || (value >= conditionMin && value <= conditionMax)) {
    param.style.animation = 'colorGreen 1s forwards';
    if (paramSpan) paramSpan.style.animation = 'colorGreen 1s forwards';
    removeRowIfExists(param.dataset.description);
    return true;
  } else {
    param.style.animation = 'colorRed 0.5s infinite ease-in-out';
    if (paramSpan) paramSpan.style.animation = 'colorRed 0.5s infinite ease-in-out';
    addOrUpdateRow(param, param.dataset.description);
    return false;
  }
};
