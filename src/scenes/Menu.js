class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
    // load audio
    this.load.audio('sfx_select', './assets/select_D.wav');
    this.load.audio('sfx_powerup', './assets/powerup.wav');
    this.load.audio('sfx_bird', './assets/bird.wav');
    this.load.audio('sfx_grass', './assets/rustling_grass.wav');
    this.load.audio('sfx_drop', './assets/drop.wav');
    }

    create() {
        this.add.text(20,20, "Hello");
        this.scene.start("playScene");
    }
    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Papyrus',
            fontSize: '80px',
            color: '#B4E197',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let keyConfig = {
            fontFamily: 'Papyrus',
            fontSize: '30px',
            color: '#066163',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let startConfig = {
            fontFamily: 'Papyrus',
            fontSize: '30px',
            backgroundColor: '#066163',
            color: '#CDBE78',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2, 'HOW DANDY', menuConfig).setOrigin(0.5, 2.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press D to start', startConfig).setOrigin(0.5,-1);
        this.add.text(game.config.width/2, game.config.height/2, '>Use mouse to control Dandy<', keyConfig).setOrigin(0.5,2);
        this.add.text(game.config.width/2, game.config.height/2, '>Press space to drop seed<', keyConfig).setOrigin(0.5,1);

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