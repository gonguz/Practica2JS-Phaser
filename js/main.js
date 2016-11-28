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
    var heroes = document.querySelector('.character-listH');
    var monsters = document.querySelector('.character-listM')

    var allHeroes = battle.characters.allFrom('heroes');
    var allMonsters = battle.characters.allFrom('monsters');

    heroes.innerHTML = "";
    monsters.innerHTML = "";

    for (var i in allHeroes){
     heroes.innerHTML += `<li data-chara-id="${allHeroes[i].name}"
     > ${allHeroes[i].name} (HP: <strong>${allHeroes[i].hp}</strong>/${allHeroes[i].maxHp}
			, MP: <strong>${allHeroes[i].mp}</strong>/${allHeroes[i].maxMp})</li>`;
    }

    for(var j in allMonsters){
      monsters.innerHTML += `<li data-chara-id="${allMonsters[j].name}"
      > ${allMonsters[j].name} (HP: <strong>${allMonsters[j].hp}</strong>/${allMonsters[j].maxHp}
 			, MP: <strong>${allMonsters[j].mp}</strong>/${allMonsters[j].maxMp})</li>`;
    }
    // TODO 2: highlight current character
    // TODO 3: show battle actions form
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
    actionForm = document.querySelector('form[name=select-action]');
    targetForm = document.querySelector('form[name=select-target]');
    spellForm = document.querySelector('form[name=select-spell]');
    infoPanel = document.querySelector('#battle-info');

    actionForm.addEventListener('submit', function (evt) {
        evt.preventDefault();

        // TODO 4: select the action chosen by the player
        // TODO 4: hide this menu
        // TODO 4: go to either select target menu, or to the select spell menu
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
