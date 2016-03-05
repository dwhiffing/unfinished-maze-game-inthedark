import Tile from './tile'
import utils from '../utils'
import _ from 'lodash'
// is responsible for generating the map data
export default class GameMap {
  constructor(game, size) {
    this.data = []
    this.size = size
    this.game = game
    for (var i = 0; i < this.size*this.size; i++) {
      let x = i % this.size
      let y = Math.floor(i/this.size)
      // let type = game.rnd.between(0,4)
      // let rotation = game.rnd.between(0,4)
      this.data[i] = new Tile(x, y)
    }
    this.generate()
  }
  // generate a new map
  generate() {
    let centerTile = this.getCenterTile()
    centerTile.type = 4
    console.log(this.tileHasBlockedPath(centerTile))
    do {
      this.placeNextTile()
    } while (this.getOpenTiles().length > 0)
  }
  next() {
  }
  placeNextTile() {
    let nextTile, openTile
    let count = 0
    do {
      openTile = _.sample(this.getOpenTiles())
      let unconnectedPath = this.getUnconnectedPaths(openTile)[0]
      let neighbours = this.getTileNeighbours(openTile)
      nextTile = neighbours[utils.invert(unconnectedPath)]
    } while (!nextTile)

    do {
      nextTile.type = -1
      let connectingPaths = this.getPathsConnectingToTile(nextTile)
      if (connectingPaths.length > 2) {
        nextTile.type = connectingPaths.length
      } else {
        nextTile.type = this.game.rnd.between(1,2)
      }
      nextTile.rotation = this.game.rnd.between(0,3)
      count++
      // this should check if the tile has no blank neighbours instead
      if (count > 500) {
        nextTile.type = 0
      }
    } while (!this.validTilePlacement(nextTile) || !this.tilesConnect(openTile, nextTile))
  }
  getPathsConnectingToTile(tile) {
    let neighbours = this.getTileNeighbours(tile)
    return neighbours.filter((neighbour, direction) => {
      if (!neighbour) return false
      let neighbourUnconnectedPaths = this.getUnconnectedPaths(neighbour)
      return neighbourUnconnectedPaths.some(path => path === direction)
    })
  }
  validTilePlacement(tile) {
    return !this.tileHasBlockedPath(tile)
  }
  tileHasBlockedPath(tile) {
    let neighbours = this.getTileNeighbours(tile)
    let paths = this.getUnconnectedPaths(tile)
    let blockedPaths = paths.some(path => {
      let tilePathLeadsTo = neighbours[utils.invert(path)]
      console.log(tilePathLeadsTo)
      return !tilePathLeadsTo || tilePathLeadsTo.type !== -1
    })
    return blockedPaths
  }
  // get the tile at a given x,y coord
  getTileAt(x, y) {
    if (x >= this.size || y >= this.size || x < 0 || y < 0) {
      return null
    }
    let tile = this.data[x+y*this.size]
    return tile
  }
  // get the tiles with unconnected paths
  getOpenTiles() {
    return this.data.filter(tile => {
      if (tile.type === -1) return false
      return this.hasUnconnectedPaths(tile)
    })
  }
  // does a tile have any paths that are not connected
  hasUnconnectedPaths(tile) {
    return this.getUnconnectedPaths(tile).length > 0
  }
  // get all the unconnected paths of a tile
  getUnconnectedPaths(tile) {
    let openPaths = utils.invert(tile.openPaths())
    let neighbours = this.getTileNeighbours(tile)
    let unconnectedPaths = openPaths.filter(path => {
      let neighbour = neighbours[path]
      if (!neighbour) return true
      return !this.tilesConnect(tile, neighbour)
    })
    return utils.invert(unconnectedPaths)
  }
  // are the two given tiles neighbouring?
  tilesAreNeighbours(tileA, tileB) {
    let aNeighbours = this.getTileNeighbours(tileA)
    if (!aNeighbours.some(tile => tile === tileB)) {
      return false
    }
    return true
  }
  // whether two tiles have paths that connect
  tilesConnect(tileA, tileB) {
    if (!this.tilesAreNeighbours(tileA, tileB)) {
      return false
    }
    let aNeighbours = this.getTileNeighbours(tileA)
    let directionFromAtoB = aNeighbours.indexOf(tileB)
    let aPaths = tileA.openPaths()
    let bPaths = tileB.openPaths()
    switch (directionFromAtoB) {
      case 0: // tile B is north of A
        return aPaths.some(p => p === 2) && bPaths.some(p => p === 0)
      case 1: // tile B is east of A
        return aPaths.some(p => p === 3) && bPaths.some(p => p === 1)
      case 2: // tileB is south of A
        return aPaths.some(p => p === 0) && bPaths.some(p => p === 2)
      case 3: // tileB is west of A
        return aPaths.some(p => p === 1) && bPaths.some(p => p === 3)
      default:
        return false
    }
  }
  // get an array of all tile neighbours always returns 4 indexes:
  // 0: north, 1: east, 2: south, 3: west
  getTileNeighbours(tile, clean=false) {
    if (!tile) {
      return null
    }
    let neighbours = [
      this.getTileAt(tile.x, tile.y-1),
      this.getTileAt(tile.x+1, tile.y),
      this.getTileAt(tile.x, tile.y+1),
      this.getTileAt(tile.x-1, tile.y),
    ]
    if (clean) {
      neighbours = neighbours.filter(tile => !!tile)
    }
    return neighbours
  }
  getCenterTile() {
    let center = Math.floor((this.size*this.size)/2)
    return this.data[center]
  }
}
