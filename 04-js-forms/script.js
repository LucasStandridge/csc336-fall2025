let paradigm_cards={
    Knight: [
            {
            name:"Draw Swords",
            paradigm:"Knight",
            type:"Spell",
            dmg_type:"No Damage",
            cost:2,
            effect:"Draw 2 random 'Attack' cards from your deck"
        },
        {
            name:"Downswing",
            paradigm:"Knight",
            type:"Attack",
            dmg_type:"Physical",
            cost:0,
            effect:"Deal 3 damage to your opponent"
        },
        {
            name:"Rise Through the Ranks",
            paradigm:"Knight",
            type:"Advancement",
            dmg_type:"Physical",
            cost:4,
            effect:"Deal 4 damage. Draw a random 'Attack' card from your deck. If you have used 5 'Attack' cards with different names this game, advance to a Hero (your attacks trigger again, dealing half damage)"
        },
    ],
    Wizard:[
        {
            name:"Cantrip",
            paradigm:"Wizard",
            type:"Spell",
            dmg_type:"No Damage",
            cost:1,
            effect:"Choose one:\n1) The next time you would take damage this turn, you instead take 2 less \n2)Deal 2 damage to a target of your choice"
        },
        {
            name:"Reckless Casting",
            paradigm:"Wizard",
            type:"Spell",
            dmg_type:"Magical",
            cost:5,
            effect:"Deal 8 damage to a target of your choice. Take 3 damage"
        },
        {
            name:"Study the Ancient Archives",
            paradigm:"Wizard",
            type:"Advancement",
            dmg_type:"None",
            cost:7,
            effect:"Draw 3 random Wizard spells from your deck. If you have casted 6 spells this game, advance to an Archmage (at the start of your turn, draw a spell. Your spells gain bonus effects based on your attunement)"
        },
    ],
    SpellSword:[
        {
            name:"Runefusion",
            paradigm:"Spell Sword",
            type:"Spell",
            dmg_type:"Magical",
            cost:4,
            effect:"Deal 2 magical damage to a target of your choice. Infuse your weapon. (Your next physical attack deals 2 magical damage [after performing the physical damage, counted as a separate instance])"
        },
        {
            name:"Infused Swing",
            paradigm:"Spell Sword",
            type:"Attack",
            dmg_type:"Phsyical",
            cost:3,
            effect:"Deal 4 magical damage to a target of your choice. If your weapon is infused, you may also deal an additional 2 magical damage to the same target (in addition to the infusion damage",
        },
        {
            name:"Harness the Runes",
            paradigm:"Spell Sword",
            type:"Spell",
            dmg_type:"No Damage",
            cost:5,
            effect:"Permanantly increase your infusion damage by 1. If you have dealt magical damage 6 times this game, advance to a Mage Walker (Your first attack each turn is automatically infused)."
        }
    ],
    Juggernaut:[
        {
            name:"Batter To A Pulp",
            paradigm:"Juggernaut",
            type:"Attack",
            dmg_type:"Physical",
            cost:7,
            effect:"Deal 8 damage to a target of your choice. If this does more than 5 damage, your opponent loses class benefits for their first action of their next turn (any innate abilities are also removed until they play a card)"
        },
        {
            name:"Hunker Down",
            paradigm:"Juggernaut",
            type:"Spell",
            dmg_type:"No Damage",
            cost:4,
            effect:"Gain 5 life. The next time you would take damage, take 3 less"
        },
        {
            name:"Become Unstoppable",
            paradigm:"Juggernaut",
            type:"Attack",
            dmg_type:"Physical",
            cost:10,
            effect:"Deal 12 damage to a target of your choice. If you have dealt or taken 25 damage this game, advance to a Behemoth (You gain 5 extra life, your blocks gain 2 extra shielding value, and your opponents blocks lose half of their shielding value, rounded down."
        },
    ],
    Alchemist:
    [
        {
            name:"Brew Potion",
            paradigm:"Alchemist",
            type:"Spell",
            dmg_type:"No Damage",
            cost:1,
            effect:"Create a potion with two of the following effect (it's an item that you may use at as an instant). \n1)Deal 2 damage to any target, this potion costs 2 more \n2)Heal 3 life, this potion costs 1 more \n 3)Your opponent shuffles their hand redraws the same number of cards \n4) Your next attack deals 3 extra damage, this potion costs 2 more \n5)Your opponent discards a card. This potion costs 4 more, and expires in 2 turns."
        },
        {
            name:"Wild Concoction",
            paradigm:"Alchemist",
            type:"Attack",
            dmg_type:"Magical",
            cost:3,
            effect:"Deal 3 magical function. Choose a potion you control and give it 'This deals 2 damage to a target of your chocie'"
        },
        {
            name:"Unstable Experiment",
            paradigm:"Alchemist",
            type:"Advancement",
            dmg_type:"Magical",
            cost:6,
            effect:"If you control at least 1 potion, transform your hero into an Abomination (You lose all potions you currently have in play, and the Abomination gains all of the effects of those potions (the effects stack). Up to twice per turn, at any time, you may pay 4 to activate those effects. If you do so, also take 5 unavoidable damage."
        }
    ],
    Assassin:
    [
        {
            name:"Backstab",
            paradigm:"Assassin",
            type:"Attack",
            dmg_type:"Physical",
            cost:3,
            effect:"Deal 2 damage. If your opponent is unsuspecting, deal three times as much instead"
        },
        {
            name:"Hide Within the Masses",
            paradigm:"Assassin",
            type:"Spell",
            dmg_type:"No Damage",
            cost:2,
            effect:"Your next attack does 1 extra base damage. Your opponent becomes unsuspecting"
        },
        {
            name:"Slay the Emperor",
            paradigm:"Assassin",
            type:"Advancement",
            dmg_type:"Physical",
            cost:4,
            effect:"Deal 4 damage. If your opponent is unsuspecting, and you have made 4 other unsuspecting attacks this game, become Infamous (your opponent is always unsuspecting)"
        }
    ]
}

function populateCards(displayCards = paradigm_cards) {
    let cardList = document.querySelector("#card");
    cardList.innerHTML = "";

    for (let paradigm in displayCards) {
        let cards = displayCards[paradigm]; 
        for (let card of cards) {
            let cardHTML = createCard(card);
            cardList.innerHTML += cardHTML;
        }
    }
}

function colorCard(card){
    if (card.paradigm === "Knight"){
        return "background:brown; color:white;";
    }
    else if (card.paradigm === "Wizard"){
        return "background:purple; color:white";
    }
    else if (card.paradigm === "Spell Sword"){
        return "background:lightblue; color:black";
    }
    else if (card.paradigm === "Juggernaut"){
        return "background:red; color:white"
    }
    else if (card.paradigm === "Alchemist"){
        return "background:green;color:white"
    }
    else if (card.paradigm === "Assassin"){
        return "background:aliceblue;color:black"
    }
}

function createCard(card){
    let style = ""
    style = colorCard(card)
    return `
    <div class = "card" style = "${style}">
        <h3>${card.name}</h3>
        <div class='stats'>
            <div>Paradigm: ${card.paradigm}</div>
            <div>Type: ${card.type}</div>
            <div>Damage: Type:${card.dmg_type}</div>
            <div>Cost:${card.cost}</div>
            <div>Effect: ${card.effect}</div>
        </div>
    </div>
    `;
}

let addCardForm = document.querySelector("#add-card-form");
addCardForm.addEventListener("submit", addNewCard);

let filterForm = document.querySelector("#filter-search");
filterForm.addEventListener("submit", filterParadigm);

function filterParadigm(e){
    e.preventDefault();
    let chosen_paradigm = document.querySelector("#paradigm-filter-field").value.trim()
    if (chosen_paradigm === "ShowAll"){
        populateCards()
    }else{
        let filtered = {
            [chosen_paradigm]: paradigm_cards[chosen_paradigm]
        };
        populateCards(filtered)
    }
}

function addNewCard(e){
    e.preventDefault();
        let inputs = {
        name: document.querySelector("#card-name-field").value.trim(),
        paradigm: document.querySelector("#card-paradigm-field").value.trim(),
        type: document.querySelector("#card-type-field").value.trim(),
        dmg_type: document.querySelector("#card-damage-type-field").value.trim(),
        cost: document.querySelector("#card-cost-field").value.trim(),
        effect: document.querySelector("#card-effect-field").value.trim()
    };

    for (let [key, value] of Object.entries(inputs)) {
        if (!value) {
            alert(`Please fill out the "${key}" field.`);
            return;
        }
    }
    
    for (let paradigm in paradigm_cards) {
        let cards = paradigm_cards[paradigm]; 
        for (let card of cards) {
            if (card.name === inputs.name){
                alert(`There is already a card with the name "${inputs.name}" Please pick a different one.`)
                return;
                }
            }
        }

    let newCard = {...inputs}

    paradigm_cards[inputs.paradigm].push(newCard);
    populateCards(paradigm_cards);
}

populateCards();