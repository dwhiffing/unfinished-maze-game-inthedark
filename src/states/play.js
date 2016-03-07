import Level from '../entities/level'
import MiniMap from '../entities/miniMap'
import LightManager from '../entities/lightManager'
import Player from '../entities/player'
import InputManager from '../entities/InputManager'

export default {
  create(game) {
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.stage.backgroundColor="#4488AA"
    game.rockTexture = game.add.tileSprite(0,0,game.canvas.width,game.canvas.height, 'rock')
    game.rockTexture.fixedToCamera = true
    this.level = new Level(game, 9)
    this.miniMap = new MiniMap(game, this.level)

    game.world.setBounds(0, 0, this.level.group.width, this.level.group.height)
    game.camera.x = game.world.width/2-game.canvas.width/2
    game.camera.y = game.world.height/2-game.canvas.height/2

    game.player = new Player(game)
    this.lightManager = new LightManager(game)
    game.world.bringToTop(this.miniMap.group)

    // this.inputManager = new InputManager(game)
    // this.inputManager.bind("space", () => {
    //   this.level.map.placeNextTile()
    //   this.miniMap.drawMap()
    // })
    // this.inputManager.bind("z", () => {
    //   this.level.map.rejigger()
    //   this.miniMap.update()
    // })
  },

  update(game) {
    // this.inputManager.update()
    this.miniMap.update(this.game.camera.x, this.game.camera.y)
    this.lightManager.update(game.input.x, game.input.y)
    game.player.update()
  },

  render(game) {
  }
}
