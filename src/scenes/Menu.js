class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
    // load audio
    this.load.audio('sfx_select', './assets/selectS.wav');
    this.load.audio('sfx_powerup', './assets/powerup.wav');
    this.load.audio('sfx_bird', './assets/bird.wav');
    this.load.audio('sfx_grass', './assets/rustling_grass.wav');
    this.load.audio('sfx_drop', './assets/drop.wav');
    this.load.audio('sfx_click', './assets/click.wav');
    this.load.audio('sfx_bloop', './assets/bloop.wav');
    this.load.audio('sfx_score', './assets/score.wav');
    this.load.audio('musicaudio', 'assets/background piano.mp3');
    this.load.image('bg', './assets/bg.png');
    this.load.image('guide', './assets/guide.png');
    this.load.image('guide_bg', './assets/teal_bg.png');
    }

    create() {
        this.add.image(0,0, "bg").setOrigin(0).setDepth(0);

        // background music
        var music = this.sound.add('musicaudio');
        music.setLoop(true);
        music.play();

        // menu text configuration
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
        this.add.text(game.config.width/2, game.config.height/2, 'Press S to Start', keyConfig).setOrigin(0.5,0.9);
        this.add.text(game.config.width/2, game.config.height/2, 'Press I to Instruction', keyConfig).setOrigin(0.5,-1.4);

        // define keys
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyS)) {
            // Novice mode
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyI)) {
            // Novice mode
            this.scene.start("instructionScene");
        }
    }
}