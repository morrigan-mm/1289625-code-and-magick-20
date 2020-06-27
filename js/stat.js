'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 5;
  var FONT_GAP = 30;
  var COLUMN_GAP = 50;
  var TEXT_WIDTH = 40;
  var TEXT_X = CLOUD_X + FONT_GAP + GAP;
  var TEXT_Y = CLOUD_Y + CLOUD_HEIGHT - FONT_GAP;
  var BAR_WIDTH = 40;
  var BAR_HEIGHT = 150;
  var USER_COLOR = 'rgba(255, 0, 0, 1)';

  var renderCloud = function (ctx, x, y, color, bordered) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);

    if (bordered) {
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
    }
  };

  var getColumnColor = function (player) {
    if (player === 'Вы') {
      return USER_COLOR;
    }
    var saturation = Math.round(Math.random() * 100);
    return 'hsl(240, ' + saturation + '%, 50%)';
  };

  var renderColumn = function (ctx, x, y, player, time, maxTime) {
    var barHeight = BAR_HEIGHT * time / maxTime;
    ctx.fillStyle = getColumnColor(player);
    ctx.fillRect(x, y - GAP, BAR_WIDTH, -barHeight);
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'top';
    ctx.fillText(player, x, y);
    ctx.textBaseline = 'bottom';
    ctx.fillText(Math.round(time), x, y - 2 * GAP - barHeight);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff', true);

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'top';
    ctx.fillText('Ура! Вы победили!', 120, 30);
    ctx.fillText('Список результатов:', 120, 50);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < players.length; i++) {
      var x = TEXT_X + (TEXT_WIDTH + COLUMN_GAP) * i;
      renderColumn(ctx, x, TEXT_Y, players[i], times[i], maxTime);
    }
  };
})();
