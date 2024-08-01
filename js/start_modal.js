const btnModal = document.querySelector('.btn-modal')
const modalBackground = document.querySelector('.modal-js')
const modalActive = document.querySelector('.mnemo__modal-start')


btnModal.addEventListener('click', () => {
  modalBackground.classList.add('enabled');
  modalActive.classList.add('enabled');
});

modalBackground.addEventListener('click', (event) => {
  if (event.target === modalBackground) {
    modalBackground.classList.remove('enabled');
    modalActive.classList.remove('enabled');
  }
});

// Функция для обработки параметров в модальном окне начальных условий

const modalSuccess = ()
