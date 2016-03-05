import Tile from '../entities/tile'

export default {
  create(game) {
    game.stage.backgroundColor = "#235934"
    let tileScale = 0.2
    let extra = 1
    let buffer = tileScale * 200 + extra
    for (var i = 0; i<9; i++ ) {
      for (var j = 0; j<9; j++ ) {
        let type = game.rnd.between(0,4)
        let rotation = game.rnd.between(0,4)
        let x = i*buffer
        let y = j*buffer
        let tile = new Tile(game, x, y, type, rotation, 0.2)
        game.world.add(tile)
      }
    }
  },

  update(game) {
  },

  render(game) {
  }
}
