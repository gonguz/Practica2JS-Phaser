var battle = new RPG.Battle();
var actionForm, spellForm, targetForm;
var infoPanel;

function prettifyEffect(obj) {
    return Object.keys(obj).map(function (key) {
        var sign = obj[key] > 0 ? '+' : ''; // show + sign for positive effects
        return `${sign}${obj[key]} ${key}`;
    }).join(', ');
}


battle.setup({
    heroes: {
        members: [
            RPG.entities.characters.heroTank,
            RPG.entities.characters.heroWizard
        ],
        grimoire: [
            RPG.entities.scrolls.health,
            RPG.entities.scrolls.fireball
        ]
    },
    monsters: {
        members: [
            RPG.entities.characters.monsterSlime,
            RPG.entities.characters.monsterBat,
            RPG.entities.characters.monsterSkeleton,
            RPG.entities.characters.monsterBat
        ]
    }
});

battle.on('start', function (data) {
    console.log('START', data);
});

var getMonsters = function(){

  var monstersArr = [];
  var characterList = battle._charactersById;
  var listOfChars = document.querySelectorAll('.character-list');
  var monster = listOfChars[1];
  var monstersHTML = '';

  for(var i in characterList){
    viewsofChar = '<li data-chara-id="' + i + '">' +
      characterList[i].name +
      '(HP: <strong>' + characterList[i].hp + '</strong>/' + characterList[i].maxHp +
      ',MP: <strong>' + characterList[i].mp + '</strong>/' + characterList[i].maxMp + ')' +
      '</li>';
    if(characterList[i].party === 'monsters'){
      monstersArr.push(characterList[i]);
      monstersHTML += viewsofChar;
    }
  }
  monster.innerHTML = monstersHTML;
  return monstersArr;
};

var getHeroes = function(){
  var heroesArr = [];
  var characterList = battle._charactersById;
  var listOfChars = document.querySelectorAll('.character-list');
  var heroe = listOfChars[0];
  var heroesHTML = '';

  for(var i in characterList){
    viewsofChar = '<li data-chara-id="' + i + '">' +
      characterList[i].name +
      '(HP: <strong>' + characterList[i].hp + '</strong>/' + characterList[i].maxHp +
      ',MP: <strong>' + characterList[i].mp + '</strong>/' + characterList[i].maxMp + ')' +
      '</li>';
    if(characterList[i].party === 'heroes'){
      heroesArr.push(characterList[i]);
      heroesHTML += viewsofChar
    }
  }
  heroe.innerHTML = heroesHTML;

  return heroesArr;
};

var getCharacters = function(character){
  if(character.party === 'heroes'){
    getHeroes();
  }else{
    getMonsters();
  }
}

var getViews = function(character){
  return '<li data-chara-id="' + character.name + '">' +
    character.name +
    '(HP: <strong>' + character.hp + '</strong>/' + character.maxHp +
    ',MP: <strong>' + character.mp + '</strong>/' + character.maxMp + ')' +
    '</li>';
}


battle.on('turn', function (data) {
    console.log('TURN', data);

    var listOfChars = this._charactersById;

    for(var i in listOfChars){
      getCharacters(listOfChars[i]);
    }

    // TODO: highlight current character ::::::::
     var colouredChar = document.querySelector('[data-chara-id="' + data.activeCharacterId + '"]');
     colouredChar.classList.add('active');

    // TODO 3: show battle actions form :::::::::

    var optionsList = battle.options.list();
    var optionsArr = document.querySelectorAll(".choices");
    var optionCh = optionsArr[0];
    var optionsHTML = '';
    actionForm.style.display = 'block';

    optionsList.forEach(function(option, index, array){
      optionsHTML += '<li><label><input type="radio" name="option" value="' + option + '"> ' + option + '</label></li>';
    });

    optionCh.innerHTML = optionsHTML;
});

battle.on('info', function (data) {
    console.log('INFO', data);

    // TODO 7: display turn info in the #battle-info panel
});

battle.on('end', function (data) {
    console.log('END', data);

    // TODO 8: re-render the parties so the death of the last character gets reflected
    // TODO 9: display 'end of battle' message, showing who won
});

window.onload = function () {
    //defensa
    actionForm = document.querySelector('form[name=select-action]');
    //ataque
    targetForm = document.querySelector('form[name=select-target]');
    //cast
    spellForm = document.querySelector('form[name=select-spell]');

    infoPanel = document.querySelector('#battle-info');

    actionForm.addEventListener('submit', function (evt) {
        evt.preventDefault();

        // TODO 4: select the action chosen by the player ::::::::
        var action = actionForm.elements['option'].value;
        battle.options.select(action);
        // TODO 4: hide this menu
        actionForm.style.display = 'none';
        // TODO 4: go to either select target menu, or to the select spell menu
        if(action === 'attack'){
            targetForm.style.display = 'block';
        }else if(action === 'cast'){
            spellForm.style.display = 'block';
        }
    });

    targetForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        // TODO 5: select the target chosen by the player
        // TODO 5: hide this menu
    });

    targetForm.querySelector('.cancel')
    .addEventListener('click', function (evt) {
        evt.preventDefault();
        // TODO: cancel current battle options
        // TODO: hide this form
        // TODO: go to select action menu
    });

    spellForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        // TODO 6: select the spell chosen by the player
        // TODO 6: hide this menu
        // TODO 6: go to select target menu
    });

    spellForm.querySelector('.cancel')
    .addEventListener('click', function (evt) {
        evt.preventDefault();
        // TODO: cancel current battle options
        // TODO: hide this form
        // TODO: go to select action menu
    });

    battle.start();
};
