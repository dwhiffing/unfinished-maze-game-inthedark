import Level from '../entities/level'
import MiniMap from '../entities/miniMap'
import InputManager from '../entities/InputManager'

export default {
  create(game) {
    game.stage.backgroundColor = "#235934"
    this.level = new Level(game, 9)
    this.miniMap = new MiniMap(game, this.level)
    this.inputManager = new InputManager(game)
    this.inputManager.bind("space", () => {
      this.level.map.placeNextTile()
      this.miniMap.update()
    })
    this.inputManager.bind("z", () => {
      this.level.map.rejigger()
      this.miniMap.update()
    })

    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.world.setBounds(0, 0, this.level.group.width, this.level.group.height)

    game.canvas.addEventListener('mousedown', () => game.input.mouse.requestPointerLock())

    game.camera.x = game.world.width/2-game.canvas.width/2
    game.camera.y = game.world.height/2-game.canvas.height/2

    game.input.addMoveCallback((pointer, x, y) => {
      if (game.input.mouse.locked) {
        game.camera.x += game.input.mouse.event.webkitMovementX
        game.camera.y += game.input.mouse.event.webkitMovementY
      }
    }, this)
  },

  update(game) {
    this.inputManager.update()
  },

  render(game) {
  }
}
