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
        this.Pineapple = undefined
        this.Apple = undefined
        this.platform1 = undefined
        this.platform1a = undefined
        this.platform2 = undefined
        this.platform3 = undefined
        this.platform3a = undefined
        this.platform3a = undefined
        this.platform4 = undefined
        this.platform4a = undefined
        this.platform5 = undefined
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
        this.load.spritesheet('Terrain2', 'images/Terrain/Terrain (16x16).png',
        {frameWidth:48, frameHeight:32})
        this.load.image('Lava', 'images/Lava.jpg')
        this.load.spritesheet('Pineapple', 'images/Items/Fruits/Pineapple.png',
        {frameWidth:32, frameHeight:32})
        this.load.spritesheet('Apple', 'images/Items/Fruits/Apple.png',
        {frameWidth:32, frameHeight:32})

        this.load.audio('bgsound', 'sfx/movingrightalong.wav')
        this.load.audio('jump', 'sfx/Jump-SoundBible.com-1007297584.mp3')
        this.load.audio('collecting', 'sfx/Picked Coin Echo 2.wav')
        this.load.audio('menu', 'sfx/Picked Coin Echo 2.wav')
    }

    create(){
        this.addBackground()
        
        this.groundPlatform()
        this.createPlatform1()
        this.createPlatform1a()
        this.createPlatform1ab()
        this.createPlatform2()
        this.createPlatform2a()
        this.createPlatform2b()
        this.createPlatform3()
        this.createPlatform3a()
        this.createPlatform4()
        this.createPlatform4a()
        this.createPlatform5()

        this.player=this.physics.add.sprite(100, 300, 'Main-Character').setScale(1.5)
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.platform)
        this.physics.add.collider(this.player, this.platform1)
        this.physics.add.collider(this.player, this.platform1a)
        this.physics.add.collider(this.player, this.platform2)
        this.physics.add.collider(this.player, this.platform3)
        this.physics.add.collider(this.player, this.platform3a)
        this.physics.add.collider(this.player, this.platform4)
        this.physics.add.collider(this.player, this.platform4a)
        this.physics.add.collider(this.player, this.platform5)
        this.createAnimations()
        this.cursor=this.input.keyboard.createCursorKeys()

        this.Pineapple = this.physics.add.group({
            key:'Pineapple',
            repeat: 10,
            setXY: {x:40, y:0, stepX:60}
        })
        this.Pineapple.children.iterate(Pineapple=> {
            Pineapple.setScale(2)
        })
        this.Apple = this.physics.add.group({
            key:'Apple',
            repeat: 15,
            setXY: {x:50, y:0, stepX:90}
        })
        this.Apple.children.iterate(Apple=> {
            Apple.setScale(2)
        })
        this.physics.add.collider(this.Pineapple, this.platform)
        this.physics.add.collider(this.Apple, this.platform)
        this.physics.add.collider(this.Pineapple, this.platform1)
        this.physics.add.collider(this.Apple, this.platform1)
        this.physics.add.collider(this.Pineapple, this.platform2)
        this.physics.add.collider(this.Apple, this.platform2)
        this.physics.add.collider(this.Pineapple, this.platform3)
        this.physics.add.collider(this.Apple, this.platform3)

        this.Pineapple.children.iterate(function(child){
            child.setBounceY(0.2)
        })
        this.Apple.children.iterate(function(child){
            child.setBounceY(0.2)
        })

        this.physics.add.overlap(
            this.player,
            this.Pineapple,
            this.collectPineapple,
            null,
            this
        )
        this.physics.add.overlap(
            this.player,
            this.Apple,
            this.collectApple,
            null,
            this
        )
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
        // this.platform = this.physics.add.staticGroup({
        //     key: 'Lava',
        //     repeat: 22,
        //     setXY: {x: 30, y:575, stepX: 58}
        // })
        // this.platform.children.iterate(ground => {
        //     ground.setScale(0.2)
        // })
        // this.platform.create(30, 575, 'Lava').setScale(0.2)

        this.platform = this.physics.add.staticGroup()
            this.platform.create(25, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(75, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(125, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(175, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(225, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(275, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(325, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(375, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(425, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(475, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(525, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(575, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(625, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(675, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(725, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(775, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(825, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(875, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(925, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(975, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(1025, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(1075, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(1125, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(1175, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(1225, 575, 'Lava').setScale(0.2).refreshBody()
            this.platform.create(1275, 575, 'Lava').setScale(0.2).refreshBody()

        
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
        // if (this.cursor.left.isDown) {
        //     this.player.setVelocity(-120, 500).setFlipX(true);
        //     this.player.anims.play('left', true);
        // } else if (this.cursor.right.isDown) {
        //     this.player.setVelocity(120, 500).setFlipX(false);
        //     this.player.anims.play('main-player-run-right', true);
        // } else {
        //     this.player.setVelocityX(0);
        // }
        
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
    
    //COLLECT PINEAPPLE
    collectPineapple(player, Pineapple){
        Pineapple.destroy()
        this.sound.play('collecting')
    }
    //COLLECT APPLE
    collectApple(player, Apple){
        Apple.destroy()
        this.sound.play('collecting')
    }

    // PLATFORM1
    createPlatform1a(){
        this.platform1a = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 2, 
            repeat: 2,
            setXY: {x: 62, y: 450,stepX: 48}
        })
    }   
    createPlatform1ab(){
        this.platform1ab = this.physics.add.staticGroup({
            key: 'Terrain2',
            frame: 3, 
            repeat: 1,
            setXY: {x: 1095, y: 340,stepX: 48}
        })
        this.platform1ab.children.iterate(ab => {
            ab.setScale(1.5)
        })
    }   
    createPlatform1(){
        this.platform1 = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 0, 
            repeat: 2,
            setXY: {x: 62, y: 498,stepX: 48}
        })
    }   
    // PLATFORM2
    createPlatform2(){
        this.platform2 = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 2, 
            repeat: 2,
            setXY: {x: 300, y: 420,stepX: 48}
        })
    }   
    createPlatform2a(){
        this.platform2a = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 0, 
            repeat: 2,
            setXY: {x: 300, y: 465,stepX: 48}
        })
    }   
    createPlatform2b(){
        this.platform2b = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 0, 
            setXY: {x: 348, y: 513}
        })
    }   
    // PLATFORM2
    createPlatform3(){
        this.platform3 = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 2, 
            repeat: 2,
            setXY: {x: 550, y: 400,stepX: 48}
        })
    }   
    createPlatform3a(){
        this.platform3a = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 0, 
            repeat: 2,
            setXY: {x: 550, y: 448,stepX: 48}
        })
    }   
    createPlatform4(){
        this.platform4 = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 2, 
            repeat: 2,
            setXY: {x: 800, y: 400,stepX: 48}
        })
    }   
    createPlatform4a(){
        this.platform4 = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 0, 
            repeat: 2,
            setXY: {x: 800, y: 448,stepX: 48}
        })
    }   
    createPlatform5(){
        this.platform5 = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 2, 
            repeat: 4,
            setXY: {x: 1083, y: 300,stepX: 48}
        })
    }   
}