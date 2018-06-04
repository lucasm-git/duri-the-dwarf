


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
        ["U", "U", "R", "U", "U", "R", "U", "U", "U", "R", "R", "U", "R", "U", "R", "U", "R", "U", "U"],
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
    /// used to prevent user from moving without choosing diff
    this.difficultySelected = false;
    this.movesChosen = 100;
    /// used to determine when to stop decrement for bumping stone
    this.touchedRock = false;    
};
var player = new Game();





/////////////////////////////////////////////////////////
////////////// ADDITIONS BY CAMERON SKENE ///////////////

// difficulty setting:
// easy difficulty: 100 moves
// normal difficulty: 80 moves
// hard difficulty: 50 moves 
// Note: this range of numbers skews lower than default 100 
// because I am removing moves left penalty for repeatedly trying 
// to move through rock. Justification: Duri is a dwarf and should know he 
// can't move through rock and thus won't waste the effort trying.

Game.prototype.setDifficulty = function () {
    /// hide score text
    $(".difficulty").children().toggleClass("hidden");
    /// insert three buttons for each difficulty
    var html = '<div class="btn-list">'
    html += '<button id="easy">Easy</button>'
    html += '<button id="normal">Normal</button>'
    html += '<button id="hard">Hard</button>'
    html += '</div>'
    $(".difficulty").append(html);
    
    var that = this;

    // on clicking 'easy'
    $("#easy").click(function () {
        /// allow user movement
        that.difficultySelected = true;
         /// toggling buttons off moves the Duri main image
        $(this).parent().toggle();
        $(".difficulty").children().toggleClass("hidden");
        moveCounter = 100; 
        that.movesChosen = 100;
        $( ".movements-left" ).text( moveCounter ); 
    });
        
    // on clicking 'normal'
    $("#normal").click(function () {
        /// allow user movement
        that.difficultySelected = true;
        /// toggling buttons off moves the Duri main image
        $(this).parent().toggle();
        $(".difficulty").children().toggleClass("hidden");
        moveCounter = 80; 
        that.movesChosen = 80;
        $( ".movements-left" ).text( moveCounter ); 
    });    

    // on clicking 'hard'
    $("#hard").click(function () {
        /// allow user movement
        that.difficultySelected = true;
         /// toggling buttons off moves the Duri main image
        $(this).parent().toggle();
        $(".difficulty").children().toggleClass("hidden");
        moveCounter = 50;
        that.movesChosen = 50; 
        $( ".movements-left" ).text( moveCounter );     
    });
};


// random treasure generator:
// move the treasure to a random open tile "U" OUTSIDE of five
// tiles in every direction of Duri's starting location
// eg treasure can only spawn rows 0-3, 15-18 incl, cols
// 0-3, 15-18 incl.
var treasureLocation = [];
Game.prototype.randomTreasure = function () {
    /// choose random row, col suitable for a 19x19 row board
    function random () {
        return Math.random() >= 0.5 ? Math.floor(Math.random() * (3 - 0) + 0) :
        Math.floor(Math.random() * (18 - 15) + 15);
    };
    var row = random();
    var col = random();
    
    // call until selection is "U"
    if (player.board[row][col] === "U") {
        player.board[row][col] = "T"
        treasureLocation = [row, col]
        return 0;
    }
    player.randomTreasure();
};
/// called at game start to hide treasure in a randomish location
player.randomTreasure();


// "hot or cold" hint system: 
// if Duri really can smell nearby crystals, he should be able to use
// his sense of smell while searching the cave.
// thus every ~~10~~ moves, a textbox will pop up from Duri saying whether
// the player has moved further away or closer to the crystal over the past
// ten moves. "I can't smell it as well over here" - "I can smell it better over here"
Game.prototype.hotOrCold = function () {
    /// using x axis differential plus y axis differential
    /// too complicated to calculate exactly how many moves it
    /// would take to get to the goal. Duri can smell through rocks.
    var distanceToGoal = Math.abs(player.player.y - treasureLocation[0]) + Math.abs(player.player.x - treasureLocation[0]);
    return distanceToGoal;
};




/////////////////////////////////////////////////////////
//////////////// CHAT BUBBLES & SCREENS /////////////////

$( "#cant-go" ).hide();
$( "#cant-stone" ).hide();
$( "#my-feet" ).hide();
$( "#there-yet" ).hide();

/// added bubbles for the hint sytem
$( "#cant-smell" ).hide();
$( "#can-smell" ).hide();

$( ".screen-container" ).hide();

function victory() {
    $( ".center-row" ).hide();
    $( ".screen-container" ).show();
}

$( ".screen-container" ).click( function() {
    location.reload();
})




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
        /// used to prevent moves left decrement
        this.touchedRock = true;
    }
    else if(this.board[this.player.y - 1][this.player.x] === "T" ) {
        victory();
        // alert("Yeehah!\nYou found the treasure!");
        // location.reload();
    }
    else {
        this.player.y = this.player.y - 1;
        this.board[this.player.y][this.player.x] = "P";
        this.board[this.player.y + 1][this.player.x] = "V";
    }
    /// moving countdown here, see line 60. 
    countdown();
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
        /// used to prevent moves left decrement
        this.touchedRock = true;
    }
    else if(this.board[this.player.y + 1][this.player.x] === "T" ) {
        victory();
        // alert("Yeehah!\nYou found the treasure!");
        // location.reload();
    }
    else {
        this.player.y = this.player.y + 1;
        this.board[this.player.y][this.player.x] = "P";    
        this.board[this.player.y - 1][this.player.x] = "V";
    }
    /// moving countdown here, see line 60. 
    countdown();
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
        /// used to prevent moves left decrement
        this.touchedRock = true;
    }
    else if(this.board[this.player.y][this.player.x - 1] === "T" ) {
        victory();
        // alert("Yeehah!\nYou found the treasure!");
        // location.reload();
    }
    else {
        this.player.x = this.player.x - 1;
        this.board[this.player.y][this.player.x] = "P";    
        this.board[this.player.y][this.player.x + 1] = "V";
    }
    /// moving countdown here, see line 60. 
    countdown();
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
        /// used to prevent moves left decrement
        this.touchedRock = true;
    }
    else if(this.board[this.player.y][this.player.x + 1] === "T" ) {
        victory();
        // alert("Yeehah!\nYou found the treasure!");
        // location.reload();
    }
    else {
        this.player.x = this.player.x + 1;
        this.board[this.player.y][this.player.x] = "P";    
        this.board[this.player.y][this.player.x - 1] = "V";
    }
    /// moving countdown here, see line 60. 
    countdown();
    $( ".movements-left" ).text( moveCounter );
    if(this.board[9][9] !== "P") {
        this.board[9][9] = "E";
    }
    spriteRight();
};



/////////////////////////////////////////////////////////
//////////////// PLAYER MOVE KEYBINDINGS ////////////////

var body = document.querySelector( "body" );
     
/// added event to function params to enable support in firefox
body.onkeydown = function(event) {
  
    /// prevent movement if no difficulty chosen
    if (player.difficultySelected) {
        switch (event.keyCode) {
            
            /// added keycodes for standard english QWERTY (WASD) keyboard

            case 90: // Z key
            case 87: /// added W key 
            case 38: // up arrow
            player.moveUp();
            break;
            
            case 83: // S key
            case 40: // down arrow
            player.moveDown();
            break;
            
            case 81: // A key
            case 65: /// added standard A keyCode
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

        /// calling countdown here means that every single
        /// keypress will decrement moves left, even walking
        /// into a rock. see above notes at line 60 for my
        /// justification for moving the function call
        /// into the player.moveXXX() method, rather than
        /// on keypress

        // countdown();


        /// add update to score total here - for some reason,
        /// it wasn't updating on the initail move, leading
        /// to a 1 move difference between the var moveCounter
        /// and what is displayed. frustrating!
        $( ".movements-left" ).text( moveCounter )
    }
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
/// call set difficulty method to generate buttons.
player.setDifficulty()
var moveCounter = 0;
$( ".movements-left" ).text( moveCounter );

function countdown() {
    /// adding conditional logic here to exclude decrement for
    /// walking into a rock. see line 60. 
    if (!player.touchedRock) {
        moveCounter--;
    };
    player.touchedRock = false;
    
    /// changed "there-yet" condition to be lower so it can fire
    /// on a "hard" game of only 50 moves
    if( moveCounter === 40 ) {
        $( "#cant-stone" ).hide();
        $( "#cant-go" ).hide();
        $( "#my-feet" ).hide();
        /// adding hint system bubbles 
        $( "#cant-smell" ).hide();
        $( "#can-smell" ).hide();
        $( "#there-yet" ).toggle();
        $( "#there-yet" ).delay( 1500 ).fadeOut();
    }
    if( moveCounter === 25 ) {
        $( "#cant-stone" ).hide();
        $( "#cant-go" ).hide();
        $( "#there-yet" ).hide();
        /// adding hint system bubbles 
        $( "#cant-smell" ).hide();
        $( "#can-smell" ).hide();
        $( "#my-feet" ).toggle();
        $( "#my-feet" ).delay( 1500 ).fadeOut();
    }
    if( moveCounter < 0 ) {
        alert( "You run out of movement points!\nTry again!");
        location.reload();
    };  
    /// adding player.hotOrCold() calls here based on how many moves have been taken  
    // 15 moves taken
    if (moveCounter - player.movesChosen === -15) {
        if (player.hotOrCold() >= 8) {
            /// player is "cold"
            $( "#cant-stone" ).hide();
            $( "#cant-go" ).hide();
            $( "#there-yet" ).hide();
            /// adding hint system bubbles 
            $( "#my-feet" ).hide();
            $( "#can-smell" ).hide();
            $( "#cant-smell" ).toggle();
            $( "#cant-smell" ).delay( 1500 ).fadeOut();

        }
        else if (player.hotOrCold() <= 7) {
            /// player is "hot"
            $( "#cant-stone" ).hide();
            $( "#cant-go" ).hide();
            $( "#there-yet" ).hide();
            /// adding hint system bubbles 
            $( "#my-feet" ).hide();
            $( "#cant-smell" ).hide();
            $( "#can-smell" ).toggle();
            $( "#can-smell" ).delay( 1500 ).fadeOut();
        }
    }
    // 25 moves taken
    if (moveCounter - player.movesChosen === -25) {
        if (player.hotOrCold() >= 8) {
            /// player is "cold"
            $( "#cant-stone" ).hide();
            $( "#cant-go" ).hide();
            $( "#there-yet" ).hide();
            /// adding hint system bubbles 
            $( "#my-feet" ).hide();
            $( "#can-smell" ).hide();
            $( "#cant-smell" ).toggle();
            $( "#cant-smell" ).delay( 1500 ).fadeOut();

        }
        else if (player.hotOrCold() <= 7) {
            /// player is "hot"
            $( "#cant-stone" ).hide();
            $( "#cant-go" ).hide();
            $( "#there-yet" ).hide();
            /// adding hint system bubbles 
            $( "#my-feet" ).hide();
            $( "#cant-smell" ).hide();
            $( "#can-smell" ).toggle();
            $( "#can-smell" ).delay( 1500 ).fadeOut();
        }
    }
    /// 35 moves taken
    if (moveCounter - player.movesChosen === -35) {
        if (player.hotOrCold() >= 8) {
            /// player is "cold"
            $( "#cant-stone" ).hide();
            $( "#cant-go" ).hide();
            $( "#there-yet" ).hide();
            /// adding hint system bubbles 
            $( "#my-feet" ).hide();
            $( "#can-smell" ).hide();
            $( "#cant-smell" ).toggle();
            $( "#cant-smell" ).delay( 1500 ).fadeOut();

        }
        else if (player.hotOrCold() <= 7) {
            /// player is "hot"
            $( "#cant-stone" ).hide();
            $( "#cant-go" ).hide();
            $( "#there-yet" ).hide();
            /// adding hint system bubbles 
            $( "#my-feet" ).hide();
            $( "#cant-smell" ).hide();
            $( "#can-smell" ).toggle();
            $( "#can-smell" ).delay( 1500 ).fadeOut();
        }
    }
    /// 45 moves taken
    if (moveCounter - player.movesChosen === -45) {
        if (player.hotOrCold() >= 8) {
            /// player is "cold"
            $( "#cant-stone" ).hide();
            $( "#cant-go" ).hide();
            $( "#there-yet" ).hide();
            /// adding hint system bubbles 
            $( "#my-feet" ).hide();
            $( "#can-smell" ).hide();
            $( "#cant-smell" ).toggle();
            $( "#cant-smell" ).delay( 1500 ).fadeOut();

        }
        else if (player.hotOrCold() <= 7) {
            /// player is "hot"
            $( "#cant-stone" ).hide();
            $( "#cant-go" ).hide();
            $( "#there-yet" ).hide();
            /// adding hint system bubbles 
            $( "#my-feet" ).hide();
            $( "#cant-smell" ).hide();
            $( "#can-smell" ).toggle();
            $( "#can-smell" ).delay( 1500 ).fadeOut();
        }
    }
}
