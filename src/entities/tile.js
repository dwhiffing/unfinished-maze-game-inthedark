export default class Tile extends Phaser.Sprite {

  constructor(game, x, y, size, group) {
    super(game, x, y, 'tile')
    this.game = game
    game.physics.enable(this)
    this.body.setSize(size*1.3,size*1.3)
    this.frame= game.rnd.between(0,9)
    this.width = size
    this.height = size
    this.anchor.setTo(0.5,0.5)
    group.add(this)
  }

  update() {
  }

  spawn() {
    this.alive = true
    this.alpha = 1
    this.frame = 0
  }

  destry() {
    this.frame = 9
    this.alpha = 0
    this.alive = false
  }
}
