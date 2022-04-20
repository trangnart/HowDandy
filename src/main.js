
let config = {
    type: Phaser.AUTO,
    width: 1280,          // game resolution rn is 720p
    height: 720,
    scene: [Menu, Play], // the scenes we will be using

    // phaser arcade physic engine
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    }
}


let game = new Phaser.Game(config);

// reserving relevant keys
let keySpace, keyEnter;