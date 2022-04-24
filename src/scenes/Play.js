let gameOptions = {
    platformStartSpeed: 350
}
var bot;
class Play extends Phaser.Scene {

    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('dandy', './assets/placeHolder_dandelion.png');
        this.load.image('seed', './assets/placeHolder_seed.png');
        this.load.image('water', './assets/placeHolder_water.png');
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

        this.distanceTraveled = 0; //distance

        // player stats
        this.seedsDropped = 0;
        this.playerHealth = 10;
        this.score = 0;

        this.dropCoolDown = 0;
        this.windCoolDown = 0;

        // defining keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // creating dandelion sprite
        // parameters: x pos, y pos, texture, frame
        this.player = this.physics.add.sprite(config.width/3, config.height/2, 'dandy',0);
        this.player.setGravityY(70); // gravity strength. 70 is good
        this.player.setBounce(0.5, 0.5);
        this.player.setCollideWorldBounds(true);
        this.player.setVelocity(1,1);

        // terrain types
        this.ground = this.physics.add.sprite(640,720, 'ground',0);
        this.ground.body.setAllowGravity(false);
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;
        // this.ground.setBounce();
        // this.ground.setVelocityX(gameOptions.platformStartSpeed * 1);
        this.water = this.physics.add.sprite(960,720, 'water',0);
        this.water.setVelocityX(gameOptions.platformStartSpeed * 1);


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


        this.add.text(20,20, "Play scene");
        this.playerScore = this.add.text(150, 20, this.score);
        this.add.text(500,20, "Distance");
        this.distanceText = this.add.text(610, 20, this.distanceTraveled);
        this.add.text(300,20, "Seed");
        this.Health = this.add.text(360, 20, this.playerHealth);

    // add physics collider for player and ground
            //   this.physics.add.collider(this.player, this.ground);
            // this.player_collide = false;
         this.physics.add.collider(this.player, this.ground, null, function(){
            this.playerHealth -= 1; console.log(this.playerHealth)},this);
        
 
    //add physics collider with bird
            this.physics.add.collider(this.player, this.incoming_bird, null, function(){
                this.playerHealth -=0.5;
                this.incoming_bird.y = -100;
                this.object_moving = false;
                this.call_object = config.object_delay;
            },this);

    //add physics collider with seed power up
    this.physics.add.collider(this.player, this.seed_power, null, function(){
        if(this.playerHealth < 10) {this.playerHealth +=0.5;}
        this.seed_power.y = -100;
        this.object_moving = false;
        this.call_object = config.object_delay;
    },this);
    }

    update() {

        if (this.playerHealth == 0) {
            this.gameOver = true;
        }

        if (this.gameOver != true) {

            this.background.tilePositionX -= 4;//move background
            // this.grass.tilePositionX -= 4;//move grass, visually


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
                this.seed_power.x += 13;
                this.incoming_bird.x += 13;
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
            }

            this.Health.text = this.playerHealth;

            // calculating distance and displaying it
            this.distanceTraveled += 0.01;
            this.distanceText.text = this.distanceTraveled.toFixed(2);

            // when player presses space a seed drops
            //added cooldown for whenever pressed it's set to a value
            if (Phaser.Input.Keyboard.JustDown(keySpace) && this.dropCoolDown <= 0) {
                this.seed = this.physics.add.sprite(this.player.x, this.player.y, 'seed', 0);
                this.seedDroppped = true;
                this.seed.setGravityY(135);
                this.seed.body.velocity.y= 500;
                this.dropCoolDown = 300;
                console.log(this.dropCoolDown);
            }

            // still needs more tweaking
            if (this.seedDroppped && this.seed.y >= 700) {//gotta change this to when the seed collides with the object of dirt
                this.seedDroppped = false;
                this.score += 100;
                this.playerHealth -= 1;
                this.playerScore.text = this.score;
                this.seed.destroy();
            }

            if (this.input.activePointer.isDown && this.windCoolDown <= 0) {
                this.wind = this.physics.add.sprite(this.input.activePointer.position.x+18, this.input.activePointer.position.y+18, 'wind', 0); // wind was offset a bit so now it is place correctly
                this.windCoolDown = 100;
                this.windPlaced = true;

                // moving the dandelion in the opposite direction of the mouse click
                this.mouseY = this.input.activePointer.position.y + 18;
                this.mouseX = this.input.activePointer.position.x + 18;

                this.xRange = Math.abs(this.mouseX - this.player.x);
                this.yRange = Math.abs(this.mouseY - this.player.y);

                if (this.player.x < this.mouseX && (this.xRange >= 0 && this.xRange <= 80) && (this.yRange >= 0 && this.yRange <= 50)) {
                    this.player.body.velocity.x = -80;
                    this.player.body.velocity.y = 30;
                    console.log("go backwards bc mouse is ahead");
                }
                else if (this.player.x > this.mouseX && (this.xRange >= 0 && this.xRange <= 80) && (this.yRange >= 0 && this.yRange <= 50)) {
                    this.player.body.velocity.x = 80;
                    this.player.body.velocity.y = 30;
                    console.log("go to the right bc mouse is next to");
                }
                else if (this.player.y < this.mouseY && (this.xRange >= 0 && this.xRange <= 80) && (this.yRange >= 0 && this.yRange <= 100)) {
                    this.player.body.velocity.x = 50;
                    this.player.body.velocity.y = -150; // negative y values go up
                    console.log("go up bc mouse is below");
                }
                else if (this.player.y > this.mouseY && (this.xRange >= 0 && this.xRange <= 80) && (this.yRange >= 0 && this.yRange <= 100)){
                    this.player.body.velocity.x = 60;
                    this.player.body.velocity.y = 75;  // positive y values go down
                    console.log("go down bc mouse is above");
                }

            }

        }

        // this.physics.world.wrap(this.ground, this.ground.width/2);


    }

    // still needs work
    collisionDandelion(player) {
        player.body.velocity.x = 20;
        player.body.velocity.y = -30;
    }



}