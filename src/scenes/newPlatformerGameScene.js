import Phaser from "phaser";

export default class newPlatformerGameScene extends Phaser.Scene {
    constructor(){
        super('platformer-game-scene')
    }

    init(){
        this.background = undefined
        this.player = undefined
        this.cursor = undefined
        this.platform = undefined 
    }

    preload(){
        this.load.image('background', 'images/Background/Green.png')
        this.load.spritesheet('Main-Character', 'images/Main Characters/Ninja Frog/Idle (32x32).png',
        {frameWidth:32, frameHeight:32})
        this.load.spritesheet('Main-Character-Run', 'images/Main Characters/Ninja Frog/Run (32x32).png',
        {frameWidth:32, frameHeight:32})
        this.load.spritesheet('Main-Character-Jump', 'images/Main Characters/Ninja Frog/Wall Jump (32x32).png',
        {frameWidth:32, frameHeight:32})
        this.load.spritesheet('Terrain', 'images/Terrain/Terrain (16x16).png',
        {frameWidth:48, frameHeight:64})
        this.load.image('Lava', 'images/Lava.jpg')
    }

    create(){
        this.addBackground()
        
        this.groundPlatform()
        this.player=this.physics.add.sprite(100, 450, 'Main-Character').setScale(1.5)
        this.player.setCollideWorldBounds(true)
        // this.physics.add.collider(this.player, this.platform)
        this.physics.add.collider(this.player, this.platform)

        this.createAnimations()
        this.cursor=this.input.keyboard.createCursorKeys()

        this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 2, 
            repeat: 2,
            setXY: {x: 62, y: 250,stepX: 48}
        })
        
    };

    update(){
        this.playerMovement()
        // this.player.anims.play('idle', true)
    }


    // EXTRA METHOD STARTS HERE
    addBackground(){
        this.background = this.add.tileSprite(0, 0, 1300, 600, 'background').setOrigin(0)
        this.background.tilePositionX = 0;
        this.background.tilePositionY = 0;
        this.background.setTileScale(1,1)
    }

    groundPlatform(){
        this.platform = this.physics.add.staticGroup({
            key: 'Lava',
            repeat: 22,
            setXY: {x: 30, y:575, stepX: 58}
        })
        this.platform.children.iterate(ground => {
            ground.setScale(0.2)
        })
        // this.platform.create(30, 575, 'Lava').setScale(0.2)

        
    }

    //CREATE PLAYER ANIMATIONS
    createAnimations(){
        //animation to the left
        this.anims.create({
            key:'left',
            frames: this.anims.generateFrameNumbers
                ('Main-Character-Run', {start:0, end:11}),
            frameRate: 10,
            repeat: -1
        })
        //animation to the right
        this.anims.create({
            key:'right',
            frames: this.anims.generateFrameNumbers
                ('Main-Character-Run', {start:0, end:11}),
            frameRate: 10,
            repeat: -1
        })
        //animation idle
        this.anims.create({
            key:'idle',
            frames: this.anims.generateFrameNumbers
                ('Main-Character', {start:0, end:10}),
            frameRate: 10,
            repeat: -1
        })
        //animation jump
        this.anims.create({
            key:'jump',
            frames: this.anims.generateFrameNumbers
                ('Main-Character-Jump', {start:0, end:4}),
            frameRate: 10,
            repeat: -1
        })
    }

    // PLAYER MOVEMENT
    playerMovement(){
        if (this.cursor.left.isDown){
            this.player.setVelocity(-200, 200).setFlipX(true)
            this.player.anims.play('left', true)
        }
        else if (this.cursor.right.isDown){
            this.player.setVelocity(200, 200).setFlipX(false)
            this.player.anims.play('right', true)
        }
        else{
            this.player.setVelocity(0, 200)
            this.player.anims.play('idle', true)
        }

         // Player Movement
        if (this.cursor.left.isDown) {
            this.player.setVelocity(-120, 500).setFlipX(true);
            this.player.anims.play('left', true);
        } else if (this.cursor.right.isDown) {
            this.player.setVelocity(120, 500).setFlipX(false);
            this.player.anims.play('main-player-run-right', true);
        } else {
            this.player.setVelocityX(0);
        }
        
        let isJumping = false;
        // Vertical Movement (Jump)
        if (this.cursor.up.isDown && !isJumping) {
            // Start the jump
            this.player.setVelocityY(-200);
            this.player.anims.play('main-player-jump', true);
            isJumping = true;
            // Set a timer to limit the jump duration (adjust the delay as needed)
            this.time.delayedCall(400, () => {
                // Stop the jump after the specified delay (500 milliseconds in this example)
                this.player.setVelocityY(200); // Apply downward velocity to end the jump
                isJumping = false;
            });
        }
        
        // Diagonal Jumping (left and up or right and up)
        if ((this.cursor.left.isDown && this.cursor.up.isDown) || (this.cursor.right.isDown && this.cursor.up.isDown)) {
            // Adjust velocity to make diagonal jumping smoother
            this.player.setVelocityY(-500);
        }
        // Play standby animation when not moving
        if (!this.cursor.left.isDown && !this.cursor.right.isDown && !this.cursor.up.isDown) {
            this.player.anims.play('main-player-standby', true);
        }
    }   

    
}