export default {
  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    this.load.spritesheet('tiles', 'images/tiles.png', 200, 200);
    this.load.spritesheet('tiles2', 'images/tiles2.png', 1000, 1000);
  },

  onLoadComplete() {
    this.game.state.start('play', true, false)
  }
}
