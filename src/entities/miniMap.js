export default class MiniMap {
  constructor(game, map) {
    this.map = map
    this.game = game
    this.group = game.add.group()

    this.tileScale = 0.1
    this.buffer = this.tileScale * 200

    this.drawMap()

    this.playerMarker = game.add.sprite(0, 0, 'playerDot')
    this.playerMarker.fixedToCamera = true
    this.group.add(this.playerMarker)

    this.group.x = game.world.width - this.group.width
  }
  drawMap() {
    // this.group.destroyAll()
    this.map.data.forEach(tile => {
      let sprite = tile.renderMiniMap(this.game, {
        ...tile,
        x: tile.x * this.buffer,
        y: tile.y * this.buffer,
        scale: this.tileScale,
        mapTile: true,
      })
      sprite.fixedToCamera = true
      this.group.add(sprite)
    })
  }
  update(x, y) {
    this.playerMarker.cameraOffset.x = x / (this.map.tileScale*50)
    this.playerMarker.cameraOffset.y = y / (this.map.tileScale*50)
  }
}
