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
        

        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            // Novice mode
            this.scene.start("menuScene");
        }
    }
}