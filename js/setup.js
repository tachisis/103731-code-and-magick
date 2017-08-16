'use strict';

var WIZARDS_SRC = {
  names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green']
};

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function createWizards() {
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    wizards[i] = {
      name: WIZARDS_SRC['names'][getRandom(0, WIZARDS_SRC['names'].length - 1).toFixed()]
        + ' '
        + WIZARDS_SRC['surnames'][getRandom(0, WIZARDS_SRC['surnames'].length - 1).toFixed()],
      coatColor: WIZARDS_SRC['coatColors'][getRandom(0, WIZARDS_SRC['coatColors'].length - 1).toFixed()],
      eyesColor: WIZARDS_SRC['eyesColors'][getRandom(0, WIZARDS_SRC['eyesColors'].length - 1).toFixed()]
    };
  }
  return wizards;
}

function renderWizard(wizard) {
  for (var i = 0; i < wizards.length; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  }
  return wizardElement;
}

function appendWizards(wizards) {
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
}

var wizards = createWizards();
appendWizards(wizards);

document.querySelector('.setup-similar').classList.remove('hidden');
document.querySelector('.setup').classList.remove('hidden');
