class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    // preload() {

    // }

    create() {
        this.add.text(20,20, "Hello");
        this.scene.start("playScene");
    }

   
}