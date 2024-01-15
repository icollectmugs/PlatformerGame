import Phaser from 'phaser'

export default class PlatformerGameScene extends
Phaser.Scene
{
    constructor() {
        super('platformer-game-scene')
    }
    init() {

    }

    preload() {
        this.load.image('background', 'images/Background/Green.png')

        this.load.image('Boxes', 'images/Items/Boxes/Box1/Break.png')
        this.load.image('Boxes', 'images/Items/Boxes/Box1/Hit(28x24).png')
        this.load.image('Boxes', 'images/Items/Boxes/Box1/Idle.png')

        this.load.image('Boxes', 'images/Items/Boxes/Box2/Break.png')
        this.load.image('Boxes', 'images/Items/Boxes/Box2/Hit(28x24).png')
        this.load.image('Boxes', 'images/Items/Boxes/Box2/Idle.png')

        this.load.image('Boxes', 'images/Items/Boxes/Box3/Break.png')
        this.load.image('Boxes', 'images/Items/Boxes/Box3/Hit(28x24).png')
        this.load.image('Boxes', 'images/Items/Boxes/Box3/Idle.png')
        
        this.load.image('Checkpoint', 'images/Items/Checkpoints/Checkpoint/Checkpoint (Flag Idle)(64x64).png')
        this.load.image('Checkpoint', 'images/Items/Checkpoints/Checkpoint/Checkpoint (Flag Out)(64x64).png')
        this.load.image('Checkpoint', 'images/Items/Checkpoints/Checkpoint/Checkpoint (No Flag).png')

        this.load.image('End', 'images/Items/Checkpoints/End/End (Idle).png')
        this.load.image('End', 'images/Items/Checkpoints/End/End (Pressed)(64x64).png')

        this.load.image('Start', 'images/Items/Checkpoints/Start/Start (Idle).png')
        this.load.image('Start', 'images/Items/Checkpoints/Start/Start (Moving)(64x64).png')

        this.load.image('Fruits', 'images/Items/Fruits/Apple.png')
        this.load.image('Fruits', 'images/Items/Fruits/Bananas.png')
        this.load.image('Fruits', 'images/Items/Fruits/Cherries.png')
        this.load.image('Fruits', 'images/Items/Fruits/Kiwi.png')
        this.load.image('Fruits', 'images/Items/Fruits/Melon.png')
        this.load.image('Fruits', 'images/Items/Fruits/Orange.png')
        this.load.image('Fruits', 'images/Items/Fruits/Pineapple.png')
        this.load.image('Fruits', 'images/Items/Fruits/Strawberry.png')

        this.load.image('Main Characters', 'images/Main Characters/Mask Dude.png')
        this.load.image('Main Characters', 'images/Main Characters/Ninja Frog.png')
        this.load.image('Main Characters', 'images/Main Characters/Pink Man.png')
        this.load.image('Main Characters', 'images/Main Characters/Virtual Guy.png')

        this.load.image('Main Characters', 'images/Main Characters/Appearing (96x96).png')
        this.load.image('Main Characters', 'images/Main Characters/Desappearing (96x96).png')

        this.load.image('Buttons, images/Menu/Buttons/Achievements.png')
        this.load.image('Buttons, images/Menu/Buttons/Back.png')
        this.load.image('Buttons, images/Menu/Buttons/Close.png')
        this.load.image('Buttons, images/Menu/Buttons/Leaderboard.png')
        this.load.image('Buttons, images/Menu/Buttons/Levels.png')
        this.load.image('Buttons, images/Menu/Buttons/Next.png')
        this.load.image('Buttons, images/Menu/Buttons/Play.png')
        this.load.image('Buttons, images/Menu/Buttons/Previous.png')
        this.load.image('Buttons, images/Menu/Buttons/Restart.png')
        this.load.image('Buttons, images/Menu/Buttons/Settings.png')
        this.load.image('Buttons, images/Menu/Buttons/Volume.png')

        this.load.image('Levels, images/Menu/Levels/01.png')

        this.load.image('Text, images/Menu/Text/Text(Black)(8x10).png')
        this.load.image('Text, images/Menu/Text/Text(White)(8x10).png')

        this.load.image('Welcome', 'images/Hello.png')
        
    }

    create() {
        //this.add.image(400, 300, 'Welcome')
        const background = this.add.tileSprite(0, 0, 800, 600, 'background').setOrigin(0);
        // Set the tile position
        background.tilePositionX = 0;
        background.tilePositionY = 0;
        // Enable tile sprite to repeat
        background.setTileScale(2, 2);
        
    }

    update() {

    }
}