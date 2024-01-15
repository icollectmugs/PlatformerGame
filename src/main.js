import Phaser from 'phaser'

import PlatformerGameScene from './scenes/PlatformerGame'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [PlatformerGameScene],
}

export default new Phaser.Game(config)
