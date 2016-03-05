export default {
  // converts swne to nesw and vice versa
  invert(paths) {
    return paths.map(path => (path+2)%4)
  },
  toWords(path) {
    if (Array.isArray(path)) {
      return path.map(p => this._directionNumToWord(p))
    }
    return _directionNumToWord(path)
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
