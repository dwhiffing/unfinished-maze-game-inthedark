export default class Player {
  constructor(game) {
    // game.physics.enable(this.sprite)
    this.game = game
    this.group = game.add.group()
    this.speed = 3

    this.sprite = game.add.sprite(game.world.width/2, game.world.height/2, 'cross')
    this.sprite.anchor.setTo(0.5, 0.5)
    this.group.add(this.sprite)

    game.physics.enable(this.sprite)

    this.keys = game.input.keyboard.addKeys({
      w: Phaser.KeyCode.W,
      a: Phaser.KeyCode.A,
      s: Phaser.KeyCode.S,
      d: Phaser.KeyCode.D,
    })
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
    this.sprite.x += x * this.speed
    this.sprite.y += y * this.speed

    if (this.game.camera.position.x !== this.lastX) {
      this.game.rockTexture.tilePosition.x -= x * this.speed
    }
    if (this.game.camera.position.y !== this.lastY) {
      this.game.rockTexture.tilePosition.y -= y * this.speed
    }

    this.lastX = this.game.camera.position.x
    this.lastY = this.game.camera.position.y
  }
}
