// Функция для проверки значений инпутов и применения стилей ошибок
export const validateInputs = (inputs) => {
  let allValid = true;

  inputs.forEach((input) => {
    const errorElement = input.nextElementSibling;
    const value = input.value.trim();

    // Проверка на пустое значение
    if (value === '') {
      input.classList.add('error');
      if (errorElement) {
        errorElement.classList.add('active');
        errorElement.textContent = 'Введите значение'; // Сообщение об ошибке для пустого значения
      }
      allValid = false;
    } else if (isNaN(value) || value < 0 || value > 1500) {
      // Проверка на диапазон значений
      input.classList.add('error');
      if (errorElement) {
        errorElement.classList.add('active');
        errorElement.textContent = 'Диапазон от 0 до 1500'; // Сообщение об ошибке для значения вне диапазона
      }
      allValid = false;
    } else {
      input.classList.remove('error');
      if (errorElement) {
        errorElement.classList.remove('active');
        errorElement.textContent = ''; // Очистка сообщения об ошибке
      }
    }
  });

  return allValid;
};

// Обработчики событий для модального окна
export const setupModalEvents = (btnModal, modalBackground, modalActive, btnAccept, btnClose) => {
  const closeTooltips = () => {
    const tooltips = document.querySelectorAll('.mnemo__param-clue');
    tooltips.forEach((tooltip) => {
      tooltip.classList.remove('enabled');
      tooltip.parentElement.classList.remove('active');
    });
  };

  btnModal.addEventListener('click', () => {
    closeTooltips(); // Закрыть тултипы перед открытием модального окна
    modalBackground.classList.add('enabled');
    modalActive.classList.add('enabled');
  });

  modalBackground.addEventListener('click', (event) => {
    if (event.target === modalBackground) {
      modalBackground.classList.remove('enabled');
      modalActive.classList.remove('enabled');
    }
  });

  btnClose.addEventListener('click', () => {
    modalBackground.classList.remove('enabled');
    modalActive.classList.remove('enabled');
  });

  btnAccept.addEventListener('click', () => {
    const inputs = [
      document.querySelector('#firstSkolzInputModal'),
      document.querySelector('#secondSkolzInputModal'),
      document.querySelector('#thirdSkolzInputModal'),
    ];

    if (validateInputs(inputs)) {
      modalBackground.classList.remove('enabled');
      modalActive.classList.remove('enabled');
    }
  });
};