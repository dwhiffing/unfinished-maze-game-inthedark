// 0: south
// 1: west
// 2: north
// 3: east

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
      }
    }.bind(this)()
    return paths.sort()
  }
}
