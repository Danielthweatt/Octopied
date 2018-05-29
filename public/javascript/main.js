
//Seting up Main variables
let count = 0;
let clickCount = 0;
const expGrothModifier = 50;
let resources ={
    hearts: 0,
    babbies:0,
    sharks:0,
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
    },
    abilities: {
        foodFrenzy :0,
        inkSpray :0,
        rankUp: 0
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
 * Keeps track of the numbers of Clicks 
 */
function clickFrenzy() {
    const clickValue = calcualteClickValue();
   clickCount += clickValue;
   gainExperiance();
   levelup();
   $('.counter').text(clickCount);
   if(octoStats.level === 10){
       alert('Oh Something Happening');
      evolve();
   }

}

/**
 * Changes the Octopus to its second form uses set interal to achive this
 * 
 * 
 */
function evolve() {
    let evolveFlash = 0
    const timer = setInterval(function(){
    if((evolveFlash % 2) === 0){
        console.log("Even", evolveFlash)
        $('.octo').attr('src', '/images/Octopus.gif');
    }else{
        console.log("Odd", evolveFlash)
        $('.octo').attr('src', '/images/original.gif');
    }
    evolveFlash++;
    if(evolveFlash === 11){
        clearInterval(timer);
    }
},180);
}


function calcualteClickValue(){
     const proficiency = (octoStats.proficiency.food * .05) + 1;
     const tool =  0//toolA + toolB + toolC;
     const baseCollect = 1;
     const collectValue = baseCollect + tool;
     const clickValue = Math.ceil( ((octoStats.level * collectValue) * proficiency ));

     return clickValue;
}

function gainExperiance() {
    //exp items still need to be made
    const expItem = 1.25;
    const gainExperiance = octoStats.prestidge * (expItem) +1;
    octoStats.exp += gainExperiance;
    $('.current-exp').text(`Exp: ${octoStats.exp}`)
}

function levelup(){
    console.log(octoStats.exp, octoStats.level)
    if(octoStats.exp > octoStats.level * expGrothModifier){
       alert('level up')
        octoStats.level ++;
        $('.currnet-level').text(`Level:${octoStats.level}`)
    }
}

