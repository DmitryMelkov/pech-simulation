export const levelObj = (minScale, maxScale, current, maxSize, level, levelPercent) => {
  // Вычисляем общий диапазон шкалы
  let totalScale = maxScale - minScale;

  // Вычисляем, как далеко значение от минимального
  let valueFromMin = current - minScale;

  // Вычисляем процентное соотношение
  let percentage = (valueFromMin / totalScale) * 100;

  //переводим в px
  let px = (maxSize * percentage) / 100;
  levelPercent.innerHTML = parseFloat(percentage.toFixed(0)) ;

  //красим контейнер
  level.style.height = `${px}px`;
};