import Level from '../entities/level'
import MiniMap from '../entities/miniMap'
import LightManager from '../entities/lightManager'
import Player from '../entities/player'
import InputManager from '../entities/InputManager'

export default {
  create(game) {
    game.physics.startSystem(Phaser.Physics.ARCADE)

    this.level = new Level(game, 9)
    this.miniMap = new MiniMap(game, this.level)

    game.world.setBounds(0, 0, this.level.group.width, this.level.group.height)
    game.camera.x = game.world.width/2-game.canvas.width/2
    game.camera.y = game.world.height/2-game.canvas.height/2

    this.player = new Player(game)
    this.lightManager = new LightManager(game, 100)
    game.world.bringToTop(this.miniMap.group)

    this.inputManager = new InputManager(game)
    // this.inputManager.bind("space", () => {
    //   this.level.map.placeNextTile()
    //   this.miniMap.update()
    // })
    // this.inputManager.bind("z", () => {
    //   this.level.map.rejigger()
    //   this.miniMap.update()
    // })
  },

  update(game) {
    this.inputManager.update()
    this.miniMap.update(this.game.camera.x, this.game.camera.y)
    this.lightManager.update()
    this.player.update()
  },

  render(game) {
  }
}
