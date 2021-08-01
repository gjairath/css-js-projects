let current_m = 16;
let current_n = 16;

let color_flag = false;
let random_flag = false;


function randomize_colors() {
    color_flag = !color_flag; 
    
    if (color_flag == true) {
        document.getElementById("funcolors").classList.add("hover-effects"); 
    } else {
        document.getElementById("funcolors").classList.remove("hover-effects"); 
    }
    
    clear_grid();
}

function random_sketch() {

    random_flag = !random_flag;
    
    if (random_flag == true) {
        document.getElementById("random").classList.add("hover-effects"); 
    } else {
        document.getElementById("random").classList.remove("hover-effects"); 
    }
    
    clear_grid();    
}


const grid_height = 640;
const grid_width = 640;

// for a sample 640x640 board its 640/16 = 40x40 for each box



// https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript
// Taken from here ^
function generate_random_color() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}


function construct_16_grid(m, n) {
    document.getElementById("size").innerText = "Current Size: " + current_m + "x" + current_n 
                                                + "\nColor-mode: " + color_flag
                                                + "\nRandom-mode: " + random_flag; 
    
    for(let i = 1; i <= m; i++) {
        var row_div = document.createElement("div");
        row_div.setAttribute("class", "row-divs");
        
        let row_idx = "row_div" + i;
        
        row_div.setAttribute("id", row_idx);
        document.getElementById("etch-container").appendChild(row_div);
        
        for (let j = 1; j <= n; j++) {
            var div = document.createElement("div");
            div.setAttribute("class", "grid-divs");
    

            if (random_flag == true) {
                random_color = generate_random_color();
                
                let new_string = "this.style.background=" + random_color + ";";                
                div.style.backgroundColor = random_color;
                
            } else if (random_flag == false && color_flag == false) {
                div.setAttribute("onmouseover", "this.style.background='gray';");
            } else if (random_flag == false && color_flag == true) {
                random_color = generate_random_color();
                
                
                
                let string = "this.style.background='" + random_color + "';";                
                div.setAttribute("onmouseover", string);
            }
            
            div.style.height = grid_height / current_m + "px";
            div.style.width = grid_width / current_n + "px";
            
            document.getElementById(row_idx).appendChild(div);
        }
    }
}

function reset_btn() {
    color_flag = false;
    random_flag = false;
    current_m = 16;
    current_n = 16;
    document.getElementById("funcolors").classList.remove("hover-effects"); 
    document.getElementById("random").classList.remove("hover-effects"); 

    clear_grid();
}

function clear_grid() {
    
    document.getElementById("etch-container").innerHTML = "";
    construct_16_grid(current_m, current_n);
}

function prompt_change_grid() {
     
     var input = prompt("Please enter grid size:", "16x16");
     
     var input_array = input.split('x');
     
     if (input_array[0] >= 100 || input_array >= 100) {
         if(confirm("This might be slow, Are you sure?") == false) {
             prompt_change_grid();
         }
     }
     
     
     if (isNaN(input_array[0]) == false && isNaN(input_array[1]) == false) {
     
         current_m = input_array[0];
         current_n = input_array[1];
    
         clear_grid();
     } else {
         current_m = 16;
         current_n = 16;
         
         clear_grid();
     }
}