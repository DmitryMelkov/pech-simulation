export const modalParamIncorrect = () => {
  // Обработчик кликов по строкам таблицы и модальным окнам с использованием делегирования событий
  document.addEventListener('click', (event) => {
    // Обработчик для кликов по строкам таблицы
    const row = event.target.closest('.table__tr--incorrect-param-js');
    if (row) {
      const dataModalClass = row.getAttribute('data-modal');
      const modalParamIncorrect = document.querySelector(`.${dataModalClass}`);
      const modalParamBgIncorrect = modalParamIncorrect.closest('.modal-param-bg-js');

      if (modalParamIncorrect && modalParamBgIncorrect) {
        modalParamIncorrect.classList.add('enabled');
        modalParamBgIncorrect.classList.add('enabled');
      }
      return;
    }

    // Обработчик для закрытия модальных окон по клику на кнопке закрытия
    if (event.target.closest('.modal-param-close-js')) {
      const modalParamIncorrect = event.target.closest('.modal-param-js');
      const modalParamBgIncorrect = modalParamIncorrect.closest('.modal-param-bg-js');

      if (modalParamIncorrect && modalParamBgIncorrect) {
        modalParamIncorrect.classList.remove('enabled');
        modalParamBgIncorrect.classList.remove('enabled');
      }
      return;
    }

    // Обработчик для закрытия модальных окон по клику на фон
    if (event.target.classList.contains('modal-param-bg-js')) {
      const modalParamIncorrect = event.target.querySelector('.modal-param-js.enabled');
      if (modalParamIncorrect) {
        modalParamIncorrect.classList.remove('enabled');
        event.target.classList.remove('enabled');
      }
    }
  });
};
