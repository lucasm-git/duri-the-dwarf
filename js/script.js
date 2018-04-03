


// Having one tile prototype, that will have variations :
//      U - empty tile (unvisited)
//      R - rock tile
//      P - player
//      T - treasure



///////////////////////////////////////////////////////
//////////////// GAME CREATOR FUNCTION ////////////////

function Game() {
    this.board = [
        ["U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U"],
        ["U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U"],
        ["U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U"],
        ["U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U"],
        ["U", "U", "U", "U", "U", "R", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U"],
        ["U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U"],
        ["U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U"],
        ["U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U"],
        ["U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U"],
        ["U", "U", "U", "U", "U", "U", "U", "U", "U", "P", "U", "U", "U", "U", "U", "U", "U", "U", "U"],
        ["U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U"],
        ["U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U"],
        ["U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U"],
        ["U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U"],
        ["U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U"],
        ["U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U"],
        ["U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U"],
        ["U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U"],
        ["U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U"]
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
    else {
        console.log( "Player moved up!" );
        this.player.y = this.player.y - 1;
        this.board[this.player.y][this.player.x] = "P";        
        this.board[this.player.y + 1][this.player.x] = "V";
    }
};

Game.prototype.moveDown = function() {
    if( this.player.y == this.board.length -1 ) {
        console.log( "Can't go there!" );
    }
    else if(this.board[this.player.y + 1][this.player.x] === "R" ) {
        console.log( "Can't touch this!" );
    }
    else {
        console.log( "Player moved down!" );
        this.player.y = this.player.y + 1;
        this.board[this.player.y][this.player.x] = "P";    
        this.board[this.player.y - 1][this.player.x] = "V";
    }
};

Game.prototype.moveLeft = function() {
    if( this.player.x == 0 ) {
        console.log( "Can't go there!" );
    }
    else if(this.board[this.player.y][this.player.x - 1] === "R" ) {
        console.log( "Can't touch this!" );
    }
    else {
        console.log( "Player moved left!" );
        this.player.x = this.player.x - 1;
        this.board[this.player.y][this.player.x] = "P";    
        this.board[this.player.y][this.player.x + 1] = "V";
    }
};

Game.prototype.moveRight = function() {
    if( this.player.x == this.board.length -1 ) {
        console.log( "Can't go there!" );
    }
    else if(this.board[this.player.y][this.player.x + 1] === "R" ) {
        console.log( "Can't touch this!" );
    }
    else {
        console.log( "Player moved right!" );
        this.player.x = this.player.x + 1;
        this.board[this.player.y][this.player.x] = "P";    
        this.board[this.player.y][this.player.x - 1] = "V";
    }
};



/////////////////////////////////////////////////////////
//////////////// PLAYER MOVE KEYBINDINGS ////////////////

var body = document.querySelector( "body" );
body.onkeydown = function() {

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
        }
    }
}
updateBoard();

// player.board.forEach( function( row ) {
//     row.forEach( function( tile ) {
//         if( tile == "P" ) {
//             tile.addClass( "player" );
//         }
//     });
// });


// var x = player.player.x
// var y = player.player.y
// var playerPos = $( "player.board" )[y][x];
// console.log(playerPos);

