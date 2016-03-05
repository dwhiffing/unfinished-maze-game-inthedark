export default class Tile extends Phaser.Sprite {
  constructor(game, x, y, frame=0, rotation=0, scale=0.1) {
    super(game, x, y, 'tiles')
    this.anchor.setTo(0.5)
    this.scale.setTo(scale)
    this.x+=this.width/2
    this.y+=this.height/2
    this.frame = frame
    this.angle = rotation * 90
  }
}
