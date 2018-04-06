


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
        direction: "down"
    };
};

var player = new Game();



///////////////////////////////////////////////////////
//////////////// PLAYER MOVE FUNCTIONS ////////////////

function cantGo() {
    $( "#cant-stone" ).hide();
    $( "#there-yet" ).hide();
    $( "#my-feet" ).hide();
    $( "#cant-go" ).hide();
    $( "#cant-go" ).toggle();
    $( "#cant-go" ).delay(1500).fadeOut();
}

function cantStone() {
    $( "#cant-go" ).hide();
    $( "#there-yet" ).hide();
    $( "#my-feet" ).hide();
    $( "#cant-stone" ).hide();
    $( "#cant-stone" ).toggle();
    $( "#cant-stone" ).delay(1500).fadeOut();
}


function spriteUp() {
    player.player.direction = "up";
}

function spriteDown() {
    player.player.direction = "down";
}

function spriteLeft() {
    player.player.direction = "left";
}

function spriteRight() {
    player.player.direction = "right";
}


Game.prototype.moveUp = function() {
    $( ".player" ).css({ "background-image": "" });
    if( this.player.y == 0 ) {
        cantGo();
    }
    else if(this.board[this.player.y - 1][this.player.x] === "R" ) {
        cantStone();
    }
    else if(this.board[this.player.y - 1][this.player.x] === "T" ) {
        alert("Yeehah!\nYou found the treasure!");
        location.reload();
    }
    else {
        this.player.y = this.player.y - 1;
        this.board[this.player.y][this.player.x] = "P";
        this.board[this.player.y + 1][this.player.x] = "V";
    }
    $( ".movements-left" ).text( moveCounter );
    if(this.board[9][9] !== "P") {
        this.board[9][9] = "E";
    }
    spriteUp();
};

Game.prototype.moveDown = function() {
    $( ".player" ).css({ "background-image": "" });
    if( this.player.y == this.board.length -1 ) {
        cantGo();
    }
    else if(this.board[this.player.y + 1][this.player.x] === "R" ) {
        cantStone();
    }
    else if(this.board[this.player.y + 1][this.player.x] === "T" ) {
        alert("Yeehah!\nYou found the treasure!");
        location.reload();
    }
    else {
        this.player.y = this.player.y + 1;
        this.board[this.player.y][this.player.x] = "P";    
        this.board[this.player.y - 1][this.player.x] = "V";
    }
    $( ".movements-left" ).text( moveCounter );
    if(this.board[9][9] !== "P") {
        this.board[9][9] = "E";
    }
    spriteDown();
};

Game.prototype.moveLeft = function() {
    $( ".player" ).css({ "background-image": "" });
    if( this.player.x == 0 ) {
        cantGo();
    }
    else if(this.board[this.player.y][this.player.x - 1] === "R" ) {
        cantStone();
    }
    else if(this.board[this.player.y][this.player.x - 1] === "T" ) {
        alert("Yeehah!\nYou found the treasure!");
        location.reload();
    }
    else {
        this.player.x = this.player.x - 1;
        this.board[this.player.y][this.player.x] = "P";    
        this.board[this.player.y][this.player.x + 1] = "V";
    }
    $( ".movements-left" ).text( moveCounter );
    if(this.board[9][9] !== "P") {
        this.board[9][9] = "E";
    }
    spriteLeft();
};

Game.prototype.moveRight = function() {
    $( ".player" ).css({ "background-image": "" });
    if( this.player.x == this.board.length -1 ) {
        cantGo();
    }
    else if(this.board[this.player.y][this.player.x + 1] === "R" ) {
        cantStone();
    }
    else if(this.board[this.player.y][this.player.x + 1] === "T" ) {
        alert("Yeehah!\nYou found the treasure!");
        location.reload();
    }
    else {
        this.player.x = this.player.x + 1;
        this.board[this.player.y][this.player.x] = "P";    
        this.board[this.player.y][this.player.x - 1] = "V";
    }
    $( ".movements-left" ).text( moveCounter );
    if(this.board[9][9] !== "P") {
        this.board[9][9] = "E";
    }
    spriteRight();
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
    removeOos();
    countdown();
    
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
            if( (player.board[i][j] == "P") && (player.player.direction == "up") ) {
                $( "#" + i + "-" + j ).addClass( "player" );
                $( ".player" ).css({ "background-image": "url('./images/dwarf/sprite-up.png')" });
            }
            if( (player.board[i][j] == "P") && (player.player.direction == "down") ) {
                $( "#" + i + "-" + j ).addClass( "player" );
                $( ".player" ).css({ "background-image": "url('./images/dwarf/sprite-down.png')" });
            }
            if( (player.board[i][j] == "P") && (player.player.direction == "left") ) {
                $( "#" + i + "-" + j ).addClass( "player" );
                $( ".player" ).css({ "background-image": "url('./images/dwarf/sprite-left.png')" });
            }
            if( (player.board[i][j] == "P") && (player.player.direction == "right") ) {
                $( "#" + i + "-" + j ).addClass( "player" );
                $( ".player" ).css({ "background-image": "url('./images/dwarf/sprite-right.png')" });
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
            if( player.board[i][j] == "V" ) {
                $( "#" + i + "-" + j ).addClass( "visited" );
            }
            if( player.board[i][j] == "VR" ) {
                $( "#" + i + "-" + j ).addClass( "v-rock" );
            }
        }
    }
    removeOos();
}
updateBoard();


function removeOos() {
    $( ".tile" ).addClass( "oos" );

    $( "#" + (player.player.y) + "-" + (player.player.x) ).removeClass( "oos" );
    $( "#" + (player.player.y-1) + "-" + (player.player.x) ).removeClass( "oos" );
    $( "#" + (player.player.y-2) + "-" + (player.player.x) ).removeClass( "oos" );
    $( "#" + (player.player.y+1) + "-" + (player.player.x) ).removeClass( "oos" );
    $( "#" + (player.player.y+2) + "-" + (player.player.x) ).removeClass( "oos" );
    $( "#" + (player.player.y) + "-" + (player.player.x-1) ).removeClass( "oos" );
    $( "#" + (player.player.y) + "-" + (player.player.x-2) ).removeClass( "oos" );
    $( "#" + (player.player.y) + "-" + (player.player.x+1) ).removeClass( "oos" );
    $( "#" + (player.player.y) + "-" + (player.player.x+2) ).removeClass( "oos" );
    $( "#" + (player.player.y-1) + "-" + (player.player.x-1) ).removeClass( "oos" );
    $( "#" + (player.player.y+1) + "-" + (player.player.x+1) ).removeClass( "oos" );
    $( "#" + (player.player.y-1) + "-" + (player.player.x+1) ).removeClass( "oos" );
    $( "#" + (player.player.y+1) + "-" + (player.player.x-1) ).removeClass( "oos" );

    if( $( "#" + (player.player.y-1) + "-" + (player.player.x) ).hasClass( "rock" ) ) {
        $( "#" + (player.player.y-1) + "-" + (player.player.x) ).addClass( "v-rock" );
    }
    if( $( "#" + (player.player.y-2) + "-" + (player.player.x) ).hasClass( "rock" ) ) {
        $( "#" + (player.player.y-2) + "-" + (player.player.x) ).addClass( "v-rock" );
    }
    if( $( "#" + (player.player.y+1) + "-" + (player.player.x) ).hasClass( "rock" ) ) {
        $( "#" + (player.player.y+1) + "-" + (player.player.x) ).addClass( "v-rock" );
    }
    if( $( "#" + (player.player.y+2) + "-" + (player.player.x) ).hasClass( "rock" ) ) {
        $( "#" + (player.player.y+2) + "-" + (player.player.x) ).addClass( "v-rock" );
    }
    if( $( "#" + (player.player.y) + "-" + (player.player.x-1) ).hasClass( "rock" ) ) {
        $( "#" + (player.player.y) + "-" + (player.player.x-1) ).addClass( "v-rock" );
    }
    if( $( "#" + (player.player.y) + "-" + (player.player.x-2) ).hasClass( "rock" ) ) {
        $( "#" + (player.player.y) + "-" + (player.player.x-2) ).addClass( "v-rock" );
    }
    if( $( "#" + (player.player.y) + "-" + (player.player.x+1) ).hasClass( "rock" ) ) {
        $( "#" + (player.player.y) + "-" + (player.player.x+1) ).addClass( "v-rock" );
    }
    if( $( "#" + (player.player.y) + "-" + (player.player.x+2) ).hasClass( "rock" ) ) {
        $( "#" + (player.player.y) + "-" + (player.player.x+2) ).addClass( "v-rock" );
    }
    if( $( "#" + (player.player.y-1) + "-" + (player.player.x-1) ).hasClass( "rock" ) ) {
        $( "#" + (player.player.y-1) + "-" + (player.player.x-1) ).addClass( "v-rock" );
    }
    if( $( "#" + (player.player.y+1) + "-" + (player.player.x+1) ).hasClass( "rock" ) ) {
        $( "#" + (player.player.y+1) + "-" + (player.player.x+1) ).addClass( "v-rock" );
    }
    if( $( "#" + (player.player.y-1) + "-" + (player.player.x+1) ).hasClass( "rock" ) ) {
        $( "#" + (player.player.y-1) + "-" + (player.player.x+1) ).addClass( "v-rock" );
    }
    if( $( "#" + (player.player.y+1) + "-" + (player.player.x-1) ).hasClass( "rock" ) ) {
        $( "#" + (player.player.y+1) + "-" + (player.player.x-1) ).addClass( "v-rock" );
    }
}




/////////////////////////////////////////////////
//////////////// MOVEMENTS LEFT /////////////////

var moveCounter = 100;
$( ".movements-left" ).text( moveCounter );

function countdown() {
    moveCounter--;
    if( moveCounter === 60 ) {
        $( "#cant-stone" ).hide();
        $( "#cant-go" ).hide();
        $( "#my-feet" ).hide();
        $( "#there-yet" ).toggle();
        $( "#there-yet" ).delay( 1500 ).fadeOut();
    }
    if( moveCounter === 25 ) {
        $( "#cant-stone" ).hide();
        $( "#cant-go" ).hide();
        $( "#there-yet" ).hide();
        $( "#my-feet" ).toggle();
        $( "#my-feet" ).delay( 1500 ).fadeOut();
    }
    if( moveCounter < 0 ) {
        alert( "You run out of movement points!\nTry again!");
        location.reload();
    };
}




///////////////////////////////////////////////
//////////////// CHAT BUBBLES /////////////////

$( "#cant-go" ).hide();
$( "#cant-stone" ).hide();
$( "#my-feet" ).hide();
$( "#there-yet" ).hide();
