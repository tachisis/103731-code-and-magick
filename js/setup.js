'use strict';

var WIZARDS_SRC = {
  names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green']
};

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function getWizards(obj, count) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var length = obj[key].length;
      var array = obj[key];

      if (count > length) {
        for (var i = 0; i < count - length; i++) {
          array.push(array[i]);
        }
      }
      shuffle(array);
    }
  }

  var wizards = [];
  for (i = 0; i < count; i++) {
    wizards[i] = {
      name: obj['names'][i] + ' ' + obj['surnames'][i],
      coatColor: obj['coatColors'][i],
      eyesColor: obj['eyesColors'][i]
    };
  }
  return wizards;
}

function getWizardElement(wizard, count) {
  for (var i = 0; i < count; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  }
  return wizardElement;
}

function renderWizards(wizards, target) {
  var similarListElement = document.querySelector(target);
  var fragment = document.createDocumentFragment();
  var count = wizards.length;
  for (var i = 0; i < count; i++) {
    fragment.appendChild(getWizardElement(wizards[i], count));
  }
  similarListElement.appendChild(fragment);
}

var wizards = getWizards(WIZARDS_SRC, 4);
renderWizards(wizards, '.setup-similar-list');

document.querySelector('.setup-similar').classList.remove('hidden');
document.querySelector('.setup').classList.remove('hidden');
