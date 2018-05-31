//Seting up Main variables
let count = 0;
let points = 0;
const collecitonTimeModifer = 5000;
const expGrothModifier = 5;
let resources ={
    hearts: 0,
    babbies:1,
    worm: 0,
    fish: 0,
    shark:0,
    dirt: 0,
    rock:0,
    steel:0
}
let octoStats = {
    level: 1,
    exp: 0,
    prestidge: 0,
    proficiency :{
        food:1,
        attack:1,
        gather:1
    },
    abilities: {
        foodFrenzy :0,
        inkSpray :0,
        rankUp: 0
    }
};
let tradeCost ={
    dirt: 100,
    rock: 10000,
    steel:20000,
    worm: 100,
    fish: 1000,
    shark: 2000,
}
let collectorStatus ={
    dirt: false,
    rock: false,
    steel:false,
    worm: false,
    fish: false,
    shark: false,
}
let resourceDiffuculityRank ={
    dirt: 2,
    rock: 6,
    steel:12,
    worm: 1,
    fish: 3,
    shark: 6,
}

// Could add a generateor to create custom kids and indepent levels ** strech
const babby = {
    number: 3,
    active: 0,
    available: 3,
    level: 1,
    hugner:2,
    createBaby: function() {
        this.number++
        this.available = this.number - this.active;
    },
    feed: function() {
        points -= (this.number * 10  * this.hunger);
    },
    //need to move logic for the collection starting In here
    // currenlty on line 220 with collector state
    startCollecting: function(resource) {
        if( this.available > 0){
            this.active++;
            this.available--
            collectorStatus[resource] = true;
            // Builds the name of the funcition that needs to be called useing the given resource
            startGivenCollector(resource);
        }else{
            console.error('You do not have enouf Babbies')
        }
       
    },
    stopCollecting: function(resource) {
        if( this.active >= 1 ){
            this.active--;
            this.available++
            collectorStatus[resource] = false;
        }else{
            console.error('No colectors to Stop')
        }
    }
}

function startGivenCollector(resource){
    switch(resource){
        case 'worm':
            collectWorms();
            break;
        case 'fish':
            collectFish();
            break;
        case 'shark':
            collectShark();
            break;
        case 'dirt':
            collectDirt();
            break;
        case 'rock':
            collectRock();
            break;
        case 'steel':
            collectSteel();
            break;    
        default:
            console.log('default');    
    }
}

$(document).on('click','.octo',clickFrenzy);

/**
 * sets up listners for the application  **neeeds Work**
 * 
 * 
 */
function enable() {
   //setup Listners in here
}


/**
 * This function triggers all the events that happen on normal clicks
 * 
 * @method clickFrenzy 
 */
function clickFrenzy() {
    const clickValue = calcualteClickValue();
    points += clickValue;
   gainExperiance();
   levelup();
   $('.counter').text(points);
   if(octoStats.level === 10 && octoStats.exp === 0){
       alert('Oh Something Happening');
      evolve();
   }

}

/**
 * Changes the Octopus to its second form uses set interal to achive this
 * 
 * @method evolve
 */
function evolve() {
    let evolveFlash = 0
    const timer = setInterval(function(){
    if((evolveFlash % 2) === 0){
        $('.octo').attr('src', '/images/Octopus.gif');
    }else{
        $('.octo').attr('src', '/images/original.gif');
    }
    evolveFlash++;
    if(evolveFlash === 11){
        clearInterval(timer);
    }
},180);
}

/**
 * This calcuatees the value that is gained by click baised on the current modiers and items
 * that they player currently has
 * 
 * @method calcualteClickValue
 * @returns INTEGER clickValue 
 */
function calcualteClickValue(){
     const proficiency = (octoStats.proficiency.food * .05) + 1;
     const tool =  0//toolA + toolB + toolC;
     const baseCollect = 1;
     const collectValue = baseCollect + tool;
     const clickValue = Math.ceil( ((octoStats.level * collectValue) * proficiency ));

     return clickValue;
}

/**
 *  This will calculate how much exp is gained
 * 
 * @method gainExperiance
 * 
 * still need to refine exp item section
 */
function gainExperiance() {
    //exp items still need to be made
    const expItem = 1.25;
    const gainExperiance = octoStats.prestidge * (expItem) +1;
    octoStats.exp += gainExperiance;
    $('.current-exp').text(`Exp: ${octoStats.exp}`)
}

/**
 * This will level up the charchter baised on exp
 * 
 * @method levelup
 */
function levelup(){
    if(octoStats.exp > octoStats.level * expGrothModifier){
       alert('level up')
        octoStats.level ++;
        octoStats.exp = 0;
        $('.currnet-level').text(`Level:${octoStats.level}`)
       
    }
}

/**
 * This lets you to spend your points to get upgrade materials
 * 
 * @method buyResource
 * @param {any} itemName 
 * @param {number} [count=1] 
 */
function buyResource(itemName, count = 1){
    if(points > tradeCost[itemName] * count){
        //Add resource
        resources[itemName]++;
        //subtract toatl points
        points -= tradeCost[itemName] * count;
        //update Screen
        $('.counter').text(points);
        const selector = '.resource-' + [itemName];
        $(selector).text( resources[itemName])
    }else{
        alert('you dont have enouf points')
    }
}


/**
 * This will let you use resources to use this you need to input the 
 * name of the item and the quanity and it will either spend the points or 
 * it will sent a message letting the user know they do not have the required resources
 * 
 * @method buyItem
 * @param {any} itemName 
 * @param {number} [count=1] 
 */
function buyItem(itemName, count = 1){
    if(resources[itemName] >=  count){
        resources[itemName] -= count;
        $(`.${itemName}` ).text( resources[itemName]);
        const selector = '.resource-' + [itemName];
        $(selector).text( resources[itemName])
    }else{
        alert(`you dont have enouf ${itemName}s`)
    }
}
function checkForCollectors(){
    

}

$('.collect-worm').on('click', function(){
    if(babby.number === 0){
        console.log("You must have a child to collect resources")
        return;
    }
    collectorStatus.worm ? babby.stopCollecting('worm') : babby.startCollecting('worm') ;
    const check = collectorStatus.worm ? '[x]' : '[]';
    $('.collect-worm').text(check);
    
})

$('.collect-fish').on('click', function(){
    if(babby.number === 0){
        console.log("You must have a child to collect resources")
        return;
    }
    collectorStatus.fish ? babby.stopCollecting('fish') : babby.startCollecting('fish') ;
    const check = collectorStatus.fish ? '[x]' : '[]';
    $('.collect-fish').text(check);
})  

$('.collect-shark').on('click', function(){
    if(babby.number === 0){
        console.log("You must have a child to collect resources")
        return;
    }
    collectorStatus.shark ? babby.stopCollecting('shark') : babby.startCollecting('shark') ;
    const check = collectorStatus.shark ? '[x]' : '[]';
    $('.collect-shark').text(check);
})  

$('.collect-dirt').on('click', function(){
    if(babby.number === 0){
        console.log("You must have a child to collect resources")
        return;
    }
    collectorStatus.dirt ? babby.stopCollecting('dirt') : babby.startCollecting('dirt') ;
    const check = collectorStatus.dirt ? '[x]' : '[]';
    $('.collect-dirt').text(check);
}) 

$('.collect-rock').on('click', function(){
    if(babby.number === 0){
        console.log("You must have a child to collect resources")
        return;
    }
    collectorStatus.rock ? babby.stopCollecting('rock') : babby.startCollecting('rock') ;
    const check = collectorStatus.rock ? '[x]' : '[]';
    $('.collect-rock').text(check);
})

$('.collect-steel').on('click', function(){
    if(babby.number === 0){
        console.log("You must have a child to collect resources")
        return;
    }
    collectorStatus.steel ? babby.stopCollecting('steel') : babby.startCollecting('steel') ;
    const check = collectorStatus.steel ? '[x]' : '[]';
    $('.collect-steel').text(check);
})

function collectWorms() {
    $('.resource-worm').text(resources.worm);
    if(collectorStatus.worm){
        setTimeout(function(){
            if(collectorStatus.worm){
                resources.worm++;
                collectWorms();
            }
        }, (collecitonTimeModifer * resourceDiffuculityRank.worm));
    }
}

function collectFish() {
    $('.resource-fish').text(resources.fish);
    if(collectorStatus.fish){
        setTimeout(function(){
            if(collectorStatus.fish){
                resources.fish++;
                collectFish();
            }
        }, (collecitonTimeModifer  * resourceDiffuculityRank.fish));
    }
}

function collectShark() {
    $('.resource-shark').text(resources.shark);
    if(collectorStatus.shark){
        setTimeout(function(){
            resources.shark++;
            collectShark();
        }, (collecitonTimeModifer  * resourceDiffuculityRank.shark));
    }
}

function collectDirt() {
    $('.resource-dirt').text(resources.dirt);
    if(collectorStatus.dirt){
        setTimeout(function(){
            resources.dirt++;
            collectDirt();
        }, (collecitonTimeModifer  * resourceDiffuculityRank.dirt));
    }
}

function collectRock() {
    $('.resource-rock').text(resources.rock);
    if(collectorStatus.rock){
        setTimeout(function(){
            resources.rock++;
            collectRock();
        }, (collecitonTimeModifer  * resourceDiffuculityRank.rock));
    }
}

function collectSteel() {
    $('.resource-steel').text(resources.steel);
    if(collectorStatus.steel){
        setTimeout(function(){
            resources.steel++;
            collectSteel();
        }, (collecitonTimeModifer  * resourceDiffuculityRank.steel));
    }
}


function collectResource(type) {
    $('.resource-' + type).text(resources[type]);
    if(collectorStatus[type]){
        setTimeout(function(){
            resources[type]++;
            console.log("resource is added", resources);
            collectResource(type);

        }, (collecitonTimeModifer));
   
    }
}

/**  
 * this is a function that will collect the reouces over time
 * 
 * need to figure a way to toggle this 
 */
// function collectResource(type) {
//     const 
// }

$('.buy-dirt').on('click', function(){
    buyResource('dirt');
});

$('.buy-worm').on('click', function(){
    buyResource('worm');
});

$('.buy-fish').on('click', function(){
    buyResource('fish');
});

$('.buy-shark').on('click', function(){
    buyResource('shark');
});

$('.buy-rock').on('click', function(){
    buyResource('rock');
});

$('.buy-steel').on('click', function(){
    buyResource('steel');
});






$('.have-babby').on('click', function() {
    //set requirments  Must be lv 11 // have home //  cost 10 fish for first

    buyItem('worm', 1);
    babby.createBaby();
})




/* Animations that need to be made for the game

* Need Exp Bar

Need animation for click value that is added (something that displays a number and then heads up and fades away)

Need a text animation to display text (for level ups and other events)

** Things that need to be created still

    profeceny level up

    come up with abilites  that have cool downs

    Add babby helpers that gather resouces


    **Strech **

    Hp bars for boss Fights

*/





