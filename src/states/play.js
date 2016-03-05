import Level from '../entities/level'
import MiniMap from '../entities/miniMap'
import LightManager from '../entities/lightManager'
import InputManager from '../entities/InputManager'

let shadowTexture, line

export default {
  create(game) {
    this.level = new Level(game, 9)
    this.miniMap = new MiniMap(game, this.level)

    // game.physics.startSystem(Phaser.Physics.ARCADE)
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

    let lineGroup = game.add.group()
    line = game.add.sprite(game.width/2, game.height/2, 'cross')
    // game.physics.enable(line)
    line.anchor.setTo(0.5, 0.5)
    line.fixedToCamera = true
    lineGroup.add(line)

    this.lightManager = new LightManager(game, 100)

    game.world.bringToTop(this.miniMap.group)

    // this.inputManager = new InputManager(game)
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
    // this.inputManager.update()
    this.miniMap.update(this.game.camera.x, this.game.camera.y)
    this.lightManager.update()
  },

  render(game) {
  }
}
