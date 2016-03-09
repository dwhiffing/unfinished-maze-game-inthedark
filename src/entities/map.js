import MapGenerator from './mapGenerator'

// will be responsible for using the map to draw the actual map
// that the player explores as well as mananging the boundries for that map
export default class Map {
  constructor(game, size) {
    this.game = game
    this.group = game.add.group()

    this.tileScale = 1
    this.buffer = this.tileScale * 1000

    this.map = new MapGenerator(game, size)
    this.data = this.map.data

    this.drawMap()
  }
  drawMap() {
    // this.group.destroy()
    this.map.data.forEach(tile => {
      let sprite = tile.render(this.game, {
        ...tile,
        x: tile.x * this.buffer,
        y: tile.y * this.buffer,
        scale: this.tileScale
      })
      this.group.add(sprite)
    })
  }
}
