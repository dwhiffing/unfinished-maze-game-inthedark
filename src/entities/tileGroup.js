import Tile from '../entities/tile'

export default class TileGroup {
  constructor(game, x=1, y=1, size=100, space=1.5, number=9) {
    game.tileGroup = game.add.group()

    for (var i = x; i < number*space; i += space) {
      for (var j = y; j < number*space; j += space) {
        if (game.rnd.between(0, 10) < 6) {
          let x = game.width/2 + j * size
          let y = game.height/2 + i * size
          let _x = game.rnd.between(0, 50)
          let _y = game.rnd.between(0, 50)
          let _size = game.rnd.between(-20, 20)
          new Tile(game, x+_x, y+_y, size+_size, game.tileGroup)
        }
      }
    }
  }
}
