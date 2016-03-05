import Tile from './tile'

// is responsible for drawing a small version of the map
// in the top right hand corner
export default class MiniMap {
  constructor(game, level) {

    let tileScale = 0.2
    let extra = 1
    let buffer = tileScale * 200 + extra

    this.group = game.add.group()

    level.map.data.forEach(row => {
      row.forEach(tile => {
        let thing = new Tile(game, {
          ...tile,
          x: tile.x*buffer,
          y: tile.y*buffer,
          scale: tileScale
        })
        this.group.add(thing)
      })
    })

    this.group.x = game.world.width - this.group.width
  }
}
