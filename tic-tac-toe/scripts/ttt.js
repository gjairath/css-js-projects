// CSS/UTILITY/UI.
function construct_grid(size) {
    
    div_grid = document.getElementById("full-board");
        
    for (let i = 0; i < size / 3; i++) {
        var row_div = document.createElement("div");
        row_div.setAttribute("class", "row-divs");
        
        let row_idx = "row_div" + i;
        
        row_div.setAttribute("id", row_idx);
        div_grid.appendChild(row_div);

        for (let j = 0; j < size / 3; j++) {
            var div = document.createElement("div");
            div.setAttribute("class", "boxs-div");
            
            // make button so each box is click-able
            var btn = document.createElement("button");
            btn.setAttribute("class", "boxs-btns");
                    // 3*i + j is accumulator.
            btn.setAttribute("id", 3*i + j);
            
            btn.innerText = "";
            btn.onclick = placeMarker;
            
            div.appendChild(btn);
            document.getElementById(row_idx).appendChild(div);
        }
        
    }
    
    feedback_div.innerText =  `PLAYER: ${currentPlayer.get_player().marker}\n\nPlayer Vs Player Mode: ${manual_play}`;    

}


function placeMarker(){

    // TODO: change this to whatever prompted by user.
        
    if(this.innerText != "") {
        feedback_div.innerText = `There's already a marker there!\n\nPLAYER: ${currentPlayer.get_player().marker}\n\nPlayer Vs Player Mode: ${manual_play}`;
        return;
    }
    
    let cell_idx = parseInt(this.id);
    
    
    gameBoard.update_board(cell_idx, currentPlayer.get_player().marker);
    
    // Decide if termination should happen.
    if (checkTerminal(currentPlayer.get_player().marker) == true) {
        feedback_div.innerText = `${currentPlayer.get_player().marker} Won!`;
        game_over = true;
    } 
    
    // Swap the player
    if (manual_play == true && game_over != true) {
        currentPlayer.swap_player();
    } else if (game_over == false) {
        makeComputerMove();
    }
    
    if (game_over == false) 
        feedback_div.innerText =  `PLAYER: ${currentPlayer.get_player().marker}\n\nPlayer Vs Player Mode: ${manual_play}`;    
}

function makeComputerMove(){

    var av_moves = [];
    let curr_board = gameBoard.get_board();
    
    for(i = 0; i < curr_board.length; i++) {
        
        if (curr_board[i] == "") {
            av_moves.push(i);
        }
    }

    // This much de duplication ... I can live with it.
    let random_idx = av_moves[Math.floor(Math.random() * av_moves.length)];
    
    let computer_marker = "o";
    if (currentPlayer.get_player().marker == "x") {
        computer_marker = "o";
    } else {
        computer_marker = "x";
    }
    
    gameBoard.update_board(random_idx, computer_marker);

    // Decide if termination should happen.
    if (checkTerminal(computer_marker) == true) {
        feedback_div.innerText = `Computer Won!`;
        game_over = true;
    }
}
 

function checkTerminal(p) {
    
    // i dont want to write this again and again.
    var b = gameBoard.get_board();
        
    if (b[0] == p && b[1] == p && b[2] == p ||
        b[3] == p && b[4] == p && b[5] == p ||
        b[6] == p && b[7] == p && b[8] == p){
        
        strike_through('row', p);
        return true;
    }
        
    // Check columns
    if (b[0] == p && b[3] == p && b[6] == p ||
        b[1] == p && b[4] == p && b[7] == p ||
        b[2] == p && b[5] == p && b[8] == p) {
        
        strike_through('col', p);
        return true;    
    }

    // diagonals
    if (b[0] == p && b[4] == p && b[8] == p || b[2] == p && b[4] == p && b[6] == p){
        strike_through('diag', p);
        return true;
    }

    return false;
}

function reset(){
    document.getElementById("full-board").innerHTML = "";

    gameBoard.reset();
    currentPlayer.reset();
        
    construct_grid(gameBoard.get_size());
    game_over = false;
}

function add_class_box(i, j, k, class_name) {
    box_divs[i].classList.add(class_name);
    box_divs[j].classList.add(class_name);
    box_divs[k].classList.add(class_name);
}

function strike_through(linear_line, winner){

    // strike through terminal condition
    if (linear_line == "diag") {        
        // check main or off diag
        if (box_divs[0].innerText == winner) {
            // main diag
            add_class_box(4, 0, 8, "strike-main-diag")
        } else {
            add_class_box(2, 4, 6, "strike-off-diag")
        }   
    }
    
    
    if (linear_line == "row") {
        if (box_divs[0].innerText == winner) {
            // row 1
            add_class_box(0, 1, 2, "strike-row")
        }
    
        if (box_divs[3].innerText == winner) {
            // row 1
            add_class_box(3, 4, 5, "strike-row")
        }
        
        
        if (box_divs[6].innerText == winner) {
            // row 1
            add_class_box(6, 7, 8, "strike-row")
        }
        
    }
    
        
    if (linear_line == "col") {
        if (box_divs[0].innerText == winner) {
            // row 1
            add_class_box(0, 3, 6, "strike-col")
        }
    
        if (box_divs[1].innerText == winner) {
            // row 1
            add_class_box(1, 4, 7, "strike-col")
        }
        
        if (box_divs[2].innerText == winner) {
            // row 1
            add_class_box(2, 5, 8, "strike-col")
        }
        
    }

    
    
}

// MAIN -- DRIVING CODE.
    // Naming convention I hope I follow.                           <What is love?>
        // Fuctions/objects/factories/etc.                          Camel
        // Rest                                                     Underscore


// array of boxes inside the row-divs.
const box_divs = document.getElementsByClassName("boxs-div");
const feedback_div = document.getElementById("feedback-div");

var manual_play = false;
var game_over = false;

function toggle_computer() {
    manual_play = !manual_play;
    feedback_div.innerText =  `PLAYER: ${currentPlayer.get_player().marker}\n\nPlayer Vs Player Mode: ${manual_play}`;    
}

function change_marker() {
    // X becomes O and vice versa.
    currentPlayer.swap_player();
    feedback_div.innerText =  `PLAYER: ${currentPlayer.get_player().marker}\n\nPlayer Vs Player Mode: ${manual_play}`;    

}

// Factory function for X
const playerX = () => {
    const marker = "x";
    const turn = true;    
    
    return {marker, turn};
}

const playerO = () => {
    const marker = "o";
    const turn = false;
    
    return {marker, turn};
}

const currentPlayer = (() => {

    var player = playerX();
    const swap_player = () => {        
        if (player.marker === playerX().marker) {
            player = playerO();
        } else {
            player = playerX();        
        }
    }
    
    const get_player = () => {return player};
    
    const reset = () => {player = playerX();}
    
    
    return {player, swap_player, get_player, reset};

})();

const gameBoard = (() => {
    var size = 9; // 3x3 board.
    var board = new Array(size);
    
    const get_size = () => size;
    const set_size = (new_size) => {
        size = new_size;    
        board = new Array(size);
    }
    
    const get_board = () => {
        return board;
    }
    const set_board = (new_board) => {
        board = new_board.slice();
    }
    
    const reset = () => {
        var random_board = ['', '', '', '', '', '', '', '', ''];
        gameBoard.set_board(random_board);
    }
    
    
    const print_size = () => console.log(size);
    const print_board = () => console.log(board);
    
    const update_board = (idx, player) => {
        // player should be object to access marker.
        // idx should be the idx of the cell.
        
        board[idx] = player;
        
        display_board_on_screen();
    } 
    
    const display_board_on_screen = () => {
        for (let i = 0; i < box_divs.length; i++) {
            // update the display.
            box_divs[i].children[0].innerHTML = board[i];
        }
    }
    
    return {board, size, set_size, get_board, set_board, get_size, reset,
            print_size, print_board, update_board, display_board_on_screen};

})();

function testBoard() {
    
    var random_board = ['', '', '', '', '', '', '', '', ''];
    gameBoard.set_board(random_board);
    
    construct_grid(gameBoard.size);
    
    gameBoard.display_board_on_screen(random_board);
}

testBoard();
