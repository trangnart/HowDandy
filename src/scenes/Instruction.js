class Guide extends Phaser.Scene {
    constructor() {
        super("instructionScene");
    }
    create() {
        let titleConfig = {
            fontFamily: 'Yoster',
            fontSize: '50px',
            color: '#bed4d4',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let keyConfig = {
            fontFamily: 'Yoster',
            fontSize: '35px',
            backgroundColor: '#000000',
            color: '#bed4d4',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let wordConfig = {
            fontFamily: 'Yoster',
            fontSize: '26px',
            color: '#000000',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let redConfig = {
            fontFamily: 'Yoster',
            fontSize: '26px',
            color: '#ff0000',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let word2Config = {
            fontFamily: 'Yoster',
            fontSize: '23px',
            color: '#000000',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let greenConfig = {
            fontFamily: 'Yoster',
            fontSize: '26px',
            color: '#86b049',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.image(0,0, "guide_bg").setOrigin(0,-0.1).setDepth(0);
        this.add.image(0,0, "guide").setOrigin(0.04,-0.07);
        this.add.text(game.config.width/2, game.config.height/2, 'INSTRUCTION', titleConfig).setOrigin(0.5, 5.8);
        this.add.text(game.config.width/2, game.config.height/2, 'Press M to Menu', keyConfig).setOrigin(-1,-6.1);
        this.add.text(game.config.width/2, game.config.height/2, 'click at Dandy to keep it flying', wordConfig).setOrigin(1.1, 6);
        this.add.text(game.config.width/2, game.config.height/2, 'press SPACE to drop seed', wordConfig).setOrigin(1.2, 2.3);
        this.add.text(game.config.width/2, game.config.height/2, 'hit ground  =        seed', wordConfig).setOrigin(1.29, -1.06);
        this.add.text(game.config.width/2, game.config.height/2, '-1', redConfig).setOrigin(5.5, -1.06);
        this.add.text(game.config.width/2, game.config.height/2, 'hit water  =', wordConfig).setOrigin(2.5, -4.55);
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', redConfig).setOrigin(1.65, -4.55);
        this.add.text(game.config.width/2, game.config.height/2, 'hit bird =        seed', wordConfig).setOrigin(1.43, -8);
        this.add.text(game.config.width/2, game.config.height/2, '-1', redConfig).setOrigin(6.1, -8);
        this.add.text(game.config.width/2, game.config.height/2, 'collect seed  =         seed', wordConfig).setOrigin(-0.5, 6);
        this.add.text(game.config.width/2, game.config.height/2, '0 seed  =', wordConfig).setOrigin(-0.4, 2.5);
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', redConfig).setOrigin(-1.3, 2.5);
        this.add.text(game.config.width/2, game.config.height/2, '+1', greenConfig).setOrigin(-7.5, 6);
        this.add.text(game.config.width/2, game.config.height/2, 'drop seed at ground =              points', word2Config).setOrigin(-0.34, -1.3);
        this.add.text(game.config.width/2, game.config.height/2, '+200', greenConfig).setOrigin(-5.1, -1.24);
        this.add.text(game.config.width/2, game.config.height/2, 'drop seed at water =      point', word2Config).setOrigin(-0.5, -5.1);
        this.add.text(game.config.width/2, game.config.height/2, '0', redConfig).setOrigin(-25.5, -4.6);

        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            // Novice mode
            this.scene.start("menuScene");
        }
    }
}