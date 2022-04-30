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
            debug: true
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