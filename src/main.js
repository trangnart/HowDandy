// HOW DANDY - Endless Runner
// TEAM MEMBERS: Andrew Dresel-Kurtz, Ashley Perez, Jane Tran
<<<<<<< HEAD
// Date Complete:
//
// Creative: 
//
// Visual:
=======
// Date Complete: 5/2/2022
// 
// Technical Interesting: The randomization for the bird and power up object.  
// Visual: The theme of the game is really solid where the objective of the game is "true to life" and all the art follows a similar retro aesthetic.
>>>>>>> f1371611844a46d9723cf8c839d90c060a7b1815

let config = {
    type: Phaser.AUTO,
    width: 1280,          // game resolution rn is 720p
    height: 720,
    scene: [Menu, Play, Guide], // the scenes we will be using
    object_delay: 100,
    autoCenter: true,

    // phaser arcade physic engine
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}


let game = new Phaser.Game(config);

// set border
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserving relevant keys
let keySpace, keyEnter;
let keyS, keyR, keyI, keyM;