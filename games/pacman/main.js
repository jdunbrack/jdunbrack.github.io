function drawWorld() {
    var output = '';

    for (var i = 0; i < world.length; i++) {
        output += "\n<div class='row'>\n"
        for (var j = 0; j < world[i].length; j++) {
            if (world[i][j] == 0) {
                output += "<div class='empty'></div>";
            } else if (world[i][j] == 1) {
                output += "<div class='brick'></div>";
            } else if (world[i][j] == 2) {
                output += "<div class='coin'></div>";
            } else if (world[i][j] == 3) {
                output += "<div class='cherry'></div>";
            }
        }
        output += "\n</div>"
    }
    document.getElementById('world').innerHTML = output;
    document.getElementById('score').innerText = score;
    
}

var world = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //0
    [1,2,2,2,2,1,2,2,2,2,2,2,2,3,1,2,2,2,3,1], //1
    [1,2,1,1,2,1,2,1,1,2,1,2,1,2,1,2,1,1,2,1], //2
    [1,2,1,1,2,1,2,1,1,2,1,2,1,2,1,2,1,1,2,1], //3
    [1,2,2,2,2,1,2,1,2,2,1,2,1,2,1,2,2,2,2,1], //4
    [1,2,1,1,1,1,2,1,2,1,1,2,1,2,2,2,1,1,1,1], //5
    [1,3,2,2,2,2,3,1,2,1,0,2,1,1,1,1,1,1,1,1], //6
    [1,2,1,1,1,1,2,1,2,1,1,2,1,2,2,2,1,1,1,1], //7
    [1,2,2,2,2,1,2,1,2,2,1,2,1,2,1,2,2,2,2,1], //8
    [1,2,1,1,2,1,2,1,1,2,1,2,1,2,1,2,1,1,2,1], //9
    [1,2,1,1,2,1,2,1,1,2,1,2,1,2,1,2,1,1,2,1], //10
    [1,2,2,2,2,1,2,2,2,2,2,2,2,3,1,2,2,2,2,1], //11
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //12
];

var dict = {
    0: "empty",
    1: "wall",
    2: "coin",
    3: "cherry"
}

var score = 0;

var pacman = {
    x: 10,
    y: 6
}

var pacman2 = {
    x: 1,
    y: 8
}

var ghosts = [
    ghostBlue = {
        x: 4,
        y: 1,
        id: "ghostBluey",
        name: "bluey"
    },
    ghostPinky = {
        x: 4,
        y: 11,
        id: "ghostPinky",
        name: "pinky"
    },
    ghostRed = {
        x: 18,
        y: 4,
        id: "ghostRed",
        name: "red"
    },
    ghostPumpky = {
        x: 18,
        y: 8,
        id: "ghostPumpky",
        name: "pumpky"
    }
];

var panic = false;
var counter = 0;
var playerEaten = false;

drawWorld();

document.onkeydown = function(key) {
    if (key.keyCode == 37 && world[pacman.y][pacman.x-1] != 1) {
        pacman.x--;
        document.getElementById('pacman').style.transform = "rotate(180deg)";
        counter++;
    } else if (key.keyCode == 38 && world[pacman.y - 1][pacman.x] != 1) {
        pacman.y--;
        document.getElementById('pacman').style.transform = "rotate(270deg)";
        counter++;
    } else if (key.keyCode == 39 && world[pacman.y][pacman.x+1] != 1) {
        pacman.x++;
        document.getElementById('pacman').style.transform = "rotate(0deg)";
        counter++;
    } else if (key.keyCode == 40 && world[pacman.y+1][pacman.x] != 1) {
        pacman.y++;
        document.getElementById('pacman').style.transform = "rotate(90deg)";
        counter++;
    }
    // if (key.keyCode == 65 && world[pacman2.y][pacman2.x-1] != 1) {
    //     pacman2.x--;
    //     document.getElementById('pacman2').style.transform = "rotate(180deg)";
    // } else if (key.keyCode == 87 && world[pacman2.y - 1][pacman2.x] != 1) {
    //     pacman2.y--;
    //     document.getElementById('pacman2').style.transform = "rotate(270deg)";
    // } else if (key.keyCode == 68 && world[pacman2.y][pacman2.x+1] != 1) {
    //     pacman2.x++;
    //     document.getElementById('pacman2').style.transform = "rotate(0deg)";
    // } else if (key.keyCode == 83 && world[pacman2.y+1][pacman2.x] != 1) {
    //     pacman2.y++;
    //     document.getElementById('pacman2').style.transform = "rotate(90deg)";
    // }

    if (world[pacman.y][pacman.x] == 2) {
        world[pacman.y][pacman.x] = 0;
        score += 10;
    // } else if (world[pacman2.y][pacman2.x] == 2) {
    //     world[pacman2.y][pacman2.x] = 0;
    //     score += 10;
    }
    if (world[pacman.y][pacman.x] == 3) {
        world[pacman.y][pacman.x] = 0;
        score += 50;
        panic = true;
        setTimeout(flashWalls, 4000);
        setTimeout(function() {panic = false;}, 5000);
    // } else if (world[pacman2.y][pacman2.x] == 3) {
    //     world[pacman2.y][pacman2.x] = 0;
    //     score += 50;
    }

    if (score >= 1500) {
        document.getElementById('alert').innerHTML = "<h1 style='color: green;'>Congratulations! You win!</h1>"
        document.onkeydown = function() {return;};
    }

    for (var i = 0; i < ghosts.length; i++) {
        moveGhosts(ghosts[i]);
    }
    
    drawPacman();
    drawWorld();
    detectCollisions();
};

function flashWalls() {
    var bricks = document.getElementsByClassName("brick");
    for (var i = 0; i < bricks.length; i++) {
        bricks[i].classList.add("flash");
    }
    setTimeout(function() {
        var bricks = document.getElementsByClassName("brick");
        for (var i = 0; i < bricks.length; i++) {
            bricks[i].classList.remove("flash");
        }
    }, 200);
}


function enemyCollide(ghost) {
    if (!panic) {
        document.getElementById("alert").innerHTML = "<h1 style='color: red;'>You have been eaten! You lose!</h1>";
        document.onkeydown = function() {return;};
        return true;
    } else {
        score += 100;
        resetGhost(ghost);
        panic = false;
        return false;
    }
}

function resetGhost(ghost) {
    ghost.x = 10;
    ghost.y = 6;
    drawGhost(ghost);
}

function drawPacman() {
    document.getElementById("pacman").style.top = pacman.y*20+"px";
    document.getElementById("pacman").style.left = pacman.x*20+"px";
    // document.getElementById("pacman2").style.top = pacman2.y*20+"px";
    // document.getElementById("pacman2").style.left = pacman2.x*20+"px";
}

function drawGhost(ghost) {
    document.getElementById(ghost.id).style.top = ghost.y * 20 + "px";
    document.getElementById(ghost.id).style.left = ghost.x * 20 + "px";
}

function moveGhosts(ghost) {

    var neg = (panic == true) ? -1 : 1;

    if (ghost.x > pacman.x) {
        if (world[ghost.y][ghost.x - (neg * 1)] != 1) {
            ghost.x -= neg * 1;
            return drawGhost(ghost);
        }
    }
    if (ghost.y > pacman.y) {
        if (world[ghost.y - (neg * 1)][ghost.x] != 1) {
            ghost.y -= neg * 1;
            return drawGhost(ghost);
        }
    }
    if (ghost.x < pacman.x) {
        if (world[ghost.y][ghost.x+(neg * 1)] != 1) {
            ghost.x += neg * 1;
            return drawGhost(ghost);
        }
    }
    if (ghost.y < pacman.y) {
        if (world[ghost.y+(neg * 1)][ghost.x] != 1) {
            ghost.y += neg * 1;
            return drawGhost(ghost);
        }
    }
    if (world[ghost.y][ghost.x - (neg * 1)] != 1) {
        ghost.x -= neg * 1;
        return drawGhost(ghost);
    }
    if (world[ghost.y - (neg * 1)][ghost.x] != 1) {
        ghost.y -= neg * 1;
        return drawGhost(ghost);
    }
    if (world[ghost.y][ghost.x+(neg * 1)] != 1) {
        ghost.x += neg * 1;
        return drawGhost(ghost);
    }
    if (world[ghost.y+(neg * 1)][ghost.x] != 1) {
        ghost.y += neg * 1;
        return drawGhost(ghost);
    }
}


function detectCollisions() {
    for (var i = 0; i < ghosts.length; i++) {
        if (ghosts[i].x == pacman.x && ghosts[i].y == pacman.y) {
            if (!enemyCollide(ghosts[i])) {
                detectCollisions();
            }
        }
    }
}