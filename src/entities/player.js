export default class Player {
  constructor(game) {
    this.group = game.add.group()
    this.game = game
    this.sprite = game.add.sprite(game.width/2, game.height/2, 'cross')
    game.physics.enable(this.sprite)
    this.sprite.anchor.setTo(0.5, 0.5)
    this.sprite.fixedToCamera = true
    this.group.add(this.sprite)
    this.keys = game.input.keyboard.addKeys({
      w: Phaser.KeyCode.W,
      a: Phaser.KeyCode.A,
      s: Phaser.KeyCode.S,
      d: Phaser.KeyCode.D,
    })
    this.speed = 3
  }
  update() {
    let y = 0, x = 0
    if (this.keys.w.isDown) {
      y = -1
    } else if (this.keys.s.isDown) {
      y = 1
    }
    if (this.keys.a.isDown) {
      x = -1
    } else if (this.keys.d.isDown) {
      x = 1
    }
    this.move(x, y)
  }
  move(x, y) {
    this.game.camera.x += x * this.speed
    this.game.camera.y += y * this.speed
    this.game.rockTexture.tilePosition.x -= x * this.speed
    this.game.rockTexture.tilePosition.y -= y * this.speed
  }
}
