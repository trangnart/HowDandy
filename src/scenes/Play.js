class Play extends Phaser.Scene {

    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('dandy', './assets/placeHolder_dandelion.png');
        this.load.image('seed', './assets/placeHolder_seed.png');
        this.load.image('water', './assets/placeHolder_water.png');
        this.load.image('ground', './assets/placeHolder_ground.png');
    }

    create () {

        this.gameOver = false; // to tell if game is over or not

        this.distanceTraveled = 0;

        // player stats
        this.seedsDropped = 0;
        this.playerHealth = 10;
        this.score = 0;

        this.dropCoolDown = 0;

        // defining keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // creating dandelion sprite
        // parameters: x pos, y pos, texture, frame
        this.player = this.physics.add.sprite(100, 200, 'dandy',0);
        this.player.setGravityY(0); // gravity strength
        

        // terrain types
        this.ground = this.physics.add.sprite(320,720, 'ground',0);
        this.water = this.physics.add.sprite(960,720, 'water',0);
        
       
        this.add.text(20,20, "Play scene");
        this.playerScore = this.add.text(150, 20, this.score);

        // if (this.physics.add.overlap(this.seed,this.ground)) {
        //     this.groundCollision(this.seed, this.ground);
        // }
        // else if (this.physics.add.overlap(this.seed, this.water)) {
        //     this.waterCollision(this.seed, this.water);
        // }
    }

    update() {
        
        // starting position of the dandelion
        if (!this.gameOver) {

            //while the cool down is not reset to 0, keep removing the value
            if (this.dropCoolDown > 0) {
                this.dropCoolDown -= 1;
            }


        }



        // when player presses space a seed drops
        //added cooldown for whenever pressed it's set to a value
        if (Phaser.Input.Keyboard.JustDown(keySpace) && this.dropCoolDown <= 0) {
            this.seed = this.physics.add.sprite(this.player.x, this.player.y, 'seed', 0); 
            this.seed.setGravityY(125);
            this.dropCoolDown = 300;
            console.log(this.dropCoolDown);
        }

        

        

        // detecting seed collision with the ground

    }

    // these do no work :(
    groundCollision (seed, ground) {
        //seed.destroy();
        this.score += 100;
        this.playerScore.text = this.score;
        this.playerHealth -= 1;
    }

    waterCollision (seed, water) {
        //seed.destroy();
        this.playerHealth -= 1;
    }




}