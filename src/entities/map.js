// is responsible for generating the map data
export default class GameMap {
  constructor(game, size) {
    this.data = []

    for (var i = 0; i < size; i++) {
      this.data[i] = []
      for (var j = 0; j < size; j++) {
        this.data[i][j] = {
          x: i,
          y: j,
          type: game.rnd.between(0,4),
          rotation: game.rnd.between(0,4),
        }
      }
    }
  }
}
