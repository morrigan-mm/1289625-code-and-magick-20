'use strict';

(function () {
  var WIZARDS_AMOUNT = 4;
  var WIZARDS = window.mock.createCharactersArr(WIZARDS_AMOUNT);

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var setup = document.querySelector('.setup');
  var userNameInput = setup.querySelector('.setup-user-name');
  var setupWizard = setup.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var fireballWrap = setup.querySelector('.setup-fireball-wrap');
  var fireball = setup.querySelector('.setup-fireball');

  var minNameLength = userNameInput.minLength;
  var maxNameLength = userNameInput.maxLength;

  var onColorTargetClick = function (evt) {
    var color;
    switch (evt.target) {
      case wizardCoat:
        color = window.colors.getRandomColor('coat');
        evt.target.style.fill = color;
        setup.querySelector('input[name="coat-color"]').value = color;
        return;
      case wizardEyes:
        color = window.colors.getRandomColor('eyes');
        evt.target.style.fill = color;
        setup.querySelector('input[name="eyes-color"]').value = color;
        return;
      case fireball:
        color = window.colors.getRandomColor('fireball');
        fireballWrap.style.background = color;
        fireballWrap.querySelector('input[name="fireball-color"]').value = color;
        return;
    }
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    return fragment;
  };

  setup.addEventListener('click', onColorTargetClick);

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

  similarListElement.appendChild(renderWizards(WIZARDS));

  document.querySelector('.setup-similar').classList.remove('hidden');
})();
