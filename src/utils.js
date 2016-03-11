export default {
  // converts swne to nesw and vice versa
  invert(paths) {
    if (Array.isArray(paths)) {
      return paths.map(path => (path+2)%4)
    }
    return (paths+2)%4
  },
  toWords(path) {
    if (Array.isArray(path)) {
      return path.map(p => this._directionNumToWord(p))
    }
    return _directionNumToWord(path)
  },
  getPositionOnCamera(game, target, offset= true) {
    let offsetX = offset ? 400 : 0
    let offsetY = offset ? 225 : 0
    return {
      x: (target.x - game.camera.position.x) + offsetX,
      y: (target.y - game.camera.position.y) + offsetY
    }
  },
  _directionNumToWord(path) {
    switch (path) {
      case 0:
        return 'south'
      case 1:
        return 'west'
      case 2:
        return 'north'
      case 3:
        return 'east'
    }
  }
}
