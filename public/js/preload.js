

document.addEventListener('DOMContentLoaded', () => {
  const loadingIndicator = document.getElementById('loadingIndicator');
  const content = document.querySelector('.content');

  // Скрыть прелоудер и показать содержимое после полной загрузки страницы
  window.addEventListener('load', () => {
    loadingIndicator.classList.remove('active');
    content.classList.remove('active');
  });

  // Показать прелоудер при переходе на другую страницу
  const links = document.querySelectorAll('a.mnemo__modal-box--link');
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      loadingIndicator.classList.add('active');
      content.classList.add('active');
      setTimeout(() => {
        window.location.href = link.href;
      }, 500);
    });
  });
});