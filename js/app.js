const tooltipVisible = (paramClick, paramClue, close, paramInput, param, form) => {
  paramClick.addEventListener('click', () => {
    const allClues = document.querySelectorAll('.mnemo__param-clue');
    allClues.forEach((clue) => {
      clue.classList.remove('enabled');
      const parentElement = clue.parentElement;
      parentElement.classList.remove('active');
    });

    paramClue.classList.add('enabled');
    const parentElement = paramClue.parentElement;
    parentElement.classList.add('active');
  });
  close.addEventListener('click', () => {
    paramClue.classList.remove('enabled');
    const parentElement = paramClue.parentElement;
    parentElement.classList.remove('active');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = paramInput.value;
    param.textContent = value;

    paramClue.classList.remove('enabled');
    const parentElement = paramClue.parentElement;
    parentElement.classList.remove('active');
  });
};


const firstSkolzClue = document.querySelector('.first-skolz-clue');
const firstSkolzClick = document.querySelector('.first-skolz-js');
const firstSkolzClose = document.querySelector('.first-skolz-clue-close');
const firstSkolzInput = document.querySelector('#firstSkolzInput');
const firstSkolz = document.querySelector('.temper-1-skolz');
const firstSkolzForm = document.querySelector('.mnemo__param-clue-form--first-skolz-clue');

tooltipVisible(firstSkolzClick, firstSkolzClue, firstSkolzClose, firstSkolzInput, firstSkolz, firstSkolzForm);

const secondSkolzClick = document.querySelector('.second-skolz-js');
const secondSkolzClue = document.querySelector('.second-skolz-clue');
const secondSkolzClose = document.querySelector('.second-skolz-clue-close');
const secondSkolzInput = document.querySelector('#secondSkolzInput');
const secondSkolz = document.querySelector('.temper-2-skolz');
const secondSkolzForm = document.querySelector('.mnemo__param-clue-form--second-skolz-clue');

tooltipVisible(secondSkolzClick, secondSkolzClue, secondSkolzClose, secondSkolzInput, secondSkolz, secondSkolzForm);


