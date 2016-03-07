import map from '../entities/map'
import MiniMap from '../entities/miniMap'
import LightManager from '../entities/lightManager'
import Player from '../entities/player'
import InputManager from '../entities/InputManager'

export default {
  create(game) {
    // game.stage.backgroundColor="#4488AA"

    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.center = [game.width/2, game.height/2]

    game.rockTexture = game.add.tileSprite(0,0,game.canvas.width,game.canvas.height, 'rock')
    game.rockTexture.fixedToCamera = true

    game.map = new map(game, 5)
    game.miniMap = new MiniMap(game, game.map)

    game.world.setBounds(0, 0, game.map.group.width, game.map.group.height)

    game.camera.x = game.world.width/2-game.canvas.width/2
    game.camera.y = game.world.height/2-game.canvas.height/2

    game.player = new Player(game)

    game.lightManager = new LightManager(game)

    game.world.bringToTop(game.miniMap.group)

    // game.inputManager = new InputManager(game)
    // game.inputManager.bind("space", () => {
    //   game.map.data.placeNextTile()
    //   game.miniMap.drawMap()
    // })
    // game.inputManager.bind("z", () => {
    //   game.map.data.rejigger()
    //   game.miniMap.update()
    // })
  },

  update(game) {
    // game.inputManager.update()
    game.miniMap.update(this.game.camera.x, this.game.camera.y)
    game.lightManager.update(game.input.x, game.input.y)
    game.player.update()
  },

  render(game) {
  }
}
