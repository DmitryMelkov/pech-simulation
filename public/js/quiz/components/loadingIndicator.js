// public/js/modules/loadingIndicator.js

export const showLoadingIndicator = (indicator) => {
  indicator.classList.add('active');
};

export const hideLoadingIndicator = (indicator) => {
  setTimeout(() => {
    indicator.classList.remove('active');
  }, 1000);
};
