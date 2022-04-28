class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
    // load bg menu
    this.load.image('bg', './assets/bg.png');
    // load audio
    this.load.audio('sfx_select', './assets/select_D.wav');
    this.load.audio('sfx_powerup', './assets/powerup.wav');
    this.load.audio('sfx_bird', './assets/bird.wav');
    this.load.audio('sfx_grass', './assets/rustling_grass.wav');
    this.load.audio('sfx_drop', './assets/drop.wav');
    }

    create() {
        // menu text configuration
        this.add.image(0,0, "bg").setOrigin(0).setDepth(0);
        let menuConfig = {
            fontFamily: 'Yoster',
            fontSize: '80px',
            color: '#eeeeee',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let keyConfig = {
            fontFamily: 'Yoster',
            fontSize: '30px',
            color: '#c2b7a4',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let startConfig = {
            fontFamily: 'Yoster',
            fontSize: '30px',
            backgroundColor: '#344501',
            color: '#a5b378',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2, 'HOW DANDY', menuConfig).setOrigin(0.5, 2.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press D to start', startConfig).setOrigin(0.5,-1.5);
        this.add.text(game.config.width/2, game.config.height/2, '>Use mouse to control Dandy<', keyConfig).setOrigin(0.5,2);
        this.add.text(game.config.width/2, game.config.height/2, '>Press space to drop seed<', keyConfig).setOrigin(0.5,0.8);

        // define keys
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            // Novice mode
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }
}