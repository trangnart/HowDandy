class Play extends Phaser.Scene {

    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('dandy', './assets/placeHolder_dandelion.png');
        this.load.image('seed', './assets/placeHolder_seed.png');
    }

    create () {

        //game.physics.startSystem(Phaser.Physics.ARCADE); // turn on physics

        this.gameOver = false; // to tell if game is over or not


        // defining keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //this.flower = new Dandelion(this, game.config.width/5, game.config.height/5, 'dandy', 0).setOrigin(0,0);
        this.player = this.physics.add.sprite(100, 200, 'dandy',0);
        this.player.setGravityY(125);



        this.add.text(20,20, "Play scene");
    }

    update() {
        
        if (!this.gameOver) {
            this.player.x = 100;
        }
        // if (!this.gameOver) {
        //     this.flower.update();
        // }
    }


}