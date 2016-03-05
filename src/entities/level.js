import GameMap from './map'
import Tile from './mapTile'

// will be responsible for using the map to draw the actual map
// that the player explores as well as mananging the boundries for that map
export default class Level {
  constructor(game, size) {
    let extra = 0
    this.game = game
    this.tileScale = 1
    this.buffer = this.tileScale * 600 + extra
    this.group = game.add.group()
    this.map = new GameMap(game, size)
    this.map.data.forEach(tile => {
      let thing = new Tile(this.game, {
        ...tile,
        x: tile.x*this.buffer,
        y: tile.y*this.buffer,
        scale: this.tileScale
      })
      this.group.add(thing)
    })
  }
}
