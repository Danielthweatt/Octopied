
//Seting up Main variables
let count = 0;
let clickCount = 0;
let resources ={
    hearts: 0,
    babbies:0,
    sharks:0,
    dirt: 0,
    rock:0,
    steel:0
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
   clickCount++
   $('.counter').text(clickCount);
   if(clickCount === 10){
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


