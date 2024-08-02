// Функция для проверки значений инпутов и применения стилей ошибок
export const validateInputs = (inputs) => {
  let allValid = true;

  inputs.forEach((input) => {
    const errorElement = input.nextElementSibling;
    if (input.value.trim() === '') {
      input.classList.add('error');
      if (errorElement) {
        errorElement.classList.add('active');
      }
      allValid = false;
    } else {
      input.classList.remove('error');
      if (errorElement) {
        errorElement.classList.remove('active');
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