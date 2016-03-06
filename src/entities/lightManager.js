export default class LightManager {
  constructor(game, lightRadius=300) {
    this.game = game
    this.lightRadius = lightRadius
    this.shadowTexture = game.add.bitmapData(game.canvas.width, game.canvas.height)
    this.shadowTexture.fixedToCamera = true

    this.lightSprite = game.add.image(0, 0, this.shadowTexture)
    this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY
    this.lightSprite.fixedToCamera = true
    this.lightLevel = 3
    this.flashlightLevel = 4
  }
  getAuraLight() {
    return `${24 * this.lightLevel}, ${23 * this.lightLevel}, ${22 * this.lightLevel}`
  }
  getFlashLight() {
    return `${24 * this.flashlightLevel}, ${23 * this.flashlightLevel}, ${22 * this.flashlightLevel}`
  }
  update(mouseX, mouseY) {
    var radius = this.lightRadius+this.game.rnd.integerInRange(0,this.lightRadius/5)
    var radius2 = this.lightRadius+100

    // clear out the previous gradient and make a new one
    this.shadowTexture.context.fillStyle = 'rgb(0, 0, 0)'
    this.shadowTexture.context.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height)

    // // prepare gradient
    var gradient = this.shadowTexture.context.createRadialGradient(
        this.game.width/2,this.game.height/2, this.lightRadius * 0.1,
        this.game.width/2,this.game.height/2, radius)
    gradient.addColorStop(0, `rgba(${this.getAuraLight()}, 0.8)`)
    gradient.addColorStop(0.5, `rgba(${this.getAuraLight()}, 0.3)`)
    gradient.addColorStop(1, `rgba(${this.getAuraLight()}, 0.0)`)

    // Draw circle of light
    this.shadowTexture.context.beginPath()
    this.shadowTexture.context.fillStyle = gradient
    this.shadowTexture.context.arc(this.game.width/2,this.game.height/2, radius, 0, Math.PI*2)
    this.shadowTexture.context.closePath()
    this.shadowTexture.context.fill()

    var gradient2 = this.shadowTexture.context.createRadialGradient(
        this.game.width/2,this.game.height/2, this.lightRadius * 0.5,
        this.game.width/2,this.game.height/2, radius2)
    gradient2.addColorStop(0, `rgba(${this.getFlashLight()}, 1)`)
    gradient2.addColorStop(1, `rgba(${this.getFlashLight()}, 0.2)`)

    this.shadowTexture.context.beginPath()
    this.shadowTexture.context.fillStyle = gradient2
    let angle = this.game.physics.arcade.angleToPointer(this.game.player.sprite)-0.4
    let angle2 = this.game.physics.arcade.angleToPointer(this.game.player.sprite)+0.4
    this.shadowTexture.context.moveTo(this.game.width/2, this.game.height/2)
    this.shadowTexture.context.lineTo(mouseX + Math.cos(angle) * 1000, mouseY + Math.sin(angle) * 1000 )
    this.shadowTexture.context.lineTo(mouseX + Math.cos(angle2) * 1000, mouseY + Math.sin(angle2) * 1000 )

    this.shadowTexture.context.closePath()
    this.shadowTexture.context.fill()

    // This just tells the engine it should update the texture cache
    this.shadowTexture.dirty = true
  }
}
