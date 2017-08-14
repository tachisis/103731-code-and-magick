'use strict';

var textParams = {
  style: '#000',
  font: '16px PT Mono',
  baseline: 'top'
};

var cloudParams = {
  x: 100,
  y: 10,
  width: 420,
  height: 270,
  radius: 20,
  fill: '#fff'
};

var shadowParams = {
  x: 110,
  y: 20,
  width: 420,
  height: 270,
  radius: 20,
  fill: 'rgba(0, 0, 0, 0.7)'
};

var histogramParams = {
  height: 150,
  barWidth: 40,
  indent: 50,
  nameMargin: 5,
  timeMargin: -20,
  initialX: 155,
  initialY: 95
};

function printText(ctx, text, x, y, params) {
  ctx.fillStyle = params.style;
  ctx.font = params.font;
  ctx.textBaseline = params.baseline;
  ctx.fillText(text, x, y);
}

function drawCloud(ctx, params) {
  var x = params.x;
  var y = params.y;
  var width = params.width;
  var height = params.height;
  var radius = params.radius;
  var fill = params.fill;
  var right = x + width;
  var bottom = y + height;

  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(right - radius, y);
  ctx.quadraticCurveTo(right, y, right, y + radius);
  ctx.lineTo(right, y + height - radius);
  ctx.quadraticCurveTo(right, bottom, right - radius, bottom);
  ctx.lineTo(right - radius, bottom + radius);
  ctx.lineTo(right - radius * 2, bottom);
  ctx.lineTo(x + radius, bottom);
  ctx.quadraticCurveTo(x, bottom, x, bottom - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.fill();
  ctx.closePath();
}

function getMax(array) {
  var max = Math.max.apply(null, array);
  return max;
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function drawHistBar(ctx, barX, barY, barHeight, name, time) {
  ctx.fillStyle = name === 'Вы'
    ? 'rgba(255, 0, 0, 1)'
    : 'rgba(0, 0, 255, ' + getRandom(0.5, 1).toFixed(1) + ')';

  ctx.fillRect(barX, barY, histogramParams.barWidth, barHeight);

  printText(ctx, name, barX, barY + barHeight + histogramParams.nameMargin, textParams);
  printText(ctx, parseInt(time, 10), barX, barY + histogramParams.timeMargin, textParams);
}

window.renderStatistics = function (ctx, names, times) {
  drawCloud(ctx, shadowParams);
  drawCloud(ctx, cloudParams);

  printText(ctx, 'Ура, вы победили!', cloudParams.width / 2, 20, textParams);
  printText(ctx, 'Список результатов:', cloudParams.width / 2, 40, textParams);

  var step = histogramParams.height / getMax(times);

  for (var i = 0; i < times.length; i++) {
    var barHeight = times[i] * step;
    var topIndent = histogramParams.height - barHeight;
    var barX = histogramParams.initialX + (histogramParams.indent + histogramParams.barWidth) * i;
    var barY = histogramParams.initialY + topIndent;

    drawHistBar(ctx, barX, barY, barHeight, names[i], times[i]);
  }
};
