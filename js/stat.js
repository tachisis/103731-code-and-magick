'use strict';

window.renderStatistics = function (ctx, names, times) {

  function drawCloud(context, x, y, w, h, radius) {
    var r = x + w;
    var b = y + h;
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(r - radius, y);
    context.quadraticCurveTo(r, y, r, y + radius);
    context.lineTo(r, y + h - radius);
    context.quadraticCurveTo(r, b, r - radius, b);
    context.lineTo(r - radius, b + radius);
    context.lineTo(r - radius * 2, b);
    context.lineTo(x + radius, b);
    context.quadraticCurveTo(x, b, x, b - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.fill();
    context.closePath();
  }

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  drawCloud(ctx, 110, 20, 420, 265, 20);

  ctx.fillStyle = 'rgb(255, 255, 255)';
  drawCloud(ctx, 100, 10, 420, 265, 20);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура, вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  ctx.textBaseline = 'top';

  var max = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var histogramHeight = 150;
  var step = histogramHeight / max;
  var barWidth = 40;
  var indent = 50;
  var nameMargin = 5;
  var timeMargin = -20;
  var initialX = 120;
  var initialY = 90;

  for (i = 0; i < times.length; i++) {
    var barHeight = times[i] * step;
    var topIndent = histogramHeight - barHeight;
    var barX = initialX + (indent + barWidth) * i;
    var barY = initialY + topIndent;

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + (Math.random() + 0.05) + ')';
    }

    ctx.fillRect(barX, barY, barWidth, barHeight);

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], barX, barY + barHeight + nameMargin);
    ctx.fillText(parseInt(times[i], 10), barX, barY + timeMargin);
  }
};
