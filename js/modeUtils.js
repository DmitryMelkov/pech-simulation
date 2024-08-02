// Функция для определения режима

export const determineMode = (value) => {
  if (value >= 50 && value < 550) {
    return 'Выход на режим';
  } else if (value >= 550) {
    return 'Установившийся режим';
  } else if (value >= 0 && value < 50) {
    return 'Печь не работает';
  } else {
    return 'Не определено';
  }
};
