import Tile from './miniMapTile'

// is responsible for drawing a small version of the map
// in the top right hand corner
export default class MiniMap {
  constructor(game, level) {
    let extra = 0
    this.tileScale = 0.1
    this.buffer = this.tileScale * 200 + extra
    this.level = level
    this.game = game
    this.group = game.add.group()
    this.drawMap()
    this.playerMarker = game.add.sprite(0,0,'playerDot')
    this.group.add(this.playerMarker)
    this.playerMarker.fixedToCamera = true

    this.group.x = game.world.width - this.group.width
  }
  drawMap() {
    // this.group.removeAll()
    this.level.map.data.forEach(tile => {
      let thing = new Tile(this.game, {
        ...tile,
        x: tile.x*this.buffer,
        y: tile.y*this.buffer,
        scale: this.tileScale
      })
      thing.fixedToCamera = true
      this.group.add(thing)
    })
  }
  update(x,y) {
    this.playerMarker.cameraOffset.x = x/(this.level.tileScale*50)
    this.playerMarker.cameraOffset.y = y/(this.level.tileScale*50)
  }
}
