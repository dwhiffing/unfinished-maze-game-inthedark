import Tile from './miniMapTile'

// is responsible for drawing a small version of the map
// in the top right hand corner
export default class MiniMap {
  constructor(game, level) {
    let extra = 1
    this.tileScale = 0.2
    this.buffer = this.tileScale * 200 + extra
    this.level = level
    this.game = game
    this.group = game.add.group()
    this.update()

    this.group.x = game.world.width - this.group.width
  }
  update() {
    this.group.removeAll()
    this.level.map.data.forEach(tile => {
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
