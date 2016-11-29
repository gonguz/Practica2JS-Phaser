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

battle.on('turn', function (data) {
    console.log('TURN', data);

    // TODO 1: render the characters

    var listofStrings = Object.keys(this._charactersById);
    var listofChars = document.querySelectorAll('.character-list');
    var heroe = listofChars[0];
    var monster = listofChars[1];
    var personaje;
    var viewsofChar;
    heroe.innerHTML = '';
    monster.innerHTML = '';
    for (var i = 0; i < listofStrings.length; i++){
  	    personaje = this._charactersById[listofStrings[i]];
  	    viewsofChar = '<li data-chara- id="'+listofStrings[i]+'">'+personaje.name+'(HP: <strong>'+personaje.hp+'</strong>/'+personaje.maxHp+', MP: <strong>'+personaje.mp+'</strong>/'+personaje.maxMp+') </li>';
  	    if (personaje.party === 'heroes')
  	       heroe.innerHTML += viewsofChar;

  	    else
  	        monster.innerHTML += viewsofChar;

  	}

    // TODO: highlight current character
    var activeCh = document.querySelector('#' + data.activeCharacterId);
    activeCh.classList.add('active');

    // TODO 3: show battle actions form

    var optionsList = battle.options.list();
    var optionsArr = document.querySelectorAll(".choices");
    var optionCh = optionsArr[0];
    optionCh.innerHTML = "";
    actionForm.style.display = 'block';

    for(var i = 0; i < optionsList.length; i++){
      optionCh.innerHTML += '<li><label><input type="radio" name="option" value="'+optionsList[i]+'"> '+optionsList[i]+'</label></li>';
    }

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

        // TODO 4: select the action chosen by the player
        var action = actionForm.elements['option'].value;
        battle.options.select(action);
        // TODO 4: hide this menu
        actionForm.style.display = 'none';
        // TODO 4: go to either select target menu, or to the select spell menu
        if(action === 'attack')
            targetForm.style.display = 'inline';
        else if(action ==='defend')
            actionForm.style.display = 'inline';
        else if(action ==='cast')
            spellFrom.style.dìsplay = 'inline';
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
