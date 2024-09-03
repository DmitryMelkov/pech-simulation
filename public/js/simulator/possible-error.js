const subtitles = document.querySelectorAll('.troubleshooting__subtitle');
const sections = document.querySelectorAll('.troubleshooting__sections');

subtitles.forEach((subtitle) => {
  subtitle.addEventListener('click', () => {
    const isActive = subtitle.classList.contains('active');
    subtitles.forEach((item) => item.classList.remove('active'));
    sections.forEach((section) => section.classList.remove('active'));
    if (!isActive) {
      subtitle.classList.add('active');
      const section = subtitle.nextElementSibling;
      if (section) {
        section.classList.add('active');
      }
    }
  });
});
