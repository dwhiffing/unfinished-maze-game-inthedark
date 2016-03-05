export default class mapTile extends Phaser.Sprite {
  constructor(game, {x, y, scale, type=0, rotation=0}) {
    super(game, x, y, 'tiles2')

    this.anchor.setTo(0.5)
    this.scale.setTo(scale)

    this.frame = type+1
    this.angle = rotation * 90

    this.x += this.width/2
    this.y += this.height/2
  }
}
