'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');

var onDocumentKeydown = function (evt) {
  if (evt.key === 'Escape' && document.activeElement !== userNameInput) {
    evt.preventDefault();
    closePopup();
  }
};

var onSetupOpenInteract = function (evt) {
  if (evt.type === 'click' || evt.key === 'Enter') {
    openPopup();
  }
};

var onSetupCloseInteract = function (evt) {
  if (evt.type === 'click' || evt.key === 'Enter') {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

setupOpen.addEventListener('click', onSetupOpenInteract);
setupOpen.addEventListener('keydown', onSetupOpenInteract);

setupClose.addEventListener('click', onSetupCloseInteract);
setupClose.addEventListener('keydown', onSetupCloseInteract);

var minNameLength = userNameInput.minLength;
var maxNameLength = userNameInput.maxLength;

userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;
  if (valueLength < minNameLength) {
    userNameInput.setCustomValidity('Ещё ' + (minNameLength - valueLength) + ' симв.');
  } else if (valueLength > maxNameLength) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - maxNameLength) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var setupWizard = setup.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var fireballWrap = setup.querySelector('.setup-fireball-wrap');
var fireball = setup.querySelector('.setup-fireball');

var onColorTargetClick = function (evt) {
  var color;
  switch (evt.target) {
    case wizardCoat:
      color = getRandomElement(COAT_COLORS);
      evt.target.style.fill = color;
      setup.querySelector('input[name="coat-color"]').value = color;
      return;
    case wizardEyes:
      color = getRandomElement(EYES_COLORS);
      evt.target.style.fill = color;
      setup.querySelector('input[name="eyes-color"]').value = color;
      return;
    case fireball:
      color = getRandomElement(FIREBALL_COLORS);
      fireballWrap.style.background = color;
      fireballWrap.querySelector('input[name="fireball-color"]').value = color;
      return;
  }
};

setup.addEventListener('click', onColorTargetClick);

var getRandomIndex = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (arr) {
  var index = getRandomIndex(0, arr.length - 1);
  return arr[index];
};

var createCharacter = function () {
  return {
    name: getRandomElement(NAMES) + ' ' + getRandomElement(SECOND_NAMES),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
  };
};

var createCharactersArr = function (length) {
  return new Array(length).fill(null).map(function () {
    return createCharacter();
  });
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (length) {
  var wizards = createCharactersArr(length);
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  return fragment;
};

similarListElement.appendChild(renderWizards(4));
document.querySelector('.setup-similar').classList.remove('hidden');
