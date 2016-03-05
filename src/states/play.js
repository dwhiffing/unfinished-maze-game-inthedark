import Level from '../entities/level'
import MiniMap from '../entities/miniMap'

export default {
  create(game) {
    game.stage.backgroundColor = "#235934"
    let level = new Level(game, 9)
    let miniMap = new MiniMap(game, level)
  },

  update(game) {
  },

  render(game) {
  }
}
