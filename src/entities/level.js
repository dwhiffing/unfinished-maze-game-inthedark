import GameMap from './map'

// will be responsible for using the map to draw the actual map
// that the player explores as well as mananging the boundries for that map
export default class Level {
  constructor(game, size) {
    this.map = new GameMap(game, size)
  }
}
