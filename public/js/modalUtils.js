// Функция для проверки значений инпутов и применения стилей ошибок в модалке
export const validateInputs = (inputs) => {
  let allValid = true;

  inputs.forEach((input) => {
    const errorElement = input.nextElementSibling;
    const value = input.value.trim();
    const inputType = input.dataset.type; 
    if (value === '') {
      input.classList.add('error');
      if (errorElement) {
        errorElement.classList.add('active');
        errorElement.textContent = 'Введите значение'; 
      }
      allValid = false;
    } else {
      let isValid = true;
      if (isNaN(value)) {
        isValid = false;
      } else {
        const numericValue = parseFloat(value);
        if (inputType === 'temperature' && (numericValue < 0 || numericValue > 1500)) {
          isValid = false;
        } else if (inputType === 'pressure' && (numericValue < 0 || numericValue > 20)) {
          isValid = false;
        }
      }
      
      if (!isValid) {
        input.classList.add('error');
        if (errorElement) {
          errorElement.classList.add('active');
          errorElement.textContent = inputType === 'temperature' ? 'Диапазон от 0 до 1500' : 'Диапазон от 0 до 20'; // Error message based on input type
        }
        allValid = false;
      } else {
        input.classList.remove('error');
        if (errorElement) {
          errorElement.classList.remove('active');
          errorElement.textContent = '';
        }
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
      document.querySelector('#pVbarabaneInputModal')
    ];

    if (validateInputs(inputs)) {
      modalBackground.classList.remove('enabled');
      modalActive.classList.remove('enabled');
    }
  });
};