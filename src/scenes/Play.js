let gameOptions = {
    platformStartSpeed: 350
}
let gameConfig = {
    fontFamily: 'Papyrus',
    fontSize: '40px',
    color: '#FFFFFF',
    align: 'right',
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 0
}
var bot;
class Play extends Phaser.Scene {

    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('dandy', './assets/placeHolder_dandelion.png');
        this.load.image('seed', './assets/placeHolder_seed.png');
        this.load.image('water', './assets/ground_water.png');
        this.load.image('ground', './assets/ground_grass.png');
        this.load.image('wind', './assets/placeHolder_clickWind.png');
        this.load.image('sky', './assets/sky.png');
        this.load.image('bird', './assets/bird.png');
        this.load.image('power_up_seed', './assets/placeHolder_seed.png');
    }

    create () {

        this.background = this.add.tileSprite
        (
            0,
            0,
            1280,
            720,
            "sky"
        ).setOrigin(0, 0);

        // this.grass = this.group.create(0, 700, 'ground_grass');
        // this.add.tileSprite(0, 700, 1280, 118, "ground").setOrigin(0,0);


        // mouse stuff
        this.input.mouse.capture = true;
        this.input.setDefaultCursor('url(./assets/placeHolder_windMouse.png), pointer');



        this.gameOver = false; // to tell if game is over or not
        this.seedDroppped = false;
        this.windPlaced = false;

        this.terrainRange = 0; // number that will be checked
        this.isItWater = false;

        this.distanceTraveled = 0; //distance

        // player stats
        this.seedsDropped = 0;
        this.playerHealth = 10;
        this.score = 0;

        this.dropCoolDown = 0;
        this.windCoolDown = 0;

        // defining keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // creating dandelion sprite
        // parameters: x pos, y pos, texture, frame
        this.player = this.physics.add.sprite(config.width-300, config.height/3, 'dandy',0);
        this.player.setGravityY(70); // gravity strength. 70 is good
        this.player.setBounce(0.85);
        this.player.setCollideWorldBounds(true);
        this.player.setVelocity(1,1);

        // terrain types
        // used to be 640, 720, 1280, 118
        this.ground = this.add.tileSprite(640, 720, 1280, 118, 'ground');
        this.physics.add.existing(this.ground, false);
        this.ground.body.setAllowGravity(false);
        this.ground.body.allowGravity = false;
        
        // water 
        this.water = this.add.tileSprite(-640, 720, 1280, 118, 'water');
        this.physics.add.existing(this.water, false);
        this.water.body.setAllowGravity(false);
        this.water.body.allowGravity = false;

        //this.water = this.physics.add.sprite(960,720, 'water',0);


        //objects from side of the screen
        this.call_object = config.object_delay;
        this.call_random_number = -1;
        this.call_random_object = -1;
        this.object_moving = false;

        //bird
        this.incoming_bird = this.physics.add.sprite(0,-100, 'bird',0);
        this.incoming_bird.body.setAllowGravity(false);
        this.ground.body.immovable = true;
        this.incoming_bird.body.allowGravity = false;

        //seed power up
        this.seed_power = this.physics.add.sprite(0, -100, 'power_up_seed',0);
        this.seed_power.body.setAllowGravity(false);
        this.seed_power.body.immovable = true;
        this.seed_power.body.allowGravity = false;


        this.add.text(20,20, "Score");
        this.playerScore = this.add.text(150, 20, this.score);
        this.add.text(500,20, "Distance");
        this.distanceText = this.add.text(610, 20, this.distanceTraveled);
        this.add.text(300,20, "Seeds");
        this.Health = this.add.text(360, 20, this.playerHealth);

        this.canPlaceWind = this.add.text(game.config.width/2, game.config.height/8, "wind", {color: '#000000'}).setAlpha(0);
        //this.canPlaceWind.color('#000000');

        // add physics collider for player and ground
         this.physics.add.collider(this.player, this.ground, null, function(){
            if (this.playerHealth <= 0) {
                 this.gameOver = true;
                 this.player.body.velocity.x = 0;
                 return;
             }
            else {
                this.sound.play('sfx_grass');
                this.playerHealth -= 1;
                this.Health.text = this.playerHealth;
            }
        },this);


        // player and water collision
        this.physics.add.collider(this.player, this.water, null, function() {
            this.gameOver = true;
        }, this);


        //add physics collider with bird
        this.physics.add.collider(this.player, this.incoming_bird, null, function(){
            this.sound.play('sfx_bird');
            if (this.playerHealth <= 10 && this.playerHealth >= 0) {
                this.playerHealth -= 1;
                this.Health.text = this.playerHealth;
                this.incoming_bird.y = -100;
                this.object_moving = false;
                this.call_object = config.object_delay;
            }
            else {
                this.gameOver = true;
                return;
            }
        },this);

        //add physics collider with seed power up
        this.physics.add.collider(this.player, this.seed_power, null, function(){
            this.sound.play('sfx_powerup');
            if(this.playerHealth <= 9) {
                this.playerHealth += 1;
            }
            this.seed_power.y = -100;
            this.object_moving = false;
            this.call_object = config.object_delay;
        },this);

    }

    update() {

        // game over happens
        if (this.playerHealth <= 0 || this.gameOver == true) {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', gameConfig).setOrigin(0.5,2);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press R to Restart', gameConfig).setOrigin(0.5,1);
            this.gameOver = true;
            this.player.body.physics = false;
            this.player.body.setBounce(0);
        }

        // restart the game
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        // game loop
        if (this.gameOver != true) {

            this.ground.tilePositionX -= 4; // move the ground
            this.water.tilePositionX -= 4;
            this.background.tilePositionX -= 4;//move background

            //Calling incoming object (bird)
            this.call_object -= 1;
            if(this.call_object <= 0 && this.object_moving == false) {
               this.call_random_number = Math.floor(Math.random() * 5);
               this.call_random_object = Math.floor(Math.random() * 2);
               console.log("random number =",this.call_random_number);
               console.log("call number =",this.call_random_object);
            //    this.call_object = config.object_delay;

               if(this.call_random_number==0 && this.call_random_object == 0){
                   this.incoming_bird.x = 14;
                   this.incoming_bird.y = 101;
                   this.object_moving = true;
                   this.call_random_number = -1;
                   this.call_random_object = -1;
               }
               else if(this.call_random_number==1 && this.call_random_object == 0){
                this.incoming_bird.x = 14;
                this.incoming_bird.y = 210;
                this.object_moving = true;
                this.call_random_number = -1;
                this.call_random_object = -1;
            }
                else if(this.call_random_number==2 && this.call_random_object == 0){
                this.incoming_bird.x = 14;
                this.incoming_bird.y = 320;
                this.object_moving = true;
                this.call_random_number = -1;
                this.call_random_object = -1;
            }
                else if(this.call_random_number==3 && this.call_random_object == 0){
                this.incoming_bird.x = 14;
                this.incoming_bird.y = 430;
                this.object_moving = true;
                this.call_random_number = -1;
                this.call_random_object = -1;
            }
                else if(this.call_random_number==4 && this.call_random_object == 0){
                this.incoming_bird.x = 14;
                this.incoming_bird.y = 540;
                this.object_moving = true;
                this.call_random_number = -1;
                this.call_random_object = -1;
            }

            else if(this.call_random_number==0 && this.call_random_object == 1){
                this.seed_power.x = 14;
                this.seed_power.y = 101;
                this.object_moving = true;
                this.call_random_number = -1;
                this.call_random_object = -1;
            }
            else if(this.call_random_number==1 && this.call_random_object == 1){
                this.seed_power.x = 14;
                this.seed_power.y = 210;
                this.object_moving = true;
                this.call_random_number = -1;
                this.call_random_object = -1;
            }
            else if(this.call_random_number==2 && this.call_random_object == 1){
                this.seed_power.x = 14;
                this.seed_power.y = 320;
                this.object_moving = true;
                this.call_random_number = -1;
                this.call_random_object = -1;
            }
            else if(this.call_random_number==3 && this.call_random_object == 1){
                this.seed_power.x = 14;
                this.seed_power.y = 320;
                this.object_moving = true;
                this.call_random_number = -1;
                this.call_random_object = -1;
            }
            else if(this.call_random_number==4 && this.call_random_object == 1){
                this.seed_power.x = 14;
                this.seed_power.y = 430;
                this.object_moving = true;
                this.call_random_number = -1;
                this.call_random_object = -1;
            }

            }

            if(this.object_moving == true) {
                this.seed_power.x += 5;
                this.incoming_bird.x += 5;
                // console.log(this.incoming_bird.x);
                if(this.incoming_bird.x >= config.width || this.seed_power.x >= config.width) {
                    this.object_moving = false;
                    this.incoming_bird.y = -100;
                    this.seed_power.y = -100;
                    this.incoming_bird.x = 0;
                    this.seed_power.x = 0;
                this.call_object = config.object_delay;
                    // console.log(this.incoming_bird.x);
                    // console.log(this.incoming_bird.y);
                }
            }


            //while the cool down is not reset to 0, keep removing the value
            if (this.dropCoolDown > 0) {
                this.dropCoolDown -= 1;
            }//end if

            if (this.windCoolDown > 0) {
                this.windCoolDown -= 1;
                //this.canPlaceWind.setAlpha(100);
            }

            this.Health.text = this.playerHealth;

            // calculating distance and displaying it
            this.distanceTraveled += 0.01;
            this.distanceText.text = this.distanceTraveled.toFixed(2);

            // changing the terrain to water
            this.terrainRange += 0.01;
            // once ground is offscreen reset it to the front
            if (this.ground.x >= 1910) {
                this.terrainRange = -10;
                this.ground.x = -640;
            }
            if (this.water.x >= 1910) {
                this.water.x = -640;
                this.terrainRange = -10;
            }
            if (this.terrainRange >= 5 && this.terrainRange <= 30.7) {

                this.ground.x += 0.5;
                this.water.x += 0.5;
            }
            console.log(this.terrainRange);
            console.log("this is the WATER x", this.water.x);
           
            // when player presses space a seed drops
            // added cooldown for whenever pressed it's set to a value
            if (Phaser.Input.Keyboard.JustDown(keySpace) && this.dropCoolDown <= 0) {
                this.sound.play('sfx_drop');
                this.seed = this.physics.add.sprite(this.player.x, this.player.y, 'seed', 0);
                this.seedDroppped = true;
                this.seed.setGravityY(135);
                this.seed.body.velocity.y= 500;
                this.dropCoolDown = 300;
                //console.log(this.dropCoolDown);
            }

            // still needs more tweaking
            // seed "collision" detection
            if (this.seedDroppped && this.seed.y >= 700) {//gotta change this to when the seed collides with the object of dirt
                this.seedDroppped = false;
                this.score += 100;
                this.playerHealth -= 1;
                this.playerScore.text = this.score;
                this.seed.destroy();
                this.Health.text = this.playerHealth;  
            }

            
            // moving the dandelion
            if (this.input.activePointer.isDown && this.windCoolDown <= 0) {
                //this.wind = this.physics.add.sprite(this.input.activePointer.position.x+18, this.input.activePointer.position.y+18, 'wind', 0); // wind was offset a bit so now it is place correctly
                this.windCoolDown = 100;
                this.canPlaceWind.setAlpha(0);
                this.windPlaced = true;

                // moving the dandelion in the opposite direction of the mouse click
                this.mouseY = this.input.activePointer.position.y + 18;
                this.mouseX = this.input.activePointer.position.x + 18;

                this.xRange = Math.abs(this.mouseX - this.player.x);
                this.yRange = Math.abs(this.mouseY - this.player.y);

                if (this.player.x < this.mouseX && (this.xRange >= 0 && this.xRange <= 80) && (this.yRange >= 0 && this.yRange <= 30)) {
                    this.player.body.velocity.x = -80;
                    this.player.body.velocity.y = -50;
                    console.log("go backwards bc mouse is ahead");
                }
                else if (this.player.x > this.mouseX && (this.xRange >= 0 && this.xRange <= 80) && (this.yRange >= 0 && this.yRange <= 30)) {
                    this.player.body.velocity.x = 80;
                    this.player.body.velocity.y = -50;
                    console.log("go to the right bc mouse is next to");
                }
                else if (this.player.y < this.mouseY && (this.xRange >= 0 && this.xRange <= 80) && (this.yRange >= 0 && this.yRange <= 170)) {
                    this.player.body.velocity.x = -30;
                    this.player.body.velocity.y = -180; // negative y values go up
                    console.log("go up bc mouse is below");
                }
                else if (this.player.y > this.mouseY && (this.xRange >= 0 && this.xRange <= 80) && (this.yRange >= 0 && this.yRange <= 170)){
                    this.player.body.velocity.x = -60;
                    this.player.body.velocity.y = 125;  // positive y values go down
                    console.log("go down bc mouse is above");
                }

            }

        }


    }


}