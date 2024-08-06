import { tooltipVisible } from './tooltipUtils.js';
import { syncInputsAndSpan } from './parameterUtils.js';
import { setupModalEvents } from './modalUtils.js';
import { modalParamIncorrect } from './modalParamIncorrect.js';

// Инициализация параметров с описанием
const firstSkolz = document.querySelector('.temper-1-skolz');
firstSkolz.dataset.description = 'Температура на 1 скользящей';
firstSkolz.dataset.conditionMin = 550;
firstSkolz.dataset.conditionMax = 800;
const secondSkolz = document.querySelector('.temper-2-skolz');
secondSkolz.dataset.description = 'Температура на 2 скользящей';
secondSkolz.dataset.conditionMin = 0;
secondSkolz.dataset.conditionMax = 700;
const thirdSkolz = document.querySelector('.temper-3-skolz');
thirdSkolz.dataset.description = 'Температура на 3 скользящей';
thirdSkolz.dataset.conditionMin = 400; // Новое значение для установившегося режима
thirdSkolz.dataset.conditionMax = 750; // Новое значение для выхода на режим
const davlVbarabane = document.querySelector('.davl-v-barabane');
secondSkolz.dataset.description = 'Давление в барабане котла';
secondSkolz.dataset.conditionMin = 0;
secondSkolz.dataset.conditionMax = 5.5;



const firstSkolzClick = document.querySelector('.first-skolz-js');
const firstSkolzClue = document.querySelector('.first-skolz-clue');
const firstSkolzClose = document.querySelector('.first-skolz-clue-close');
const firstSkolzInput = document.querySelector('#firstSkolzInput');
const firstSkolzForm = document.querySelector('.mnemo__param-clue-form--first-skolz-clue');
const resultSpan = document.querySelector('.current-param__subtitle-span');

const secondSkolzClick = document.querySelector('.second-skolz-js');
const secondSkolzClue = document.querySelector('.second-skolz-clue');
const secondSkolzClose = document.querySelector('.second-skolz-clue-close');
const secondSkolzInput = document.querySelector('#secondSkolzInput');
const secondSkolzForm = document.querySelector('.mnemo__param-clue-form--second-skolz-clue');

const thirdSkolzClick = document.querySelector('.third-skolz-js');
const thirdSkolzClue = document.querySelector('.third-skolz-clue');
const thirdSkolzClose = document.querySelector('.third-skolz-clue-close');
const thirdSkolzInput = document.querySelector('#thirdSkolzInput');
const thirdSkolzForm = document.querySelector('.mnemo__param-clue-form--third-skolz-clue');

const pVbarabaneClick = document.querySelector('.davl-v-barabane-js');
const pVbarabaneClue = document.querySelector('.p-v-barabane-clue');
const pVbarabaneClose = document.querySelector('.p-v-barabane-clue-close');
const pVbarabaneInput = document.querySelector('#pVbarabaneInput');
const pVbarabaneForm = document.querySelector('.mnemo__param-clue-form--p-v-barabane-clue');

// Фунеции для инпутов в мнемосхеме
tooltipVisible(
  firstSkolzClick,
  firstSkolzClue,
  firstSkolzClose,
  firstSkolzInput,
  firstSkolz,
  firstSkolzForm,
  true,
  resultSpan,
  0,
  1500
);
tooltipVisible(
  secondSkolzClick,
  secondSkolzClue,
  secondSkolzClose,
  secondSkolzInput,
  secondSkolz,
  secondSkolzForm,
  false,
  null,
  0,
  1500
);
tooltipVisible(
  thirdSkolzClick,
  thirdSkolzClue,
  thirdSkolzClose,
  thirdSkolzInput,
  thirdSkolz,
  thirdSkolzForm,
  false,
  null,
  0,
  1500
);
tooltipVisible(
  pVbarabaneClick,
  pVbarabaneClue,
  pVbarabaneClose,
  pVbarabaneInput,
  davlVbarabane,
  pVbarabaneForm,
  false,
  null,
  0,
  20
);

// Функции для инпутов в модалке
const btnModal = document.querySelector('.btn-modal');
const modalBackground = document.querySelector('.modal-js');
const modalActive = document.querySelector('.mnemo__modal-start');
const btnAccept = document.querySelector('.modal-content__form-btn--ok');
const btnClose = document.querySelector('.mnemo__modal-close');

const modalForm = document.querySelector('.all__param-form');
const modalInputFirstSkolz = document.querySelector('#firstSkolzInputModal');
const modalInputSecondSkolz = document.querySelector('#secondSkolzInputModal');
const modalInputThirdSkolz = document.querySelector('#thirdSkolzInputModal');

tooltipVisible(
  firstSkolzClick,
  firstSkolzClue,
  firstSkolzClose,
  modalInputFirstSkolz,
  firstSkolz,
  modalForm,
  true,
  resultSpan,
  0,
  1500
);
tooltipVisible(
  secondSkolzClick,
  secondSkolzClue,
  secondSkolzClose,
  modalInputSecondSkolz,
  secondSkolz,
  modalForm,
  false,
  null,
  0,
  1500
);
tooltipVisible(
  thirdSkolzClick,
  thirdSkolzClue,
  thirdSkolzClose,
  modalInputThirdSkolz,
  thirdSkolz,
  modalForm,
  false,
  null,
  0,
  1500 // Обновленный диапазон для выхода на режим
);

// Инициализация синхронизации инпутов и span
syncInputsAndSpan();

// Настройка модального окна
setupModalEvents(btnModal, modalBackground, modalActive, btnAccept, btnClose);

modalParamIncorrect();
