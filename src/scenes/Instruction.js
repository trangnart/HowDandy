class Guide extends Phaser.Scene {
    constructor() {
        super("instructionScene");
    }
    create() {
        let guideConfig = {
            fontFamily: 'Yoster',
            fontSize: '50px',
            //backgroundColor: '#64a0ac',
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
        this.add.image(0,0, "guide_bg").setOrigin(0,-0.1).setDepth(0);
        this.add.image(0,0, "guide").setOrigin(-0.1,-0.2);
        this.add.text(game.config.width/2, game.config.height/2, 'INSTRUCTION', guideConfig).setOrigin(0.5, 5.8);
        this.add.text(game.config.width/2, game.config.height/2, 'Press M to Menu', keyConfig).setOrigin(-0.8,-6);

        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            // Novice mode
            this.scene.start("menuScene");
        }
    }
}