var buttons = document.getElementsByClassName("buttons-calculation");
var screen = document.getElementById("text-display");


var operator_one = 0;
var operator_two = 0;
var operator = "";

var process_flag = false;
var operator_two_flag = false;

var last_result = 0;

var parsing_variable = {
    '/': function (x, y) { return x / y },
    'x': function (x, y) { return x * y},
    '-': function (x, y) { return x - y },
    '+': function (x, y) { return x + y }    
};

for (let i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    button.onclick = function() {
        Process(this);
    };
}

function isOperator(o){
    if (o == "+" || o == "/" || o == "-" || o == "x" || o == "+/-") {
        return true;
    }
    
    return false;
}

function Process(btn){
    
    
    // This is done to remove the characters from screen from operator
    if (isOperator(screen.innerText) == true) {
        clearScreen();
    }
    
    if (btn.innerText == "AC") {
        clearScreen();
        return;
    }
    
    if (btn.innerText == "+/-") {
        // invert sign
        screen.innerText = -1.00 * parseFloat(screen.innerText);    
    }
    
    if (btn.innerText == "/" || btn.innerText == "x" || btn.innerText == "-" || btn.innerText == "+") {
        process_flag = true;
        clearScreen();
        operator = btn.innerText;
        
        operator_two_flag = true;
        
    }
    
    if (btn.innerText == "=") {
        clearScreen();
        if (operator_one == "") {screen.innerText = last_result; return;}
        
        ret = parsing_variable[operator](parseFloat(operator_one), parseFloat(operator_two)).toFixed(2);
            // snarky message
        if (ret == Infinity) {
            screen.innerText = "bruh";
        } else {screen.innerText = ret;}
            
        last_result = screen.innerText;
        
        
        process_flag = false;
    }
    
    if (btn.innerText != "=" && btn.innerText != "+/-"){screen.innerText += btn.innerText;}
    
    if (process_flag == false) {operator_one = screen.innerText;}
    else {operator_two = screen.innerText;}
}





// ================================ Processing mill below =================================

function clearScreen() {
    screen.innerText = "";
    if (process_flag == false) {operator_one = screen.innerText;}
}