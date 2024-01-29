import Phaser from 'phaser'

// import PlatformerGameScene from './scenes/PlatformerGame'
import newPlatformerGameScene from './scenes/newPlatformerGameScene'


const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 1300,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug: true
		},
	},
	scene: [newPlatformerGameScene],
}

export default new Phaser.Game(config)
