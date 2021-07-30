function show(src) {
    
    var hello = src;

    document.getElementById('img1').style.visibility = 'visible';
    
    document.getElementById("img1").src = "images/" + src;
}

function clicked(src, img_src) {
    
    var player_selection = src;
    
    
    play_round(player_selection, img_src);
}

function hide() {
    document.getElementById('img1').style.visibility = 'hidden';
}



function c_guess() {
  let c_no =  Math.floor(Math.random() * 3 + 1);;
  
  
  let c_guess = "";

    if (c_no == 1) {
        c_guess = "r";
    } else if (c_no == 2) {
        c_guess = "p";
    } else {
        c_guess = "s"
    }
    
    return c_guess;
}

function parse_c_image(c_s) {

    if (c_s == "r") {
        c_src = "rock.svg";
    } else if (c_s == "p") {
        c_src = "paper.svg";
    } else { 
        c_src = "scissors.svg";
    }
    
    return c_src
}

function play_round(p_s) {

    // Guy clicked something so now we go!
    
    c_s = c_guess();
 
     const message = document.querySelector('.round-output');

        //because im lazy i only put the initial so ill have to reconstruct the query
            // or i can just pass another variable
        
    document.getElementById('img2').style.visibility = 'visible';
    
    console.log(c_s);
    
    document.getElementById("img2").src = "images/" + parse_c_image(c_s);

     // c_s: initial for computer selection;  
    
    // 3P1= 3 * 3 fucking oh god.
    
    // alright
    
    if (p_s == "r") {
    
        if (c_s == "s") {
            message.textContent = "You Win.";
        } else if (c_s == "r") {
            message.textContent = "Tie.";
        } else {
            message.textContent = "You Lose."
        }
    
    } else if (p_s == "p") {
        if (c_s == "r") {
            message.textContent = "You Win.";
        } else if (c_s == "p") {
            message.textContent = "Tie.";
        } else {
            message.textContent = "You Lose."
        }
    
    } else {
        // scisors here
        if (c_s == "p") {
            message.textContent = "You Win.";
        } else if (c_s == "s") {
            message.textContent = "Tie.";
        } else {
            message.textContent = "You Lose."
        }
    
    }
    
}