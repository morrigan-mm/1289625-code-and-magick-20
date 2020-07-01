'use strict';

(function () {
  var WIZARDS_COUNT = 4;
  // var WIZARDS = window.mock.createCharactersArr(WIZARDS_COUNT);

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
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var onLoad = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);

    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; height: 5%; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoad, onError);

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

  var form = setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), window.dialog.closePopup, onError);
  });
})();
