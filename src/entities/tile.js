// 0: open to the south
// 1: open to the west
// 2: open to the north
// 3: open to the east
export default class Tile {
  constructor(x, y, type=-1, rotation=0) {
    this.x = x
    this.y = y
    this.type = type
    this.rotation = rotation
  }
  // gives an array of all the directions this tile leads to
  openPaths() {
    let paths = function() {
      switch (this.type) {
        case 0:
          return [this.rotation % 4]
        case 1:
          return [this.rotation % 4, (this.rotation + 1) % 4]
        case 2:
          return [this.rotation % 4, (this.rotation + 2) % 4]
        case 3:
          return [this.rotation % 4, (this.rotation + 1) % 4, (this.rotation + 3) % 4]
        case 4:
          return [0, 1, 2, 3]
        default:
          return []
      }
    }.bind(this)()

    paths = paths.sort()

    return paths
  }
  renderMiniMap(game, {x, y, scale, type=0, rotation=0, shape=0}) {
    const sprite = game.make.sprite(x, y, 'tiles4')
    const simple = true
    const frameExtra = simple ? null : 6 * shape
    sprite.anchor.setTo(0.5)
    sprite.scale.setTo(scale)

    sprite.frame = (type+1) + frameExtra
    sprite.x += sprite.width/2
    sprite.y += sprite.height/2
    sprite.angle = rotation * 90
    return sprite
  }
  render(game, {x, y, scale, type=0, rotation=0, shape=0}) {
    const sprite = game.make.sprite(x, y, 'tiles3')
    const simple = false
    const frameExtra = simple ? null : 6 * shape
    this.sprite = sprite
    sprite.anchor.setTo(0.5)
    sprite.scale.setTo(scale)

    sprite.frame = (type+1) + frameExtra
    sprite.x += sprite.width/2
    sprite.y += sprite.height/2
    sprite.angle = rotation * 90
    let ppu = game.physics.p2.mpx(1) * -1

    if (sprite.frame != 0) {
      game.physics.p2.enable(sprite, true)
      sprite.body.clearShapes()
      sprite.body.loadPolygon('physicsData', `${sprite.frame - 1}`)
      sprite.body.angle = rotation * 90
      sprite.body.static = true
      this.points = []

      sprite.body.data.shapes.forEach(shape => {
        let offset = shape.position || 0
        let angle = shape.angle || 0
        let verts = []
        let vrot = p2.vec2.create()
        shape.vertices.forEach(vert => {
          let out = []
          p2.vec2.rotate(vrot, vert, sprite.angle)
          let x = (vrot[0] + offset[0]) * ppu
          let y = (vrot[1] + offset[1]) * ppu
          verts.push(new Phaser.Point(sprite.x + x, sprite.y + y))
        })
        this.points = this.points.concat(verts)
      })
    }

    this.body = sprite.body
    return sprite
  }
}
