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
  var right = params.x + params.width;
  var bottom = params.y + params.height;

  ctx.fillStyle = params.fill;
  ctx.beginPath();
  ctx.moveTo(params.x + params.radius, params.y);
  ctx.lineTo(right - params.radius, params.y);
  ctx.quadraticCurveTo(right, params.y, right, params.y + params.radius);
  ctx.lineTo(right, params.y + params.height - params.radius);
  ctx.quadraticCurveTo(right, bottom, right - params.radius, bottom);
  ctx.lineTo(right - params.radius, bottom + params.radius);
  ctx.lineTo(right - params.radius * 2, bottom);
  ctx.lineTo(params.x + params.radius, bottom);
  ctx.quadraticCurveTo(params.x, bottom, params.x, bottom - params.radius);
  ctx.lineTo(params.x, params.y + params.radius);
  ctx.quadraticCurveTo(params.x, params.y, params.x + params.radius, params.y);
  ctx.fill();
  ctx.closePath();
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

  var step = histogramParams.height / Math.max.apply(null, times);

  for (var i = 0; i < times.length; i++) {
    var barHeight = times[i] * step;
    var topIndent = histogramParams.height - barHeight;
    var barX = histogramParams.initialX + (histogramParams.indent + histogramParams.barWidth) * i;
    var barY = histogramParams.initialY + topIndent;

    drawHistBar(ctx, barX, barY, barHeight, names[i], times[i]);
  }
};
