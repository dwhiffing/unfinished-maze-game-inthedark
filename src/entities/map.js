import Tile from './tile'

// is responsible for generating the map data
export default class GameMap {
  constructor(game, size) {
    this.data = []
    this.size = size
    for (var i = 0; i < this.size*this.size; i++) {
      let x = i % this.size
      let y = Math.floor(i/this.size)
      this.data[i] = new Tile(x, y)
    }
    this.generate()
  }
  generate() {
    let centerTile = this.getCenterTile()
    centerTile.type = 4
    centerTile.rotation = 0
    let openTile = this.getOpenTile()
  }
  getTileAt(x, y) {
    if (x >= this.size || y >= this.size || x < 0 || y < 0) {
      return null
    }
    let tile = this.data[x+y*this.size]
    return tile
  }
  getOpenTile() {
    let tile = this.data.filter(tile => tile.type > -1)[0]
    let neighbours = this.getTileNeighbours(tile)
    neighbours.forEach(tile => {
      tile.type = 2
    })
  }
  getTileNeighbours(tile) {
    if (!tile) {
      return []
    }
    let neighbours = [
      this.getTileAt(tile.x-1, tile.y),
      this.getTileAt(tile.x+1, tile.y),
      this.getTileAt(tile.x, tile.y-1),
      this.getTileAt(tile.x, tile.y+1),
    ]
    return neighbours.filter(tile => !!tile)
  }
  getOpenPathsForTile(tile) {

  }
  getCenterTile() {
    let center = Math.floor((this.size*this.size)/2)
    return this.data[center]
  }
}
