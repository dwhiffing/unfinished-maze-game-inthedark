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
    this.inputManager.bind("r", () => {
      this.level.map.rejigger()
      this.miniMap.update()
    })
  },

  update(game) {
    this.inputManager.update()
  },

  render(game) {
  }
}
