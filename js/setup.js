'use strict';

var WIZARDS_SRC = {
  names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green']
};

var similarWizardTemplate = document
    .querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

function shuffle(array) {
  var current = array.length;
  var tmp;
  var random;

  while (current) {
    random = Math.floor(Math.random() * current);
    current -= 1;
    tmp = array[current];
    array[current] = array[random];
    array[random] = tmp;
  }

  return array;
}

function getWizards(obj, count) {
  var shuffledNames = shuffle(obj['names']);
  var shuffledSurnames = shuffle(obj['surnames']);
  var shuffledCoatColors = shuffle(obj['coatColors']);
  var shuffledEyesColors = shuffle(obj['eyesColors']);

  var wizards = [];

  for (var i = 0; i < count; i++) {
    wizards[i] = {
      name: shuffledNames[i] + ' ' + shuffledSurnames[i],
      coatColor: shuffledCoatColors[i],
      eyesColor: shuffledEyesColors[i]
    };
  }

  return wizards;
}

function getWizardElement(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

function renderWizards(wizards, target) {
  var similarListElement = document.querySelector(target);
  var fragment = document.createDocumentFragment();
  var count = wizards.length;

  for (var i = 0; i < count; i++) {
    fragment.appendChild(getWizardElement(wizards[i]));
  }

  similarListElement.appendChild(fragment);
}

var wizards = getWizards(WIZARDS_SRC, 4);
renderWizards(wizards, '.setup-similar-list');

document.querySelector('.setup-similar').classList.remove('hidden');
document.querySelector('.setup').classList.remove('hidden');
