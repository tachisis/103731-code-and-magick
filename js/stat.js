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
  shadowDelta: 10,
  cloudFill: '#fff',
  shadowFill: 'rgba(0, 0, 0, 0.7)'
};

var histogramParams = {
  height: 150,
  barWidth: 40,
  indent: 50,
  nameMargin: 5,
  timeMargin: -20,
  initialX: 120,
  initialY: 95
};

function printText(ctx, text, x, y, params) {
  ctx.fillStyle = params.style;
  ctx.font = params.font;
  ctx.textBaseline = params.baseline;
  ctx.fillText(text, x, y);
}

function drawCloud(context, x, y, width, height, radius, fill, shadow) {
  if (shadow) {
    x += shadow;
    y += shadow;
  }
  var right = x + width;
  var bottom = y + height;
  context.fillStyle = fill;
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(right - radius, y);
  context.quadraticCurveTo(right, y, right, y + radius);
  context.lineTo(right, y + height - radius);
  context.quadraticCurveTo(right, bottom, right - radius, bottom);
  context.lineTo(right - radius, bottom + radius);
  context.lineTo(right - radius * 2, bottom);
  context.lineTo(x + radius, bottom);
  context.quadraticCurveTo(x, bottom, x, bottom - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.fill();
  context.closePath();
}

function getMaxTime(times) {
  var max = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  return max;
}

function getOpacity(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

function drawHistBar(ctx, barX, barY, barHeight, name, time) {
  ctx.fillStyle = name === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + getOpacity(0.5, 1) + ')';

  ctx.fillRect(barX, barY, histogramParams.barWidth, barHeight);

  printText(ctx, name, barX, barY + barHeight + histogramParams.nameMargin, textParams);
  printText(ctx, parseInt(time, 10), barX, barY + histogramParams.timeMargin, textParams);
}

window.renderStatistics = function (ctx, names, times) {

  drawCloud(ctx, cloudParams.x, cloudParams.y, cloudParams.width, cloudParams.height, cloudParams.radius, cloudParams.shadowFill, cloudParams.shadowDelta);
  drawCloud(ctx, cloudParams.x, cloudParams.y, cloudParams.width, cloudParams.height, cloudParams.radius, cloudParams.cloudFill);

  printText(ctx, 'Ура, вы победили!', cloudParams.width / 2, 20, textParams);
  printText(ctx, 'Список результатов:', cloudParams.width / 2, 40, textParams);

  var step = histogramParams.height / getMaxTime(times);

  for (var i = 0; i < times.length; i++) {
    var barHeight = times[i] * step;
    var topIndent = histogramParams.height - barHeight;
    var barX = histogramParams.initialX + (histogramParams.indent + histogramParams.barWidth) * i;
    var barY = histogramParams.initialY + topIndent;

    drawHistBar(ctx, barX, barY, barHeight, names[i], times[i]);
  }
};
