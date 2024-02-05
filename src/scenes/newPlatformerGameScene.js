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
        this.Pineapple2 = undefined
        this.Apple = undefined
        this.Apple2 = undefined
        this.collectPineapple = undefined
        this.collectAppleApple = undefined
        this.start = undefined
        this.end = undefined
        this.scoreText = undefined
        this.score = 0
        this.platform1 = undefined
        this.platform1a = undefined
        this.platform1b = undefined
        this.platform1c = undefined
        this.platform2 = undefined
        this.platform3 = undefined
        this.platform3a = undefined
        this.platform3a = undefined
        this.platform4 = undefined
        this.platform4a = undefined
        this.platform5 = undefined
        this.platform5a = undefined
        this.platform5b = undefined
        this.platform5c = undefined
        this.platform5d = undefined
        this.platform5e = undefined
        this.platform6 = undefined
        this.platform6a = undefined
        this.platform6b = undefined
        this.platform6c = undefined
        this.platform6d = undefined
        this.platform7 = undefined
        this.platform7a = undefined
        this.platform7b = undefined
    }

    preload(){
        this.load.image('background', 'images/Background/Green.png')
        this.load.image('Lava', 'images/Lava.jpg')
        this.load.image('Terrain', 'images/Terrain-Gray.png')
        this.load.image('Terrain2', 'images/Terrain-Pocket-Green.png')
        this.load.image('Terrain3', 'images/Terrain-Green.png')
        //
        //
        //CHECK POINTS
        this.load.spritesheet('Start-Moving', 'images/Items/Checkpoints/Start/Start (Moving) (64x64).png',
        {frameWidth:64, frameHeight:64})
        this.load.spritesheet('End-Moving', 'images/Items/Checkpoints/End/End (Pressed) (64x64).png',
        {frameWidth:64, frameHeight:64})
        //
        //
        //PLAYER
        this.load.spritesheet('Main-Character', 'images/Main Characters/Ninja Frog/Idle (32x32).png',
        {frameWidth:32, frameHeight:32})
        this.load.spritesheet('Main-Character-Run', 'images/Main Characters/Ninja Frog/Run (32x32).png',
        {frameWidth:32, frameHeight:32})
        this.load.spritesheet('Main-Character-Jump', 'images/Main Characters/Ninja Frog/Wall Jump (32x32).png',
        {frameWidth:32, frameHeight:32})
        //
        //
        //COLLECT ITEM
        this.load.spritesheet('Pineapple', 'images/Items/Fruits/Pineapple.png',
        {frameWidth:32, frameHeight:32})
        this.load.spritesheet('Apple', 'images/Items/Fruits/Apple.png',
        {frameWidth:32, frameHeight:32})
        //
        //
        // SFX
        this.load.audio('bgsound', 'sfx/movingrightalong.wav')
        this.load.audio('jump', 'sfx/Jump-SoundBible.com-1007297584.mp3')
        this.load.audio('collecting', 'sfx/Picked Coin Echo.wav')
    }

    create(){
        this.addBackground()
        this.groundPlatform()
        //
        //
        this.allPlatform()
        //
        //

        this.start=this.add.sprite(100, 378, 'Start-Moving').setScale(1.5)
        this.end=this.add.sprite(50, 105, 'End-Moving')
        //
        //
        this.createAnimations()
        this.player=this.physics.add.sprite(100, 300, 'Main-Character').setScale(1.5)
        this.player.setCollideWorldBounds(true)
        this.playerCollide()
        
        this.cursor=this.input.keyboard.createCursorKeys()
        //
        //
        //
        //
        this.createPineapple()
        this.createApple()
        this.pineappleCollide()
        this.appleCollide()
        //
        //

       
        //OVERLAP METHOD
        this.physics.add.overlap(
            this.player,
            this.Pineapple,
            this.collect,
            null,
            this
        )
        this.physics.add.overlap(
            this.player,
            this.Pineapple2,
            this.collect2,
            null,
            this
        )
        this.physics.add.overlap(
            this.player,
            this.Apple,
            this.collectA,
            null,
            this
        )
        this.physics.add.overlap(
            this.player,
            this.Apple2,
            this.collectA2,
            null,
            this
        )
        //
        //

        //DISPLAY SCORE
        this.add.text(16, 16, 'Score', {
            // @ts-ignore
            fontSize: '32px', fill:'white'
        })
        this.scoreText= this.add.text(16,16, 'Score : 0', {
            // @ts-ignore
            fontSize: '32px', fill: 'yellow'
        })
    }

    update(){
        this.playerMovement()
        if(this.player.body.position.x <= 50 && this.player.body.position.y <= 105){
            this.physics.pause()
            console.log('YOU WIN')
            this.add.text(300, 300, 'You Win BRO!!!', {
                fontSize: '64px', fill: 'red'
            })
        }

        if (this.player.body.position.y > 490) {
            // Player is on platform 1
            this.physics.pause()
            console.log('Player is dead!');
            this.player.setTint(0xff0000);
            this.add.text(300, 300, 'You DEAD BRO!!!', {
                fontSize: '64px', fill: 'red'
            })
        } 

        
    }

    collect(player, Pineapple){
        Pineapple.destroy()
        this.sound.play('collecting')
        this.score += 10;
        this.scoreText.setText('Score : ' + this.score);
        
        
    }
    collect2(player, Pineapple2){
        Pineapple2.destroy()
        this.sound.play('collecting')
        this.score += 10;
        this.scoreText.setText('Score : ' + this.score);
    }

    collectA(player, Apple){
        Apple.destroy()
        this.sound.play('collecting')
        this.score += 10;
        this.scoreText.setText('Score : ' + this.score);
    }
    collectA2(player, Apple2){
        Apple2.destroy()
        this.sound.play('collecting')
        this.score += 10;
        this.scoreText.setText('Score : ' + this.score);
    }


    // EXTRA METHOD STARTS HERE
    addBackground(){
        this.background = this.add.tileSprite(0, 0, 1300, 600, 'background').setOrigin(0)
        this.background.tilePositionX = 0;
        this.background.tilePositionY = 0;
        this.background.setTileScale(1,1)
    }

    groundPlatform(){
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
        // animation to the left
        this.anims.create({
            key:'left',
            frames: this.anims.generateFrameNumbers
                ('Main-Character-Run', {start:0, end:11}),
            frameRate: 10,
            repeat: -1
        })
        // animation to the right
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
        //animation Start_Moving Flag
        // this.anims.create({
        //     key:'Start_Moving',
        //     frames: this.anims.generateFrameNumbers
        //         ('Start-Moving', {start:0, end:16}),
        //     frameRate: 10,
        //     repeat: -1
        // })
        //animation jump
        this.anims.create({
            key:'jump',
            frames: this.anims.generateFrameNumbers
                ('Main-Character-Jump', {start:0, end:4}),
            frameRate: 10,
            repeat: -1
        })
    }
    //
    //

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
            this.player.setVelocityX(0)
            this.player.anims.play('idle', true)
        }
        
        let isJumping = false;
        // Vertical Movement (Jump)
        if (this.cursor.up.isDown && !isJumping) {
            // Start the jump
            this.player.setVelocityY(-200);
            this.player.anims.play('jump', true);
            isJumping = true;
            // Set a timer to limit the jump duration (adjust the delay as needed)
            this.time.delayedCall(800, () => {
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
            this.player.anims.play('idle', true);
        }
    }
    //
    //
    

    

    // PLATFORM1========================
    createPlatform1(){
        this.platform1 = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 0, 
            repeat: 2,
            setXY: {x: 62, y: 498,stepX: 48}
        })
    }
    //
    //
    createPlatform1a(){
        this.platform1a = this.physics.add.staticGroup({
            key: 'Terrain3',
            frame: 2, 
            repeat: 2,
            setXY: {x: 62, y: 450,stepX: 48}
        })
    }   
    //
    //
    createPlatform1b(){
        this.platform1b = this.physics.add.staticGroup({
            key: 'Terrain2',
            frame: 3, 
            repeat: 2,
            setXY: {x: 1180, y: 338,stepX: 48}
        })
        this.platform1b.children.iterate(ab => {
            // @ts-ignore
            ab.setScale(1.5).refreshBody()
        })
    } 
    //
    //  
    createPlatform1c(){
        this.platform1c = this.physics.add.staticGroup({
            key: 'Terrain2',
            frame: 3, 
            repeat: 1,
            setXY: {x: 1228, y: 290,stepX: 48}
        })
        this.platform1c.children.iterate(ab => {
            // @ts-ignore
            ab.setScale(1.5).refreshBody()
        })
    }   
    //
    //
       
    // PLATFORM2========================
    createPlatform2(){
        this.platform2 = this.physics.add.staticGroup({
            key: 'Terrain3',
            frame: 2, 
            repeat: 2,
            setXY: {x: 300, y: 420,stepX: 48}
        })
    }
    //
    //
    createPlatform2a(){
        this.platform2a = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 0, 
            repeat: 2,
            setXY: {x: 300, y: 468,stepX: 48}
        })
    }   
    //
    //
    createPlatform2b(){
        this.platform2b = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 0, 
            setXY: {x: 348, y: 516}
        })
    }   
    //
    //

    // PLATFORM3========================
    createPlatform3(){
        this.platform3 = this.physics.add.staticGroup({
            key: 'Terrain3',
            frame: 2, 
            repeat: 2,
            setXY: {x: 550, y: 400,stepX: 48}
        })
    }   
    //
    //
    createPlatform3a(){
        this.platform3a = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 0, 
            repeat: 2,
            setXY: {x: 550, y: 448,stepX: 48}
        })
    }   
    //
    //

    // PLATFORM4========================
    createPlatform4(){
        this.platform4 = this.physics.add.staticGroup({
            key: 'Terrain3',
            frame: 2, 
            repeat: 2,
            setXY: {x: 800, y: 400,stepX: 48}
        })
    }
    //
    //   
    createPlatform4a(){
        this.platform4a = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 0, 
            repeat: 2,
            setXY: {x: 800, y: 448,stepX: 48}
        })
    }   
    //
    //

    // PLATFORM5========================
    createPlatform5(){
        this.platform5 = this.physics.add.staticGroup({
            key: 'Terrain3',
            frame: 2, 
            repeat: 4,
            setXY: {x: 1084, y: 385,stepX: 48}
        })
    }   
    //
    //
    createPlatform5a(){
        this.platform5a = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 0, 
            repeat: 4,
            setXY: {x: 1084, y: 433,stepX: 48}
        })
    }   
    //
    //
    createPlatform5b(){
        this.platform5b = this.physics.add.staticGroup({
            key: 'Terrain3',
            frame: 2, 
            repeat: 1,
            setXY: {x: 1228, y: 242,stepX: 48}
        })
    }   
    //
    //
    createPlatform5c(){
        this.platform5c = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 0, 
            repeat: 3,
            setXY: {x: 1132, y: 481,stepX: 48}
        })
    }   
    //
    //
    createPlatform5d(){
        this.platform5d = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 0, 
            repeat: 3,
            setXY: {x: 1132, y: 529,stepX: 48}
        })
    }   
    //
    //
    createPlatform5e(){
        this.platform5e = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 0, 
            repeat: 2,
            setXY: {x: 1180, y: 577,stepX: 48}
        })
    }   
    //
    //

    // PLATFORM6========================
    createPlatform6(){
        this.platform6 = this.physics.add.staticGroup({
            key: 'Terrain3',
            frame: 2, 
            repeat: 3,
            setXY: {x: 850, y: 171 ,stepX: 48}
        })
    }   
    //
    //
    createPlatform6a(){
        this.platform6a = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 0, 
            repeat: 3,
            setXY: {x: 850, y: 219,stepX: 48}
        })
    }   
    //
    //
    createPlatform6b(){
        this.platform6b = this.physics.add.staticGroup({
            key: 'Terrain3',
            frame: 2, 
            repeat: 2,
            setXY: {x: 500, y: 171,stepX: 48}
        })
    }   
    //
    //
    createPlatform6c(){
        this.platform6c = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 0, 
            repeat: 2,
            setXY: {x: 500, y: 219,stepX: 48}
        })
    }  
    //
    // 
    createPlatform6d(){
        this.platform6d = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 0, 
            repeat: 0,
            setXY: {x: 548, y: 267,stepX: 48}
        })
    }   
    //
    //

    // PLATFORM 7 ========================
    createPlatform7(){
        this.platform7 = this.physics.add.staticGroup({
            key: 'Terrain3',
            frame: 2, 
            repeat: 5,
            setXY: {x: 24, y: 160,stepX: 48}
        })
    }   
    //
    //
    createPlatform7a(){
        this.platform7a = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 0, 
            repeat: 4,
            setXY: {x: 24, y: 208,stepX: 48}
        })
    }  
    //
    // 
    createPlatform7b(){
        this.platform7b = this.physics.add.staticGroup({
            key: 'Terrain',
            frame: 0, 
            repeat: 2,
            setXY: {x: 24, y: 256,stepX: 48}
        })
    }   
    //
    //

    // ALL PLATFORM
    allPlatform(){
        this.createPlatform1()
        this.createPlatform1a()
        this.createPlatform1b()
        this.createPlatform1c()
        //
        //
        this.createPlatform2()
        this.createPlatform2a()
        this.createPlatform2b()
        //
        //
        this.createPlatform3()
        this.createPlatform3a()
        //
        //
        this.createPlatform4()
        this.createPlatform4a()
        //
        //
        this.createPlatform5()
        this.createPlatform5a()
        this.createPlatform5b()
        this.createPlatform5c()
        this.createPlatform5d()
        this.createPlatform5e()
        //
        //
        this.createPlatform6()
        this.createPlatform6a()
        this.createPlatform6b()
        this.createPlatform6c()
        this.createPlatform6d()
        //
        //
        this.createPlatform7()
        this.createPlatform7a()
        this.createPlatform7b()
    }

    //PLAYER COLLIDER
    playerCollide(){
                this.physics.add.collider(this.player, this.platform) // Collide with Ground Platform
        this.physics.add.collider(this.player, this.platform1) // Collide with platform 1
        this.physics.add.collider(this.player, this.platform1a) // Collide with platform 1a
        this.physics.add.collider(this.player, this.platform1b) // Collide with platform 1b
        this.physics.add.collider(this.player, this.platform1c) // Collide with platform 1c
        //
        //
        this.physics.add.collider(this.player, this.platform2)
        this.physics.add.collider(this.player, this.platform2a)
        this.physics.add.collider(this.player, this.platform2b)
        //
        //
        this.physics.add.collider(this.player, this.platform3)
        this.physics.add.collider(this.player, this.platform3a)
        //
        //
        this.physics.add.collider(this.player, this.platform4)
        this.physics.add.collider(this.player, this.platform4a)
        //
        //
        this.physics.add.collider(this.player, this.platform5)
        this.physics.add.collider(this.player, this.platform5a)
        this.physics.add.collider(this.player, this.platform5b)
        this.physics.add.collider(this.player, this.platform5c)
        this.physics.add.collider(this.player, this.platform5d)
        this.physics.add.collider(this.player, this.platform5e)
        //
        //
        this.physics.add.collider(this.player, this.platform6)
        this.physics.add.collider(this.player, this.platform6a)
        this.physics.add.collider(this.player, this.platform6b)
        this.physics.add.collider(this.player, this.platform6c)
        this.physics.add.collider(this.player, this.platform6d)
        //
        //
        this.physics.add.collider(this.player, this.platform7)
        this.physics.add.collider(this.player, this.platform7a)
        this.physics.add.collider(this.player, this.platform7b)

    }

    //PINEAPPLE
    createPineapple(){
        this.Pineapple = this.physics.add.group({
            key:'Pineapple',
            repeat: 10,
            setXY: {x:0, y:0, stepX:60}
        })
        this.Pineapple.children.iterate(pine=> {
            // @ts-ignore
            pine.setScale(1.7)
        })
        this.Pineapple2 = this.physics.add.group({
            key:'Pineapple',
            repeat: 8,
            setXY: {x:500, y:300, stepX:60}
        })
        this.Pineapple2.children.iterate(child=> {
            // @ts-ignore
            child.setScale(1.7).setBounceY(0.5)
        })
    }

    pineappleCollide(){
        this.physics.add.collider(this.Pineapple, this.platform1)
        this.physics.add.collider(this.Pineapple, this.platform1a)
        this.physics.add.collider(this.Pineapple, this.platform1b)
        this.physics.add.collider(this.Pineapple, this.platform1c)
        this.physics.add.collider(this.Pineapple, this.platform2)
        this.physics.add.collider(this.Pineapple, this.platform2a)
        this.physics.add.collider(this.Pineapple, this.platform2b)
        this.physics.add.collider(this.Pineapple, this.platform3)
        this.physics.add.collider(this.Pineapple, this.platform3a)
        this.physics.add.collider(this.Pineapple, this.platform4)
        this.physics.add.collider(this.Pineapple, this.platform4a)
        this.physics.add.collider(this.Pineapple, this.platform5)
        this.physics.add.collider(this.Pineapple, this.platform5a)
        this.physics.add.collider(this.Pineapple, this.platform5b)
        this.physics.add.collider(this.Pineapple, this.platform5c)
        this.physics.add.collider(this.Pineapple, this.platform5d)
        this.physics.add.collider(this.Pineapple, this.platform5e)
        this.physics.add.collider(this.Pineapple, this.platform6)
        this.physics.add.collider(this.Pineapple, this.platform6a)
        this.physics.add.collider(this.Pineapple, this.platform6b)
        this.physics.add.collider(this.Pineapple, this.platform6c)
        this.physics.add.collider(this.Pineapple, this.platform6d)
        this.physics.add.collider(this.Pineapple, this.platform7)
        this.physics.add.collider(this.Pineapple, this.platform7a)
        this.physics.add.collider(this.Pineapple, this.platform7b)
        //
        //
        this.physics.add.collider(this.Pineapple2, this.platform1)
        this.physics.add.collider(this.Pineapple2, this.platform1a)
        this.physics.add.collider(this.Pineapple2, this.platform1b)
        this.physics.add.collider(this.Pineapple2, this.platform1c)
        this.physics.add.collider(this.Pineapple2, this.platform2)
        this.physics.add.collider(this.Pineapple2, this.platform2a)
        this.physics.add.collider(this.Pineapple2, this.platform2b)
        this.physics.add.collider(this.Pineapple2, this.platform3)
        this.physics.add.collider(this.Pineapple2, this.platform3a)
        this.physics.add.collider(this.Pineapple2, this.platform4)
        this.physics.add.collider(this.Pineapple2, this.platform4a)
        this.physics.add.collider(this.Pineapple2, this.platform5)
        this.physics.add.collider(this.Pineapple2, this.platform5a)
        this.physics.add.collider(this.Pineapple2, this.platform5b)
        this.physics.add.collider(this.Pineapple2, this.platform5c)
        this.physics.add.collider(this.Pineapple2, this.platform5d)
        this.physics.add.collider(this.Pineapple2, this.platform5e)
        this.physics.add.collider(this.Pineapple2, this.platform6)
        this.physics.add.collider(this.Pineapple2, this.platform6a)
        this.physics.add.collider(this.Pineapple2, this.platform6b)
        this.physics.add.collider(this.Pineapple2, this.platform6c)
        this.physics.add.collider(this.Pineapple2, this.platform6d)
        this.physics.add.collider(this.Pineapple2, this.platform7)
        this.physics.add.collider(this.Pineapple2, this.platform7a)
        this.physics.add.collider(this.Pineapple2, this.platform7b)
    }
    //
    //

    //APPLE
    createApple(){
        this.Apple = this.physics.add.group({
            key:'Apple',
            repeat: 6,
            setXY: {x:800, y:0, stepX:60}
        })
        this.Apple.children.iterate(apple=> {
            // @ts-ignore
            apple.setScale(1.7).refreshBody()
        })
        this.Apple2 = this.physics.add.group({
            key:'Apple',
            repeat: 10,
            setXY: {x:90, y:300, stepX:90}
        })
        this.Apple2.children.iterate(apple=> {
            // @ts-ignore
            apple.setScale(1.7).refreshBody()
        })
    }
    //
    //
    appleCollide(){
        this.physics.add.collider(this.Apple, this.platform1)
        this.physics.add.collider(this.Apple, this.platform1a)
        this.physics.add.collider(this.Apple, this.platform1b)
        this.physics.add.collider(this.Apple, this.platform1c)
        this.physics.add.collider(this.Apple, this.platform2)
        this.physics.add.collider(this.Apple, this.platform2a)
        this.physics.add.collider(this.Apple, this.platform2b)
        this.physics.add.collider(this.Apple, this.platform3)
        this.physics.add.collider(this.Apple, this.platform3a)
        this.physics.add.collider(this.Apple, this.platform4)
        this.physics.add.collider(this.Apple, this.platform4a)
        this.physics.add.collider(this.Apple, this.platform5)
        this.physics.add.collider(this.Apple, this.platform5a)
        this.physics.add.collider(this.Apple, this.platform5b)
        this.physics.add.collider(this.Apple, this.platform5c)
        this.physics.add.collider(this.Apple, this.platform5d)
        this.physics.add.collider(this.Apple, this.platform5e)
        this.physics.add.collider(this.Apple, this.platform6)
        this.physics.add.collider(this.Apple, this.platform6a)
        this.physics.add.collider(this.Apple, this.platform6b)
        this.physics.add.collider(this.Apple, this.platform6c)
        this.physics.add.collider(this.Apple, this.platform6d)
        this.physics.add.collider(this.Apple, this.platform7)
        this.physics.add.collider(this.Apple, this.platform7a)
        this.physics.add.collider(this.Apple, this.platform7b)
        //
        //
        // this.physics.add.collider(this.Apple2, this.platform)
        this.physics.add.collider(this.Apple2, this.platform1)
        this.physics.add.collider(this.Apple2, this.platform1a)
        this.physics.add.collider(this.Apple2, this.platform1b)
        this.physics.add.collider(this.Apple2, this.platform1c)
        this.physics.add.collider(this.Apple2, this.platform2)
        this.physics.add.collider(this.Apple2, this.platform2a)
        this.physics.add.collider(this.Apple2, this.platform2b)
        this.physics.add.collider(this.Apple2, this.platform3)
        this.physics.add.collider(this.Apple2, this.platform3a)
        this.physics.add.collider(this.Apple2, this.platform4)
        this.physics.add.collider(this.Apple2, this.platform4a)
        this.physics.add.collider(this.Apple2, this.platform5)
        this.physics.add.collider(this.Apple2, this.platform5a)
        this.physics.add.collider(this.Apple2, this.platform5b)
        this.physics.add.collider(this.Apple2, this.platform5c)
        this.physics.add.collider(this.Apple2, this.platform5d)
        this.physics.add.collider(this.Apple2, this.platform5e)
        this.physics.add.collider(this.Apple2, this.platform6)
        this.physics.add.collider(this.Apple2, this.platform6a)
        this.physics.add.collider(this.Apple2, this.platform6b)
        this.physics.add.collider(this.Apple2, this.platform6c)
        this.physics.add.collider(this.Apple2, this.platform6d)
        this.physics.add.collider(this.Apple2, this.platform7)
        this.physics.add.collider(this.Apple2, this.platform7a)
        this.physics.add.collider(this.Apple2, this.platform7b)
    }
}