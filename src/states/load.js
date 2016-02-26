export default {
  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    this.game.load.spritesheet('explosion', 'images/explosion.png', 128, 128);
    this.load.spritesheet('bar', 'images/bar.png', 150, 20);
    this.load.image('cross', 'images/Line.png');
    this.load.image('displacement', 'images/displacement_map.png');
    this.load.spritesheet('tile', 'images/button.png', 300, 300);
    this.load.script('filter', 'DisplacementFilter.js');
  },

  onLoadComplete() {
    this.game.state.start('play', true, false)
  }
}
