'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');
  var setupMoveHandle = setup.querySelector('.upload');

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
    setup.removeAttribute('style');
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  setupOpen.addEventListener('click', onSetupOpenInteract);
  setupOpen.addEventListener('keydown', onSetupOpenInteract);

  setupClose.addEventListener('click', onSetupCloseInteract);
  setupClose.addEventListener('keydown', onSetupCloseInteract);

  window.move.initMove(setup, setupMoveHandle);

  window.dialog = {
    openPopup: openPopup,
    closePopup: closePopup,
  };
})();
