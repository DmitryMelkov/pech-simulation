const modalElements = {
  btnModal: document.querySelector('.btn-modal--reference'),
  modalBackground: document.querySelector('.modal-reference-bg-js'),
  modalActive: document.querySelector('.modal-reference-js'),
  btnClose: document.querySelector('.modal-reference-close-js'),
};

const toggleModal = (action) => {
  modalElements.modalBackground.classList[action]('enabled');
  modalElements.modalActive.classList[action]('enabled');
};

modalElements.btnModal.addEventListener('click', () => toggleModal('add'));

modalElements.modalBackground.addEventListener('click', (event) => {
  if (event.target === modalElements.modalBackground) {
    toggleModal('remove');
  }
});

modalElements.btnClose.addEventListener('click', () => toggleModal('remove'));
