import { addOrUpdateRow, removeRowIfExists } from './tableUtils.js';
import { updateMode } from "./parameterUtils.js";
import { levelObj } from './level.js';


// Функция для обновления значений и применения анимации
export const updateValueAndAnimate = (value, param) => {
  const paramSpan = param.nextElementSibling;
  const firstSkolzValue = parseFloat(document.querySelector('.temper-1-skolz').textContent.trim());
  value = parseFloat(value);
  
  const conditionMin = parseFloat(param.dataset.conditionMin);
  const conditionMax = parseFloat(param.dataset.conditionMax);
  
  applyAnimation(value, param, paramSpan, conditionMin, conditionMax, firstSkolzValue);
  updateMode();
};

// Функция для применения анимации и добавления/удаления строки в таблице
export const applyAnimation = (value, param, paramSpan, conditionMin, conditionMax, firstSkolzValue) => {
  value = parseFloat(value);
  if (firstSkolzValue < 50 || (value >= conditionMin && value <= conditionMax)) {
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

// Функция для применения анимации к уровню
export const updateLevelAnimation = (
  value,
  conditionMin,
  conditionMax,
  levelElement,
  levelPercentElement,
  firstSkolzValue,
  minScale,
  maxScale,
  maxSizeWide,
  maxSizeSquare
) => {
  const levelValue = parseFloat(value);
  let screenWidth = window.innerWidth;
  const maxSize = screenWidth < 1568 ? maxSizeSquare : maxSizeWide;

  levelObj(minScale, maxScale, levelValue, maxSize, levelElement, levelPercentElement);

  if (firstSkolzValue < 50 || (levelValue >= conditionMin && levelValue <= conditionMax)) {
    levelElement.style.backgroundColor = '#00bfff';
    levelElement.classList.remove('blink');
    return true;
  } else {
    levelElement.style.backgroundColor = '';
    levelElement.classList.add('blink');
    return false;
  }
};