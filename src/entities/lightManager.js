export default class LightManager {
  constructor(game, lightRadius) {
    this.game = game
    this.lightRadius = lightRadius
    this.shadowTexture = game.add.bitmapData(game.canvas.width, game.canvas.height);
    this.shadowTexture.fixedToCamera = true

    this.lightSprite = game.add.image(0, 0, this.shadowTexture);
    this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
    this.lightSprite.fixedToCamera = true
  }
  update() {
    var radius = this.lightRadius+this.game.rnd.integerInRange(0,20)

    // clear out the previous gradient and make a new one
    this.shadowTexture.context.fillStyle = 'rgb(30, 30, 30)';
    this.shadowTexture.context.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    var gradient = this.shadowTexture.context.createRadialGradient(
        this.game.width/2,this.game.height/2, this.lightRadius * 0.2,
        this.game.width/2,this.game.height/2, radius);
    gradient.addColorStop(0, 'rgba(240, 235, 220, 1.0)');
    gradient.addColorStop(1, 'rgba(240, 235, 220, 0.0)');

    // Draw circle of light
    this.shadowTexture.context.beginPath();
    this.shadowTexture.context.fillStyle = gradient;
    var size = this.game.rnd.realInRange(0.1, 1.0);
    this.shadowTexture.context.arc(this.game.width/2,this.game.height/2, radius, 0, Math.PI*2);
    this.shadowTexture.context.fill();

    // This just tells the engine it should update the texture cache
    this.shadowTexture.dirty = true;
  }
}
