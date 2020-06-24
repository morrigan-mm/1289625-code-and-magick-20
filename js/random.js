'use strict';

(function () {
  var getRandomIndex = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (arr) {
    var index = getRandomIndex(0, arr.length - 1);
    return arr[index];
  };

  window.random = {
    getRandomIndex: getRandomIndex,
    getRandomElement: getRandomElement
  };

})();
