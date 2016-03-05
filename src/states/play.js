import Level from '../entities/level'
import MiniMap from '../entities/miniMap'
import InputManager from '../entities/InputManager'

let shadowTexture, line

export default {
  create(game) {
    this.level = new Level(game, 9)
    this.miniMap = new MiniMap(game, this.level)

    // game.physics.startSystem(Phaser.Physics.ARCADE)
    game.world.setBounds(0, 0, this.level.group.width, this.level.group.height)

    game.canvas.addEventListener('mousedown', () => game.input.mouse.requestPointerLock())

    game.camera.x = game.world.width/2-game.canvas.width/2
    game.camera.y = game.world.height/2-game.canvas.height/2

    game.input.addMoveCallback((pointer, x, y) => {
      if (game.input.mouse.locked) {
        game.camera.x += game.input.mouse.event.webkitMovementX
        game.camera.y += game.input.mouse.event.webkitMovementY
      }
    }, this)

    let lineGroup = game.add.group()
    line = game.add.sprite(game.width/2, game.height/2, 'cross')
    // game.physics.enable(line)
    line.anchor.setTo(0.5, 0.5)
    line.fixedToCamera = true
    lineGroup.add(line)

    game.lightRadius = 100

    shadowTexture = game.add.bitmapData(game.canvas.width, game.canvas.height);
    shadowTexture.fixedToCamera = true

    let lightSprite = game.add.image(0, 0, shadowTexture);
    lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
    lightSprite.fixedToCamera = true

    //
    // let shadowTexture3 = game.add.bitmapData(game.canvas.width, game.canvas.height);
    // let lightSprite3 = game.add.image(0, 0, shadowTexture);
    // lightSprite3.blendMode = Phaser.blendModes.MULTIPLY;

    game.lightRadius = 150

    game.world.bringToTop(this.miniMap.group)

    // this.inputManager = new InputManager(game)
    // this.inputManager.bind("space", () => {
    //   this.level.map.placeNextTile()
    //   this.miniMap.update()
    // })
    // this.inputManager.bind("z", () => {
    //   this.level.map.rejigger()
    //   this.miniMap.update()
    // })
  },

  update(game) {
    // this.inputManager.update()

    var radius = game.lightRadius+game.rnd.integerInRange(0,20)
    this.miniMap.update(game.camera.x, game.camera.y)

    // clear out the previous gradient and make a new one
    shadowTexture.context.fillStyle = 'rgb(30, 30, 30)';
    shadowTexture.context.fillRect(0, 0, game.canvas.width, game.canvas.height);
    var gradient = shadowTexture.context.createRadialGradient(
        game.width/2,game.height/2, game.lightRadius * 0.2,
        game.width/2,game.height/2, radius);
    gradient.addColorStop(0, 'rgba(240, 235, 220, 1.0)');
    gradient.addColorStop(1, 'rgba(240, 235, 220, 0.0)');

    // Draw circle of light
    shadowTexture.context.beginPath();
    shadowTexture.context.fillStyle = gradient;
    var size = this.game.rnd.realInRange(0.1, 1.0);
    shadowTexture.context.arc(game.width/2,game.height/2, radius, 0, Math.PI*2);
    shadowTexture.context.fill();

    // This just tells the engine it should update the texture cache
    shadowTexture.dirty = true;
  },

  render(game) {
  }
}
