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
}