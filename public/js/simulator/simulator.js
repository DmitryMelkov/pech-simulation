import { tooltipVisible } from './components/tooltipUtils.js';
import { syncInputsAndSpan } from './components/parameterUtils.js';
import { setupModalEvents } from './components/modalUtils.js';
import { modalParamIncorrect } from './components/modalParamIncorrect.js';

// Инициализация параметров с описанием
const firstSkolz = document.querySelector('.temper-1-skolz');
firstSkolz.dataset.description = 'Температура на 1 скользящей';
firstSkolz.dataset.conditionMin = 550;
firstSkolz.dataset.conditionMax = 800;
const firstSkolzClick = document.querySelector('.first-skolz-js');
const firstSkolzClue = document.querySelector('.first-skolz-clue');
const firstSkolzClose = document.querySelector('.first-skolz-clue-close');
const firstSkolzInput = document.querySelector('#firstSkolzInput');
const firstSkolzForm = document.querySelector('.mnemo__param-clue-form--first-skolz-clue');
const resultSpan = document.querySelector('.current-param__subtitle-span');


const secondSkolz = document.querySelector('.temper-2-skolz');
secondSkolz.dataset.description = 'Температура на 2 скользящей';
secondSkolz.dataset.conditionMin = 0;
secondSkolz.dataset.conditionMax = 700;
const secondSkolzClick = document.querySelector('.second-skolz-js');
const secondSkolzClue = document.querySelector('.second-skolz-clue');
const secondSkolzClose = document.querySelector('.second-skolz-clue-close');
const secondSkolzInput = document.querySelector('#secondSkolzInput');
const secondSkolzForm = document.querySelector('.mnemo__param-clue-form--second-skolz-clue');


const thirdSkolz = document.querySelector('.temper-3-skolz');
thirdSkolz.dataset.description = 'Температура на 3 скользящей';
thirdSkolz.dataset.conditionMin = 400; // Новое значение для установившегося режима
thirdSkolz.dataset.conditionMax = 750; // Новое значение для выхода на режим
const thirdSkolzClick = document.querySelector('.third-skolz-js');
const thirdSkolzClue = document.querySelector('.third-skolz-clue');
const thirdSkolzClose = document.querySelector('.third-skolz-clue-close');
const thirdSkolzInput = document.querySelector('#thirdSkolzInput');
const thirdSkolzForm = document.querySelector('.mnemo__param-clue-form--third-skolz-clue');


const temperVTopke = document.querySelector('.temper-topka');
temperVTopke.dataset.description = 'Температура в топке';
temperVTopke.dataset.conditionMin = 0;
temperVTopke.dataset.conditionMax = 1000;
const temperVTopkeClick = document.querySelector('.temper-v-topke-js');
const temperVTopkeClue = document.querySelector('.temper-v-topke-clue');
const temperVTopkeClose = document.querySelector('.temper-v-topke-clue-close');
const temperVTopkeInput = document.querySelector('#temperVTopkeInput');
const temperVTopkeForm = document.querySelector('.mnemo__param-clue-form--temper-v-topke-clue');

const temperKamerVygruz = document.querySelector('.temper-kamer-vygruz')
temperKamerVygruz.dataset.description = 'Температура камеры выгрузки';
temperKamerVygruz.dataset.conditionMin = 0;
temperKamerVygruz.dataset.conditionMax = 750;
const temperKamerVygruzClick = document.querySelector('.temper-kamer-vygruz-js');
const temperKamerVygruzClue = document.querySelector('.temper-kamer-vygruz-clue');
const temperKamerVygruzClose = document.querySelector('.temper-kamer-vygruz-clue-close');
const temperKamerVygruzInput = document.querySelector('#temperKamerVygruzInput');
const temperKamerVygruzForm = document.querySelector('.mnemo__param-clue-form--temper-kamer-vygruz-clue');

const temperVerhKamerZagruz = document.querySelector('.temper-verh-kamer-zagruz')
temperVerhKamerZagruz.dataset.description = 'Температура вверху камеры загрузки';
temperVerhKamerZagruz.dataset.conditionMin = 0;
temperVerhKamerZagruz.dataset.conditionMax = 1000;
const temperVerhKamerZagruzClick = document.querySelector('.verh-kamery-zagruzki-js');
const temperVerhKamerZagruzClue = document.querySelector('.verh-kamery-zagruzki-clue');
const temperVerhKamerZagruzClose = document.querySelector('.verh-kamery-zagruzki-clue-close');
const temperVerhKamerZagruzInput = document.querySelector('#verhKameryZagruzInput');
const temperVerhKamerZagruzForm = document.querySelector('.mnemo__param-clue-form--verh-kamery-zagruzki-clue');

const temperVnizKamerZagruz = document.querySelector('.temper-vniz-kamer-zagruz')
temperVnizKamerZagruz.dataset.description = 'Температура внизу камеры загрузки';
temperVnizKamerZagruz.dataset.conditionMin = 0;
temperVnizKamerZagruz.dataset.conditionMax = 1100;
const temperVnizKamerZagruzClick = document.querySelector('.vniz-kamery-zagruzki-js');
const temperVnizKamerZagruzClue = document.querySelector('.vniz-kamery-zagruzki-clue');
const temperVnizKamerZagruzClose = document.querySelector('.vniz-kamery-zagruzki-clue-close');
const temperVnizKamerZagruzInput = document.querySelector('#vnizKameryZagruzInput');
const temperVnizKamerZagruzForm = document.querySelector('.mnemo__param-clue-form--vniz-kamery-zagruzki-clue');

const davlVbarabane = document.querySelector('.davl-v-barabane');
davlVbarabane.dataset.description = 'Давление в барабане котла';
davlVbarabane.dataset.conditionMin = 0;
davlVbarabane.dataset.conditionMax = 10;
const davlVbarabaneClick = document.querySelector('.davl-v-barabane-js');
const davlVbarabaneClue = document.querySelector('.p-v-barabane-clue');
const davlVbarabaneClose = document.querySelector('.p-v-barabane-clue-close')
const davlVbarabaneInput = document.querySelector('#pVbarabaneInput');
const davlVbarabaneForm = document.querySelector('.mnemo__param-clue-form--p-v-barabane-clue');

const razrezhVtopke = document.querySelector('.razrezh-topka');
razrezhVtopke.dataset.description = 'Разрежение в топке печи'
razrezhVtopke.dataset.conditionMin = -4;
razrezhVtopke.dataset.conditionMax = -1;
const razrezhVtopkeClick = document.querySelector('.razrezh-v-topke-js');
const razrezhVtopkeClue = document.querySelector('.razrezh-v-topke-clue');
const razrezhVtopkeClose = document.querySelector('.razrezh-v-topke-clue-close')
const razrezhVtopkeInput = document.querySelector('#razrezhVtopkeInput');
const razrezhVtopkeForm = document.querySelector('.mnemo__param-clue-form--razrezh-v-topke-clue');

const urovenVkotle = document.querySelector('.uroven-v-kotle');
urovenVkotle.dataset.description = 'Уровень в котле'
urovenVkotle.dataset.conditionMin = -80;
urovenVkotle.dataset.conditionMax = 80;
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
  temperVTopkeClick,
  temperVTopkeClue,
  temperVTopkeClose,
  temperVTopkeInput,
  temperVTopke,
  temperVTopkeForm,
  false,
  null,
  0,
  1500
);

tooltipVisible(
  temperKamerVygruzClick,
  temperKamerVygruzClue,
  temperKamerVygruzClose,
  temperKamerVygruzInput,
  temperKamerVygruz,
  temperKamerVygruzForm,
  false,
  null,
  0,
  1500
)

tooltipVisible(
  temperVerhKamerZagruzClick,
  temperVerhKamerZagruzClue,
  temperVerhKamerZagruzClose,
  temperVerhKamerZagruzInput,
  temperVerhKamerZagruz,
  temperVerhKamerZagruzForm,
  false,
  null,
  0,
  1500
)

tooltipVisible(
  temperVnizKamerZagruzClick,
  temperVnizKamerZagruzClue,
  temperVnizKamerZagruzClose,
  temperVnizKamerZagruzInput,
  temperVnizKamerZagruz,
  temperVnizKamerZagruzForm,
  false,
  null,
  0,
  1500
)

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
const modalInputTemperVTopke = document.querySelector('#temperVTopkeInputModal');
const modalInputKamerVygruz = document.querySelector('#temperKamerVygruzInputModal')
const modalInputVerhKamerZagruz = document.querySelector('#temperVerhKamerZagruzInputModal')
const modalInputVnizKamerZagruz = document.querySelector('#temperVnizKamerZagruzInputModal')
const modalInputDavlVBarabane = document.querySelector('#pVbarabaneInputModal');
const modalInputRazrezhVtopke = document.querySelector('#razrezhVtopkeInputModal');
const modalInputUrovenVkotle = document.querySelector('#urovenVkotleInputModal');


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
  1500
);

tooltipVisible(
  temperVTopkeClick,
  temperVTopkeClue,
  temperVTopkeClose,
  modalInputTemperVTopke,
  temperVTopke,
  modalForm,
  false,
  null,
  0,
  1500 
);


tooltipVisible(
  temperKamerVygruzClick,
  temperKamerVygruzClue,
  temperKamerVygruzClose,
  modalInputKamerVygruz,
  temperKamerVygruz,
  modalForm,
  false,
  null,
  0,
  1500
)

tooltipVisible(
  temperVerhKamerZagruzClick,
  temperVerhKamerZagruzClue,
  temperVerhKamerZagruzClose,
  modalInputVerhKamerZagruz,
  temperVerhKamerZagruz,
  modalForm,
  false,
  null,
  0,
  1500
)

tooltipVisible(
  temperVnizKamerZagruzClick,
  temperVnizKamerZagruzClue,
  temperVnizKamerZagruzClose,
  modalInputVnizKamerZagruz,
  temperVnizKamerZagruz,
  modalForm,
  false,
  null,
  0,
  1500
)

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
