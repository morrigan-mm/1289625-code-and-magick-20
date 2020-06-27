'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var createCharacter = function () {
    return {
      name: window.random.getRandomElement(NAMES) + ' ' + window.random.getRandomElement(SECOND_NAMES),
      coatColor: window.colors.getRandomColor('coat'),
      eyesColor: window.colors.getRandomColor('eyes')
    };
  };

  var createCharactersArr = function (length) {
    return new Array(length).fill(null).map(function () {
      return createCharacter();
    });
  };

  window.mock = {
    createCharactersArr: createCharactersArr,
  };
})();
