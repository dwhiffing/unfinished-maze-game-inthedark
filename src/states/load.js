export default {
  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    this.load.spritesheet('tiles', 'images/tiles.png', 200, 200);
  },

  onLoadComplete() {
    this.game.state.start('play', true, false)
  }
}
