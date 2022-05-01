let gameOptions = {
    platformStartSpeed: 350
}
let gameConfig = {
    fontFamily: 'Yoster',
    fontSize: '40px',
    color: '#00000',
    align: 'right',
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 0
}

class Play extends Phaser.Scene {

    constructor() {
        super("playScene");
    }

    preload() {
        // player spritesheets
        this.load.spritesheet('dandy_10', './assets/dandelion_10_spritesheet.png', {frameWidth: 36, frameHeight: 94});
        this.load.spritesheet('dandy_9', './assets/dandelion_9_spritesheet.png', {frameWidth: 36, frameHeight: 94});
        this.load.spritesheet('dandy_8', './assets/dandelion_8_spritesheet.png', {frameWidth: 36, frameHeight: 94});
        this.load.spritesheet('dandy_7', './assets/dandelion_7_spritesheet.png', {frameWidth: 36, frameHeight: 94});
        this.load.spritesheet('dandy_6', './assets/dandelion_6_spritesheet.png', {frameWidth: 36, frameHeight: 94});
        this.load.spritesheet('dandy_5', './assets/dandelion_5_spritesheet.png', {frameWidth: 36, frameHeight: 94});
        this.load.spritesheet('dandy_4', './assets/dandelion_4_spritesheet.png', {frameWidth: 36, frameHeight: 94});
        this.load.spritesheet('dandy_3', './assets/dandelion_3_spritesheet.png', {frameWidth: 36, frameHeight: 94});
        this.load.spritesheet('dandy_2', './assets/dandelion_2_spritesheet.png', {frameWidth: 36, frameHeight: 94});
        this.load.spritesheet('dandy_1', './assets/dandelion_1_spritesheet.png', {frameWidth: 36, frameHeight: 94});
        this.load.spritesheet('dandy', './assets/dandelion_spritesheet.png', {frameWidth: 36, frameHeight: 94});
        this.load.image('dandy_0', './assets/dandelion_0.png');

        // terrain and background
        this.load.image('water', './assets/ground_water.png');
        this.load.image('ground', './assets/ground_grass.png');
        this.load.image('sky', './assets/sky.png');

        // seed, bird and power up assets
        this.load.spritesheet('seed', './assets/seed_spritesheet.png', {frameWidth: 24, frameHeight: 29});
        this.load.spritesheet('bird', './assets/bird_spritesheet.png', {frameWidth: 110, frameHeight: 90});
        this.load.spritesheet('power_up_seed', './assets/seed_spritesheet.png',{frameWidth: 24, frameHeight: 29});

        // bar cooldown assets
        this.load.image('outsideBar', './assets/barContainer.png');
        this.load.image('timerBar', './assets/bar.png');
        this.load.image('bar', './assets/blackbar.png');
        this.load.spritesheet('wind', './assets/wind_spritesheet.png', {frameWidth: 73, frameHeight: 37, startFrame:0, endFrame:9});

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
        // animation config
        // dandy with 10 seeds
        

        this.anims.create({
            key: 'moving_10',
            frames: this.anims.generateFrameNumbers('dandy', {start:0, end:8}),//{start:0, end:8, first:0}
            frameRate: 5,
            repeat: 0
        });
        this.anims.create({
            key: 'moving_9',
            frames: this.anims.generateFrameNumbers('dandy',{start:9, end:17}),//{start:0, end:8, first:0}
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'moving_8',
            frames: this.anims.generateFrameNumbers('dandy',{start:18, end:26}),//{start:0, end:8, first:0}
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'moving_7',
            frames: this.anims.generateFrameNumbers('dandy',{start:27, end:36}),//{start:0, end:8, first:0}
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'moving_6',
            frames: this.anims.generateFrameNumbers('dandy',{start:37, end:45}),//{start:0, end:8, first:0}
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'moving_5',
            frames: this.anims.generateFrameNumbers('dandy',{start:46, end:54}),//{start:0, end:8, first:0}
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'moving_4',
            frames: this.anims.generateFrameNumbers('dandy',{start:55, end:63}),//{start:0, end:8, first:0}
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'moving_3',
            frames: this.anims.generateFrameNumbers('dandy',{start:64, end:72}),//{start:0, end:8, first:0}
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'moving_2',
            frames: this.anims.generateFrameNumbers('dandy',{start:73, end:81}),//{start:0, end:8, first:0}
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'moving_1',
            frames: this.anims.generateFrameNumbers('dandy',{start:82, end:90}),//{start:0, end:8, first:0}
            frameRate: 5,
            repeat: -1
        });

        


      // seed animation
        this.anims.create({
            key: 'seed',
            frames: this.anims.generateFrameNumbers('seed'),//{start:0, end:8, first:0}
            frameRate: 5,
            repeat: -1
        });
      // seed power up animation
      this.anims.create({
        key: 'seed_power',
        frames: this.anims.generateFrameNumbers('power_up_seed'),//{start:0, end:8, first:0}
        frameRate: 5,
        repeat: -1
      });
      // bird animation
      this.anims.create({
        key: 'flying',
        frames: this.anims.generateFrameNumbers('bird'),//{start:0, end:8, first:0}
        frameRate: 5,
        repeat: -1
      });
      //wind animation
      this.anims.create({
        key: 'blow',
        frames: this.anims.generateFrameNumbers('wind'),//{start:0, end:8, first:0}
        frameRate: 8,
        repeat: 0
      });
      
    

        let dropConfig = {
            fontFamily: 'Yoster',
            fontSize: '18px',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 7,
                bottom: 7,
            },
            fixedWidth: 200
        }

        let windConfig = {
            fontFamily: 'Yoster',
            fontSize: '18px',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 7,
                bottom: 7,
            },
            fixedWidth: 200
        }

        // mouse stuff
        this.input.mouse.capture = true;
        this.input.setDefaultCursor('url(./assets/placeHolder_windMouse.png), pointer');

        this.gameOver = false; // to tell if game is over or not
        this.seedDroppped = false;
        this.windPlaced = false;
        this.terrainRange = 0; // number that will be checked
        this.distanceTraveled = 0; //distance

        // sound effect booleans
        this.birdEffect = false;
        this.seedEffect = false;

        // player stats
        this.seedsDropped = 0;
        this.playerHealth = 10;
        this.score = 0;

        // cool down for wind and seed drop
        this.dropCoolDown = 0;
        this.windCoolDown = 0;

        // UI bar
        this.bar = this.physics.add.sprite(640, -5, 'bar');
        this.bar.body.immovable = true;
        this.bar.body.allowGravity = false;
        this.bar.alpha = 0.5;

        // defining keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // creating dandelion sprite
        // parameters: x pos, y pos, texture, frame
        // this.player = this.add.sprite(config.width- 300, config.height/3, 'dandy', 0);
        this.player = this.physics.add.sprite(config.width-300, config.height/3, 'dandy',0);
        this.player.play({key:'moving_10'});
        // this.player.animations.play('dandy_10');
        this.player.setGravityY(70); // gravity strength. 70 is good
        this.player.setBounce(0.85);
        this.player.setCollideWorldBounds(true);
        this.player.setVelocity(1,1);
        this.player.setScale(0.8);

        // seed group
        this.seedGroup = this.physics.add.group({
            gravityY: 135,
            velocityY: 500
        });

        // terrain types
        // used to be 640, 720, 1280, 118
        this.ground = this.add.tileSprite(640, 720, 1280, 118, 'ground');
        this.physics.add.existing(this.ground, false);
        this.ground.body.setAllowGravity(false);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        // water
        this.water = this.add.tileSprite(-640, 720, 1280, 118, 'water');
        this.physics.add.existing(this.water, false);
        this.water.body.setAllowGravity(false);
        this.water.body.allowGravity = false;
        this.water.body.immovable = true;

        //objects from side of the screen
        this.call_object = config.object_delay;
        this.call_random_number = -1;
        this.call_random_object = -1;
        this.object_moving = false;

        //bird
        this.incoming_bird = this.physics.add.sprite(0,-100, 'bird',0);
        this.incoming_bird.play({key:'flying'});  // add bird animation
        this.incoming_bird.body.setAllowGravity(false);
        this.incoming_bird.body.immovable = true;
        this.incoming_bird.body.allowGravity = false;
        this.incoming_bird.setScale(0.7);

        //seed power up
        this.seed_power = this.physics.add.sprite(0, -100, 'power_up_seed',0);
        this.seed_power.play({key:'seed'});
        this.seed_power.setScale(1.7);
        this.seed_power.body.setAllowGravity(false);
        this.seed_power.body.immovable = true;
        this.seed_power.body.allowGravity = false;

        this.add.text(60,17, "SCORE: ", {fontFamily: 'Yoster', fontSize: '18px'});
        this.playerScore = this.add.text(140, 17, this.score, {fontFamily: 'Yoster', fontSize: '18px'});
        this.add.text(480,17, "DISTANCE:", {fontFamily: 'Yoster', fontSize: '18px'});
        this.distanceText = this.add.text(585, 17, this.distanceTraveled + ' ft', {fontFamily: 'Yoster', fontSize: '18px'});
        this.add.text(260,17, "SEEDS: ", {fontFamily: 'Yoster', fontSize: '18px'});
        this.Health = this.add.text(340, 17, this.playerHealth, {fontFamily: 'Yoster', fontSize: '18px'});

        // bar dropCoolDown
        this.dropTimer = this.add.text(750, 10, "SEED:", dropConfig);
        // bar windCoolDown
        this.windTimer = this.add.text(1045, 10, "WIND:", windConfig);

        // SEED cooldown bar
        this.seedCooldownContainer = this.add.sprite(880, 26, 'outsideBar');
        this.seedBar = this.add.sprite(this.seedCooldownContainer.x, this.seedCooldownContainer.y, 'timerBar');
        this.seedBarMask = this.add.sprite(this.seedCooldownContainer.x, this.seedCooldownContainer.y, 'timerBar');
        this.seedBarMask.visible = false;
        this.seedBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.seedBarMask);

        // WIND cooldown bar
        this.windCooldownContainer = this.add.sprite(1175, 26, 'outsideBar');
        this.windBar = this.add.sprite(this.windCooldownContainer.x, this.windCooldownContainer.y, 'timerBar');
        this.windBarMask = this.add.sprite(this.windCooldownContainer.x, this.windCooldownContainer.y, 'timerBar');
        this.windBarMask.visible = false;
        this.windBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.windBarMask);

        // COLLISION stuff below
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
            console.log('inside ground collision');
        },this);

        // player and water collision
        this.physics.add.collider(this.player, this.water, null, function() {
            this.gameOver = true;
        }, this);

        //add physics collider with bird
        this.physics.add.overlap(this.player, this.incoming_bird, null, function(){
            if (this.playerHealth <= 10 && this.playerHealth >= 0) {
                this.playerHealth -= 1;
                this.Health.text = this.playerHealth;
                this.object_moving = false;
                this.incoming_bird.x = 0;
                this.incoming_bird.y = -100;//-200
                this.seed_power.x =  0;
                this.seed_power.y = -100;//-200
                this.call_object = config.object_delay;
                this.birdEffect = true;
            }
            else {
                this.gameOver = true;
                return;
            }
            //console.log('inside bird collision');
        },this);

        //add physics collider with seed power up
        this.physics.add.overlap(this.player, this.seed_power, null, function(){
            if(this.playerHealth <= 9) {
                this.playerHealth += 1;
            }
            this.object_moving = false;
            this.incoming_bird.x = 0;
            this.incoming_bird.y = -100;
            this.seed_power.x =  0;
            this.seed_power.y = -100;
            this.call_object = config.object_delay;
            this.seedEffect = true;
            //console.log('inside powerup collision');
        },this);

        // seed and terrain collision
        this.physics.add.collider(this.seedGroup, this.ground, null, function() {
            this.sound.play('sfx_score');
            this.score += 200;
            if (this.playerHealth >= 0 && this.playerHealth <= 10) {
                this.playerHealth -= 1;
            }
            this.playerScore.text = this.score;
            this.seedGroup.clear(true, true);
            console.log("inside ground and seed collision");
        }, this);

        this.physics.add.collider(this.seedGroup, this.water, null, function() {

            if (this.playerHealth >= 0 && this.playerHealth <= 10) {
                this.sound.play('sfx_bloop');
                this.playerHealth -= 1;
            }
            this.seedGroup.clear(true, true);
            console.log("inside water and seed collision");
        }, this);

        // player and UI bar collision
        this.physics.add.collider(this.player, this.bar);

        // highscore variable
        // window.localStorage.setItem('highscore', 0);
        this.animationPlay = false;
    }

    update() {

        // game over happens
        if (this.playerHealth <= 0 || this.gameOver == true) {
            this.birdEffect = false;
            this.seedEffect = false;
            this.playerHealth  = 0;
            this.Health.text = this.playerHealth;
            this.add.text(game.config.width/2, game.config.height/2-20, 'GAME OVER', gameConfig).setOrigin(0.5,2);
            
            let totalScore = this.score + (Math.round(this.distanceTraveled)*2);
            if (totalScore >= window.localStorage.getItem('highscore')) {
                window.localStorage.setItem('highscore', totalScore);
            }

            this.add.text(game.config.width/2, game.config.height/2+27, 'TOTAL SCORE: ' + totalScore, gameConfig).setOrigin(0.5,2);;
            this.add.text(game.config.width/2, game.config.height/2 + 70, 'HIGH SCORE: ' + window.localStorage.getItem('highscore'), gameConfig).setOrigin(0.5,2);;
            this.add.text(game.config.width/2, game.config.height/2 + 65, 'Press R to Restart', gameConfig).setOrigin(0.5,1);
            this.gameOver = true;

            // stop player movement when game is over
            this.player.body.physics = false;
            this.player.body.setBounce(0);
            this.player.body.gravity = false;
        }

        // restart the game
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        // game loop
        if (this.gameOver != true) {
            // console.log(this.player.currentAnim);
            // this.player.on('animationcomplete', function(){console.log("awdf");})

            if(this.player.on('moving_10', function(){this.animationPlay = true;})) {
                this.animationPlay = true;
                console.log("tiddies");
            }
          
                if(this.playerHealth == 10 && this.animationPlay == true){
                        this.animationPlay = false;
                         this.player.play({key:'moving_10'});
                         console.log("ass");

                    // console.log(this.playerHealth +" "+ this.animationPlay);
                     // this.player.play({key:'moving_10'});
    
                // this.player.on('animationcomplete', function(){
                //     this.animationPlay = false;
                //     console.log("word");
                // })

            }

            // else if(this.playerHealth == 9) {
            //     this.player.play({key:'moving_9'});
            // }
            // else if(this.playerHealth == 8) {
            //     this.player.play({key:'moving_8'});
            // }
            // else if(this.playerHealth == 7) {
            //     this.player.play({key:'moving_7'});
            // }
            // else if(this.playerHealth == 6) {
            //     this.player.play({key:'moving_6'});
            // }
            // else if(this.playerHealth == 5) {
            //     this.player.play({key:'moving_5'});
            // }
            // else if(this.playerHealth == 4) {
            //     this.player.play({key:'moving_4'});
            // }
            // else if(this.playerHealth == 3) {
            //     this.player.play({key:'moving_3'});
            // }
            // else if(this.playerHealth == 2) {
            //     this.player.play({key:'moving_2'});
            // }
            // else if(this.playerHealth == 1) {
            //     this.player.play({key:'moving_1'});
            // }
            // this.player.play("moving");

            // if (this.playerHealth == 10) {
            //     this.player.play({key:'moving'});
            // }
            // if (this.playerHealth == 9) {
            //     this.player.play({key:'moving_9'});
            // }
            // else if (this.playerHealth == 8) {
            //     this.player.play({key:'moving_8'});
            // }
            // else if (this.playerHealth == 7) {
            //     this.player.play({key:'moving_7'});
            // }
            // else if (this.playerHealth == 6) {
            //     this.player.play({key:'moving_6'});
            // }
            // else if (this.playerHealth == 5) {
            //     this.player.play({key:'moving_5'});
            // }
            // else if (this.playerHealth == 4) {
            //     this.player.play({key:'moving_4'});
            // }
            // else if (this.playerHealth == 3) {
            //     this.player.play({key:'moving_3'});
            // }
            // else if (this.playerHealth == 2) {
            //     this.player.play({key:'moving_2'});
            // }
            // else if (this.playerHealth == 1) {
            //     this.player.play({key:'moving_1'});
            // }

            if (this.birdEffect == true) {
                this.sound.play('sfx_bird');
                this.birdEffect = false;
            }
            else if (this.seedEffect == true) {
                this.sound.play('sfx_powerup');
                this.seedEffect = false;
            }

            this.ground.tilePositionX -= 4; // move the ground
            this.water.tilePositionX -= 4;
            this.background.tilePositionX -= 4;//move background

            //Calling incoming object (bird)
            this.call_object -= 1;
            if(this.call_object <= 0 && this.object_moving == false) {
               this.call_random_number = Math.floor(Math.random() * 5);
               this.call_random_object = Math.floor(Math.random() * 2);
               //console.log("random number =",this.call_random_number);
               //console.log("call number =",this.call_random_object);
               //this.call_object = config.object_delay;

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
                    this.incoming_bird.y = -100;//-200
                    this.seed_power.y = -100;//-200
                    this.incoming_bird.x = 0;
                    this.seed_power.x = 0;
                this.call_object = config.object_delay;
                    // console.log(this.incoming_bird.x);
                    // console.log(this.incoming_bird.y);
                }
            }

            // while the cool down is not reset to 0, keep removing the value
            if (this.dropCoolDown > 0) {
                this.dropCoolDown -= 1;
                let seedStepWidth = this.seedBarMask.displayWidth / 300;
                this.seedBarMask.x -= seedStepWidth;
            }
            else {
                this.seedBarMask.x = this.seedBar.x;
            }

            if (this.windCoolDown > 0) {
                this.windCoolDown -= 1;
                let windStepWidth = this.windBarMask.displayWidth / 100;
                this.windBarMask.x -= windStepWidth;
            }
            else {
                this.windBarMask.x = this.windBar.x
            }

            this.Health.text = this.playerHealth;

            // calculating distance and displaying it
            this.distanceTraveled += 0.01;
            this.distanceText.text = this.distanceTraveled.toFixed(2) + ' ft';

            // changing the terrain to water
            this.terrainRange += 0.01;
            // once ground is offscreen reset it to the front
            if (this.ground.x >= 1920) {
                this.terrainRange = -10;
                this.ground.x = -640;
            }
            if (this.water.x >= 1920) {
                this.water.x = -640;
                this.terrainRange = -10;
            }
            // the range has to stay like this but the values can change if that makes sense
            if (this.terrainRange >= 5 && this.terrainRange <= 30.8) {

                this.ground.x += 0.5;
                this.water.x += 0.5;
            }

            // when player presses space a seed drops
            // added cooldown for whenever pressed it's set to a value
            if (Phaser.Input.Keyboard.JustDown(keySpace) && this.dropCoolDown <= 0) {
                this.sound.play('sfx_drop');
                this.seed = this.physics.add.sprite(this.player.x, this.player.y, 'seed');
                this.seed.play({key:'seed'});
                this.seed.setScale(1.7);
                this.seed.setGravityY(135);
                this.seed.body.velocity.y= 500;
                this.seedGroup.add(this.seed);
                this.dropCoolDown = 300;
            }


            // moving the dandelion
            if (this.input.activePointer.isDown && this.windCoolDown <= 0) {
                this.sound.play('sfx_click');
                this.wind = this.add.sprite(this.input.x, this.input.y, 'wind');
                this.wind.play({key:'blow'});
                this.wind = this.add.sprite(this.input.x, this.input.y+10, 'wind');
                this.wind.play({key:'blow'});
                this.windCoolDown = 100;
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