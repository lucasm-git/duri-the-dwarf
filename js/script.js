


// Having one tile prototype, that will have variations :
//      U - empty tile (unvisited)
//      V - empty tile (visited)
//      R - rock tile
//      P - player
//      T - treasure



///////////////////////////////////////////////////////
//////////////// GAME CREATOR FUNCTION ////////////////

function Game() {
    this.board = [
        ["U", "R", "U", "U", "U", "R", "U", "R", "U", "U", "U", "U", "R", "U", "U", "U", "U", "U", "R"],
        ["U", "R", "U", "U", "U", "U", "U", "R", "U", "R", "U", "U", "R", "U", "U", "R", "U", "U", "R"],
        ["U", "U", "U", "R", "U", "R", "U", "R", "U", "R", "R", "U", "R", "U", "R", "U", "R", "U", "R"],
        ["U", "U", "R", "U", "U", "R", "U", "U", "U", "R", "R", "U", "R", "T", "R", "U", "R", "U", "U"],
        ["U", "U", "R", "U", "U", "R", "U", "U", "R", "U", "U", "U", "R", "R", "R", "U", "R", "R", "U"],
        ["U", "R", "R", "U", "U", "R", "U", "R", "U", "U", "R", "U", "U", "U", "R", "U", "U", "U", "U"],
        ["U", "R", "R", "R", "U", "R", "U", "U", "U", "U", "U", "R", "R", "U", "U", "U", "R", "R", "R"],
        ["U", "R", "U", "U", "U", "R", "U", "U", "R", "R", "U", "U", "R", "U", "U", "R", "U", "U", "U"],
        ["U", "U", "U", "U", "U", "R", "U", "R", "U", "U", "U", "U", "U", "R", "U", "U", "U", "R", "U"],
        ["U", "U", "R", "R", "R", "R", "U", "R", "U", "P", "U", "R", "U", "R", "U", "R", "R", "R", "U"],
        ["U", "U", "U", "U", "U", "R", "U", "R", "U", "U", "U", "R", "U", "U", "U", "R", "R", "U", "U"],
        ["R", "R", "R", "R", "U", "R", "U", "U", "U", "U", "R", "R", "R", "R", "R", "U", "U", "U", "R"],
        ["U", "U", "U", "U", "U", "U", "R", "R", "U", "U", "U", "R", "R", "U", "U", "U", "U", "R", "U"],
        ["U", "R", "R", "R", "R", "U", "U", "R", "R", "U", "U", "U", "U", "U", "U", "R", "U", "U", "R"],
        ["U", "U", "R", "R", "R", "U", "U", "R", "U", "U", "R", "R", "R", "R", "U", "R", "U", "U", "R"],
        ["U", "U", "U", "R", "R", "U", "U", "R", "U", "R", "R", "U", "U", "U", "U", "R", "U", "R", "U"],
        ["R", "U", "U", "U", "U", "U", "U", "U", "U", "R", "R", "U", "R", "U", "U", "R", "U", "R", "U"],
        ["R", "R", "U", "R", "R", "U", "R", "R", "U", "U", "U", "U", "U", "R", "U", "R", "U", "U", "U"],
        ["R", "R", "U", "U", "U", "R", "U", "U", "U", "U", "R", "R", "U", "U", "R", "R", "U", "R", "U"]
        ];
    this.player = {
        y: 9,
        x: 9,
    };
};

var player = new Game();



///////////////////////////////////////////////////////
//////////////// PLAYER MOVE FUNCTIONS ////////////////

Game.prototype.moveUp = function() {
    if( this.player.y == 0 ) {
        console.log( "Can't go there!" );
    }
    else if(this.board[this.player.y - 1][this.player.x] === "R" ) {
        console.log( "Can't touch this!" );
    }
    else if(this.board[this.player.y - 1][this.player.x] === "T" ) {
        alert("Yeehah!\nYou found the treasure!");
        location.href = "file:///Users/ingvar/Documents/Ironhack/3.Projects/1.Browser-game/index.html";
    }
    else {
        console.log( "Player moved up!" );
        this.player.y = this.player.y - 1;
        this.board[this.player.y][this.player.x] = "P";        
        this.board[this.player.y + 1][this.player.x] = "V";
    }
    $( ".movements-left" ).text( moveCounter );
    this.board[9][9] = "E";
};

Game.prototype.moveDown = function() {
    if( this.player.y == this.board.length -1 ) {
        console.log( "Can't go there!" );
    }
    else if(this.board[this.player.y + 1][this.player.x] === "R" ) {
        console.log( "Can't touch this!" );
    }
    else if(this.board[this.player.y + 1][this.player.x] === "T" ) {
        alert("Yeehah!\nYou found the treasure!");
        location.href = "file:///Users/ingvar/Documents/Ironhack/3.Projects/1.Browser-game/index.html";
    }
    else {
        console.log( "Player moved down!" );
        this.player.y = this.player.y + 1;
        this.board[this.player.y][this.player.x] = "P";    
        this.board[this.player.y - 1][this.player.x] = "V";
    }
    $( ".movements-left" ).text( moveCounter );
    this.board[9][9] = "E";
};

Game.prototype.moveLeft = function() {
    if( this.player.x == 0 ) {
        console.log( "Can't go there!" );
    }
    else if(this.board[this.player.y][this.player.x - 1] === "R" ) {
        console.log( "Can't touch this!" );
    }
    else if(this.board[this.player.y][this.player.x - 1] === "T" ) {
        alert("Yeehah!\nYou found the treasure!");
        location.href = "file:///Users/ingvar/Documents/Ironhack/3.Projects/1.Browser-game/index.html";
    }
    else {
        console.log( "Player moved left!" );
        this.player.x = this.player.x - 1;
        this.board[this.player.y][this.player.x] = "P";    
        this.board[this.player.y][this.player.x + 1] = "V";
    }
    $( ".movements-left" ).text( moveCounter );
    this.board[9][9] = "E";
};

Game.prototype.moveRight = function() {
    if( this.player.x == this.board.length -1 ) {
        console.log( "Can't go there!" );
    }
    else if(this.board[this.player.y][this.player.x + 1] === "R" ) {
        console.log( "Can't touch this!" );
    }
    else if(this.board[this.player.y][this.player.x + 1] === "T" ) {
        alert("Yeehah!\nYou found the treasure!");
        location.href = "file:///Users/ingvar/Documents/Ironhack/3.Projects/1.Browser-game/index.html";
    }
    else {
        console.log( "Player moved right!" );
        this.player.x = this.player.x + 1;
        this.board[this.player.y][this.player.x] = "P";    
        this.board[this.player.y][this.player.x - 1] = "V";
    }
    $( ".movements-left" ).text( moveCounter );
    this.board[9][9] = "E";
};



/////////////////////////////////////////////////////////
//////////////// PLAYER MOVE KEYBINDINGS ////////////////

var body = document.querySelector( "body" );
body.onkeydown = function() {
    countdown();

    switch (event.keyCode) {
        
        case 90: // Z key
        case 38: // up arrow
        player.moveUp();
        break;
        
        case 83: // S key
        case 40: // down arrow
        player.moveDown();
        break;
        
        case 81: // A key
        case 37: // left arrow
        player.moveLeft();
        break;
        
        case 68: // D key
        case 39: // right arrow
        player.moveRight();
        break;
    };

    updateBoard();
    // removeOos();
    
};



//////////////////////////////////////////////////////////
//////////////// CREATING GAME BOARD DIVS ////////////////

for( var i = 0; i < 19; i++ ) {
    for( var j = 0; j < 19; j++ ) {
        var newDiv = $( "<div id='" + i + "-" + j + "' class='tile'></div>" );
        $( ".game-field" ).append( newDiv );
    }
}




//////////////////////////////////////////////////////////
//////////////// GIVING TILES APPEARANCE /////////////////

function updateBoard() {
    $( ".tile" ).removeClass( "player" );
    $( ".tile" ).removeClass( "unvisited" );
    $( ".tile" ).addClass( "oos" );
    
    for( var i = 0; i < 19; i++ ) {
        for( var j = 0; j < 19; j++ ) {
            if( player.board[i][j] == "P" ) {
                console.log("#" + i + "-" + j);
                $( "#" + i + "-" + j ).addClass( "player" );
            }
            if( player.board[i][j] == "U" ) {
                $( "#" + i + "-" + j ).addClass( "unvisited" );
            }
            if( player.board[i][j] == "R" ) {
                $( "#" + i + "-" + j ).addClass( "rock" );
            }
            if( player.board[i][j] == "T" ) {
                $( "#" + i + "-" + j ).addClass( "treasure" );
            }
            if( player.board[i][j] == "E" ) {
                $( "#" + i + "-" + j ).addClass( "entrance" );
            }
            if( player.board[i+1][j] == "P" ) {
                $( "#" + i + "-" + j ).removeClass( "oos" );
            }
            if( player.board[i+2][j] == "P" ) {
                $( "#" + i + "-" + j ).removeClass( "oos" );
            }
            if( player.board[i][j+1] == "P" ) {
                $( "#" + i + "-" + j ).removeClass( "oos" );
            }
            if( player.board[i][j+2] == "P" ) {
                $( "#" + i + "-" + j ).removeClass( "oos" );
            }
            if( player.board[i+1][j+1] == "P" ) {
                $( "#" + i + "-" + j ).removeClass( "oos" );
            }
            if( player.board[i][j] == "V" ) {
                $( "#" + i + "-" + j ).removeClass( "oos" );
            }
            // $( "#" + i + "-" + j ).removeClass( "oos" );
            // $( "#" + i-1 + "-" + j ).removeClass( "oos" );
            // $( "#" + i-2 + "-" + j ).removeClass( "oos" );
            // $( "#" + i+1 + "-" + j ).removeClass( "oos" );
            // $( "#" + i+2 + "-" + j ).removeClass( "oos" );
            // $( "#" + i + "-" + j-1 ).removeClass( "oos" );
            // $( "#" + i + "-" + j-2 ).removeClass( "oos" );
            // $( "#" + i + "-" + j+1 ).removeClass( "oos" );
            // $( "#" + i + "-" + j+2 ).removeClass( "oos" );
            // $( "#" + i-1 + "-" + j-1 ).removeClass( "oos" );
            // $( "#" + i-1 + "-" + j+1 ).removeClass( "oos" );
            // $( "#" + i+1 + "-" + j-1 ).removeClass( "oos" );
            // $( "#" + i+1 + "-" + j+1 ).removeClass( "oos" );
        }
    }
}
updateBoard();

// function removeOos() {
//     player.board[player.y][player.x].removeClass( "oos" );
//     player.board[player.y-1][player.x].removeClass( "oos" );
//     player.board[player.y-2][player.x].removeClass( "oos" );
//     player.board[player.y+1][player.x].removeClass( "oos" );
//     player.board[player.y+2][player.x].removeClass( "oos" );
//     player.board[player.y][player.x-1].removeClass( "oos" );
//     player.board[player.y][player.x-2].removeClass( "oos" );
//     player.board[player.y][player.x+1].removeClass( "oos" );
//     player.board[player.y][player.x+2].removeClass( "oos" );
//     player.board[player.y-1][player.x-1].removeClass( "oos" );
//     player.board[player.y-1][player.x+1].removeClass( "oos" );
//     player.board[player.y+1][player.x-1].removeClass( "oos" );
//     player.board[player.y+1][player.x+1].removeClass( "oos" );
// }
// removeOos();




/////////////////////////////////////////////////
//////////////// MOVEMENTS LEFT /////////////////

var moveCounter = 100;
$( ".movements-left" ).text( moveCounter );

function countdown() {
    moveCounter--;
    if( moveCounter < 0 ) {
        alert( "You run out of movement points!\nTry again!");
        location.href = "file:///Users/ingvar/Documents/Ironhack/3.Projects/1.Browser-game/index.html";
    };
}