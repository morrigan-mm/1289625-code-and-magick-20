'use strict';

(function () {
  var colors = {
    coat: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    eyes: ['black', 'red', 'blue', 'yellow', 'green'],
    fireball: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
  };

  var getRandomColor = function (colorFor) {
    var arr = colors[colorFor];
    var color;

    if (arr) {
      color = window.random.getRandomElement(arr);
    }

    return color;
  };

  window.colors = {
    getRandomColor: getRandomColor,
  };
})();
