// public/js/modules/modal.js

export const openModal = (background, content) => {
  background.classList.add('enabled');
  content.classList.add('enabled');
};

export const closeModal = (background, content) => {
  background.classList.remove('enabled');
  content.classList.remove('enabled');
  location.reload();
};

export const setupModalCloseEvents = (closeButton, background, closeModalFunction) => {
  closeButton.addEventListener('click', closeModalFunction);
  background.addEventListener('click', (event) => {
    if (event.target === background) {
      closeModalFunction();
    }
  });
};
