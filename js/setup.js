'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var userNameInput = setup.querySelector('.setup-user-name');
  var setupWizard = setup.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var fireballWrap = setup.querySelector('.setup-fireball-wrap');
  var fireball = setup.querySelector('.setup-fireball');

  var minNameLength = userNameInput.minLength;
  var maxNameLength = userNameInput.maxLength;

  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    window.render.renderWizards(wizards.slice().
      sort(function (left, right) {
        return getRank(right) - getRank(left);
      }));
  };

  var onColorTargetClick = function (evt) {
    var color;
    switch (evt.target) {
      case wizardCoat:
        color = window.colors.getRandomColor('coat');
        evt.target.style.fill = color;
        setup.querySelector('input[name="coat-color"]').value = color;
        coatColor = color;
        break;
      case wizardEyes:
        color = window.colors.getRandomColor('eyes');
        evt.target.style.fill = color;
        setup.querySelector('input[name="eyes-color"]').value = color;
        eyesColor = color;
        break;
      case fireball:
        color = window.colors.getRandomColor('fireball');
        fireballWrap.style.background = color;
        fireballWrap.querySelector('input[name="fireball-color"]').value = color;
        break;
    }
    updateWizards();
  };

  var onLoad = function (data) {
    wizards = data;
    updateWizards();
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style.zIndex = 100;
    node.style.position = 'absolute';
    node.style.height = '5%';
    node.style.left = 0;
    node.style.right = 0;
    node.style.margin = '0 auto';
    node.style.fontSize = '30px';
    node.style.textAlign = 'center';
    node.style.backgroundColor = 'red';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoad, onError);

  setup.addEventListener('click', window.debounce(onColorTargetClick, 500));

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
