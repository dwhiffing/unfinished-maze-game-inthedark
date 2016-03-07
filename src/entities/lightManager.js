export default class LightManager {
  constructor(game, lightRadius=200) {
    this.game = game
    this.lightRadius = lightRadius

    this.shadowTexture = game.add.bitmapData(game.canvas.width, game.canvas.height)
    this.shadowTexture.fixedToCamera = true

    this.lightSprite = game.add.image(0, 0, this.shadowTexture)
    this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY
    this.lightSprite.fixedToCamera = true
  }
  update(mouseX, mouseY) {
    this.shadowTexture.context.fillStyle = 'rgb(0, 0, 0)'
    this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height)

    this.drawAura()
    this.drawFlashlight(mouseX, mouseY)

    this.shadowTexture.dirty = true
  }
  drawAura() {
    const ctx = this.shadowTexture.context
    const { width, height, player, physics, center } = this.game
    const flicker = this.game.rnd.integerInRange(0, this.lightRadius / 5)
    const innerRadius = this.lightRadius * 0.05
    const outerRadius = this.lightRadius + flicker

    const gradient = ctx.createRadialGradient(...center, innerRadius, ...center, outerRadius)
    gradient.addColorStop(0, `rgba(${this.getLight(3)}, 0.5)`)
    gradient.addColorStop(0.5, `rgba(${this.getLight(3)}, 0.2)`)
    gradient.addColorStop(1, `rgba(${this.getLight(3)}, 0.0)`)

    ctx.beginPath()
    ctx.fillStyle = gradient
    ctx.arc(...center, outerRadius, 0, Math.PI*2)
    ctx.closePath()
    ctx.fill()
  }
  drawFlashlight(mouseX, mouseY) {
    const ctx = this.shadowTexture.context
    const { width, height, player, physics, center } = this.game
    const innerRadius = this.lightRadius * 0.5
    const outerRadius = this.lightRadius + 100

    const gradient = ctx.createRadialGradient(...center, innerRadius, ...center, outerRadius)
    gradient.addColorStop(0, `rgba(${this.getLight(4)}, 1)`)
    gradient.addColorStop(1, `rgba(${this.getLight(4)}, 0.2)`)

    ctx.beginPath()
    ctx.fillStyle = gradient
    const angle = physics.arcade.angleToPointer(player.sprite)-0.4
    const angle2 = physics.arcade.angleToPointer(player.sprite)+0.4
    ctx.moveTo(...center)
    ctx.lineTo(mouseX + Math.cos(angle) * 1000, mouseY + Math.sin(angle) * 1000 )
    ctx.lineTo(mouseX + Math.cos(angle2) * 1000, mouseY + Math.sin(angle2) * 1000 )

    ctx.closePath()
    ctx.fill()
  }
  getLight(level) {
    return `${24 * level}, ${23 * level}, ${22 * level}`
  }
}
