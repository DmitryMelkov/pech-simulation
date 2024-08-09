import { tooltipVisible } from './components/tooltipUtils.js';
import { syncInputsAndSpan } from './components/parameterUtils.js';
import { setupModalEvents } from './components/modalUtils.js';
import { modalParamIncorrect } from './components/modalParamIncorrect.js';

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
davlVbarabane.dataset.description = 'Давление в барабане котла';
davlVbarabane.dataset.conditionMin = 0;
davlVbarabane.dataset.conditionMax = 10;
const razrezhVtopke = document.querySelector('.razrezh-topka');
razrezhVtopke.dataset.description = 'Разрежение в топке печи'
razrezhVtopke.dataset.conditionMin = -4;
razrezhVtopke.dataset.conditionMax = -1;
const urovenVkotle = document.querySelector('.uroven-v-kotle');
urovenVkotle.dataset.description = 'Уровень в котле'
urovenVkotle.dataset.conditionMin = -80;
urovenVkotle.dataset.conditionMax = 80;


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

const davlVbarabaneClick = document.querySelector('.davl-v-barabane-js');
const davlVbarabaneClue = document.querySelector('.p-v-barabane-clue');
const davlVbarabaneClose = document.querySelector('.p-v-barabane-clue-close')
const davlVbarabaneInput = document.querySelector('#pVbarabaneInput');
const davlVbarabaneForm = document.querySelector('.mnemo__param-clue-form--p-v-barabane-clue');

const razrezhVtopkeClick = document.querySelector('.razrezh-v-topke-js');
const razrezhVtopkeClue = document.querySelector('.razrezh-v-topke-clue');
const razrezhVtopkeClose = document.querySelector('.razrezh-v-topke-clue-close')
const razrezhVtopkeInput = document.querySelector('#razrezhVtopkeInput');
const razrezhVtopkeForm = document.querySelector('.mnemo__param-clue-form--razrezh-v-topke-clue');

const urovenVkotleClick = document.querySelector('.uroven-v-kotle-js');
const urovenVkotleClue = document.querySelector('.uroven-v-kotle-clue');
const urovenVkotleClose = document.querySelector('.uroven-v-kotle-clue-close')
const urovenVkotleInput = document.querySelector('#urovenVkotleInput');
const urovenVkotleForm = document.querySelector('.mnemo__param-clue-form--uroven-v-kotle-clue');

// Функции для инпутов в мнемосхеме
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
  davlVbarabaneClick,
  davlVbarabaneClue,
  davlVbarabaneClose,
  davlVbarabaneInput,
  davlVbarabane,
  davlVbarabaneForm,
  false,
  null,
  0,
  20
);
tooltipVisible(
  razrezhVtopkeClick,
  razrezhVtopkeClue,
  razrezhVtopkeClose,
  razrezhVtopkeInput,
  razrezhVtopke,
  razrezhVtopkeForm,
  false,
  null,
  -10,
  0
);
tooltipVisible(
  urovenVkotleClick,
  urovenVkotleClue,
  urovenVkotleClose,
  urovenVkotleInput,
  urovenVkotle,
  urovenVkotleForm,
  false,
  null,
  -200,
  200
);



// Функции для инпутов в модалке
const btnModal = document.querySelector('.btn-modal--initial-conditions');
const modalBackground = document.querySelector('.modal-js');
const modalActive = document.querySelector('.mnemo__modal-start');
const btnAccept = document.querySelector('.modal-content__form-btn--ok');
const btnClose = document.querySelector('.mnemo__modal-close');

const modalForm = document.querySelector('.all__param-form');
const modalInputFirstSkolz = document.querySelector('#firstSkolzInputModal');
const modalInputSecondSkolz = document.querySelector('#secondSkolzInputModal');
const modalInputThirdSkolz = document.querySelector('#thirdSkolzInputModal');
const modalInputDavlVBarabane = document.querySelector('#pVbarabaneInputModal');
const modalInputRazrezhVtopke = document.querySelector('#razrezhVtopkeInputModal');
const modalInputUrovenVkotle = document.querySelector('#urovenVkotleInputModal')

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
tooltipVisible(
  davlVbarabaneClick,
  davlVbarabaneClue,
  davlVbarabaneClose,
  modalInputDavlVBarabane,
  davlVbarabane,
  modalForm,
  false,
  null,
  0,
  20
);
tooltipVisible(
  razrezhVtopkeClick,
  razrezhVtopkeClue,
  razrezhVtopkeClose,
  modalInputRazrezhVtopke,
  razrezhVtopke,
  modalForm,
  false,
  null,
  -10,
  0
);
tooltipVisible(
  urovenVkotleClick,
  urovenVkotleClue,
  urovenVkotleClose,
  modalInputUrovenVkotle,
  urovenVkotle,
  modalForm,
  false,
  null,
  -200,
  200
);


// Инициализация синхронизации инпутов и span
syncInputsAndSpan();

// Настройка модального окна
setupModalEvents(btnModal, modalBackground, modalActive, btnAccept, btnClose);

modalParamIncorrect();
